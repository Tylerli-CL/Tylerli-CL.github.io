"""Check migration preservation and public output after a production build."""

import hashlib
import json
from html.parser import HTMLParser
from pathlib import Path
import re
from urllib.parse import unquote, urljoin, urlsplit

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / "_site"
SOURCE = json.loads((ROOT / "docs/site-preservation.json").read_text())


class References(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls = []

    def handle_starttag(self, tag, attrs):
        for key, value in attrs:
            if key in {"href", "src"} and value:
                self.urls.append(value)
            elif key == "srcset" and value:
                self.urls.extend(part.strip().split()[0] for part in value.split(",") if part.strip())


def main():
    for name in ["assets/img/prof_pic_li.jpg", "_news/announcement_1.md"]:
        assert hashlib.sha256((ROOT / name).read_bytes()).hexdigest() == SOURCE["files"][name], name

    home = (SITE / "index.html").read_text()
    assert "Robotics Engineer based in Shanghai" in home and "October 2024" in home
    assert "Germany 🇩🇪" in home and "China 🇨🇳" in home
    assert "spatial intelligence for robotics" in home
    assert not any(text in home for text in ["Roborock", "portrait matting", "May 2025", "December 2024", "April 2025", "September–November 2024", "October 2022", "February 2023"])
    assert "master's student" not in home and "master’s student" not in home
    assert "licl0124[at]icloud.com" in home
    assert "mailto:" not in home
    assert "with equal contributions by Faezeh Sadat Mortazavi and me" not in home
    assert "Huawei Intelligent Automotive Solution BU (IAS BU)" in home
    assert 'href="https://auto.huawei.com/cn/"' in home
    assert 'href="https://www.oppo.com/en/about/"' in home
    assert 'href="https://www.mi.com/global/"' in home
    assert "Feb 05, 2026" in home
    assert "subtitle: Robotics Engineer;" in (ROOT / "_pages/about.md").read_text()
    for name in ["index.html", "publications/index.html"]:
        paper = (SITE / name).read_text()
        assert "Hybrid 2D-3D Cross-LiDAR Global Localization" in paper, name
        assert "10.1109/ICARA69401.2026.11480397" in paper, name
        assert "Equal contribution (first two authors)." in paper, name

    expected = {"index.html", "publications/index.html", "news/index.html", "news/announcement_1/index.html", "news/hybridgloc_published/index.html", "404.html"}
    actual = {str(p.relative_to(SITE)) for p in SITE.rglob("*.html") if "assets" not in p.relative_to(SITE).parts}
    assert actual == expected, f"Unexpected public routes: {actual ^ expected}"
    assert not any((SITE / name).exists() for name in ["docs", "test", "output", "_posts", "readme_preview"])

    for file in SITE.rglob("*.html"):
        source = file.read_text()
        assert "clustrmaps.com" not in source and "Visit tracker" not in source, file
        assert not any(address in source for address in ["@gmail.com", "@".join(["licl0124", "icloud.com"]), "mailto:"]), file
        assert not re.search(r"googletagmanager\.com|google-analytics\.com|G-EMCYE4Y82X", source), file
        search = re.search(r"ninja\.data\s*=\s*(\[.*?\]);", source, re.S)
        assert search, f"Missing search data: {file}"
        assert not re.search(r"Einstein|/blog/|/projects/|/cv/|/teaching/", search.group(1)), file
        refs = References()
        refs.feed(source)
        route = "/" + file.relative_to(SITE).as_posix()
        if route.endswith("index.html"):
            route = route.removesuffix("index.html")
        for value in refs.urls:
            parsed = urlsplit(urljoin("https://tylerli-cl.github.io" + route, value))
            if parsed.scheme not in {"http", "https"} or parsed.netloc != "tylerli-cl.github.io":
                continue
            target = SITE / unquote(parsed.path).lstrip("/")
            assert target.is_file() or (target / "index.html").is_file(), f"{file}: missing {value}"

    for name in ["sitemap.xml", "assets/js/search-data.js"]:
        file = SITE / name
        if file.exists():
            text = file.read_text()
            assert not re.search(r"Einstein|/blog/|/projects/|/cv/|/teaching/", text), name
    assert (SITE / "sitemap.xml").is_file()
    print("Current biography, publication, map removal, preserved assets, routes and analytics checks passed.")


if __name__ == "__main__":
    main()
