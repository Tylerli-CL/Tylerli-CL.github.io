const fs = require("node:fs");
const path = require("node:path");
const { test, expect } = require("@playwright/test");

test("personal pages, resources and navigation", async ({ page }, testInfo) => {
  const theme = testInfo.project.name.endsWith("dark") ? "dark" : "light";
  const mobile = testInfo.project.name.startsWith("mobile");
  const localFailures = [];
  const thirdPartyFailures = [];
  const analyticsRequests = [];
  const runtimeErrors = [];
  const diagnosticsDir = path.resolve("output/playwright/migration");
  fs.mkdirSync(diagnosticsDir, { recursive: true });

  await page.addInitScript((setting) => localStorage.setItem("theme", setting), theme);
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  page.on("request", (request) => {
    if (/google-analytics\.com|googletagmanager\.com/.test(request.url())) analyticsRequests.push(request.url());
  });
  page.on("requestfailed", (request) => {
    if (request.failure()?.errorText === "net::ERR_ABORTED") return;
    const failures = request.url().startsWith("http://127.0.0.1:4000") ? localFailures : thirdPartyFailures;
    failures.push(`${request.url()}: ${request.failure()?.errorText}`);
  });
  page.on("response", (response) => {
    if (response.status() < 400) return;
    const failures = response.url().startsWith("http://127.0.0.1:4000") ? localFailures : thirdPartyFailures;
    failures.push(`${response.status()} ${response.url()}`);
  });

  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
  await expect(page.locator("body")).toContainText("Room Graph Prediction from Point Cloud Maps");
  await expect(page.locator("body")).toContainText("Robotics Engineer based in Shanghai");
  await expect(page.locator("body")).toContainText("October 2024");
  await expect(page.locator("body")).toContainText("Germany 🇩🇪");
  await expect(page.locator("article > .clearfix > ul > li")).toHaveCount(2);
  await expect(page.locator(".post-header .desc")).toHaveText(
    "Robotics Engineer; 3D Perception and Spatial Intelligence; Photographer; Vibe coder (bugs included) 🐛"
  );
  await expect(page.locator("body")).not.toContainText("with equal contributions by Faezeh Sadat Mortazavi and me");
  await expect(page.locator('a[href="https://auto.huawei.com/cn/"]')).toHaveText("Huawei Intelligent Automotive Solution BU (IAS BU)");
  await expect(page.locator('a[href="https://www.oppo.com/en/about/"]')).toHaveText("OPPO Research Institute");
  await expect(page.locator('a[href="https://www.mi.com/global/"]')).toHaveText("Xiaomi");
  await expect(page.locator(".news")).toContainText("Feb 05, 2026");
  await expect(page.locator(".news")).toContainText("HybridGLoc");
  await expect(page.locator('img[src*="clustrmaps"], a[href*="clustrmaps"]')).toHaveCount(0);
  await expect(page.locator("body")).toContainText("This website is officially established.");
  await expect(page.locator('a[href="https://github.com/Tylerli-CL"]')).toBeVisible();
  await expect(page.locator('a[href="https://instagram.com/tyler_li_cl"], a[href="https://www.instagram.com/tyler_li_cl"]')).toBeVisible();
  await expect(page.locator('a[href="https://en.wikipedia.org/wiki/Tibetan_Plateau"]')).toBeVisible();
  await expect(page.locator(".contact-note")).toContainText("licl0124[at]icloud.com");
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
  const renderedPage = await page.content();
  expect(renderedPage).not.toMatch(/@gmail\.com/);
  expect(renderedPage).not.toContain(["licl0124", "icloud.com"].join("@"));
  await expect(page.locator(".publications .title")).toHaveText("HybridGLoc: Hybrid 2D-3D Cross-LiDAR Global Localization");
  const checkAuthorEmphasis = async () => {
    const author = page.locator(".publications .author > em");
    await expect(author).toHaveText("Chengliang Li");
    await expect(author).toHaveCSS("font-weight", "700");
    await expect(author).toHaveCSS("background-color", "rgb(255, 237, 131)");
    await expect(author).toHaveCSS("color", "rgb(32, 32, 32)");
    await expect(page.locator(".publications .periodical").filter({ hasText: "Equal contribution (first two authors)." })).toHaveCSS(
      "font-weight",
      "600"
    );
  };
  await checkAuthorEmphasis();
  await expect(page.locator(".fa-rss")).toHaveCount(0);
  await expect(page.locator("footer")).toContainText("Last updated:");
  await expect(page.locator("footer")).not.toContainText("Powered by");
  const searchData = await page.locator("ninja-keys").evaluate((element) => element.data);
  expect(Array.isArray(searchData)).toBe(true);
  expect(searchData.some((entry) => entry.id === "nav-about")).toBe(true);
  expect(searchData.some((entry) => entry.id === "nav-publications")).toBe(true);
  expect(JSON.stringify(searchData)).not.toMatch(/Einstein|\/blog\/|\/projects\/|\/cv\/|\/teaching\//);
  const portrait = page.locator('img[src*="prof_pic_li"]').first();
  await expect(portrait).toBeVisible();
  expect(await portrait.evaluate((img) => img.complete && img.naturalWidth > 0)).toBe(true);
  expect(await portrait.evaluate((img) => getComputedStyle(img).borderRadius)).not.toBe("50%");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  if (!mobile) {
    const box = await portrait.boundingBox();
    expect(box.x).toBeGreaterThan(testInfo.project.use.viewport.width / 2);
  }

  if (mobile) {
    const toggle = page.locator(".navbar-toggler");
    await expect(toggle).toBeVisible();
    await toggle.click();
    await expect(page.locator(".navbar-collapse")).toHaveClass(/show/);
  }
  const lightToggle = page.locator("#light-toggle");
  await lightToggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme-setting", theme === "dark" ? "system" : "dark");
  await page.evaluate((setting) => localStorage.setItem("theme", setting), theme);
  await page.reload({ waitUntil: "networkidle" });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: path.join(diagnosticsDir, `${testInfo.project.name}-home.png`), fullPage: true });

  const routes = [
    ["/publications/", "publications", "Equal contribution (first two authors)."],
    ["/news/", "news", "This website is officially established."],
    ["/news/announcement_1/", "announcement", "This website is officially established."],
    ["/news/hybridgloc_published/", "paper-news", "was published at ICARA 2026"],
    ["/404.html", "404", "Nothing exists here."],
  ];
  for (const [url, label, text] of routes) {
    const response = await page.goto(url, { waitUntil: "networkidle" });
    expect(response.ok()).toBe(true);
    await expect(page.locator("body")).toContainText(text);
    if (label === "publications") {
      await checkAuthorEmphasis();
      await expect(page.locator('a[href="https://doi.org/10.1109/ICARA69401.2026.11480397"]')).toBeVisible();
      await page.locator("a.abstract").click();
      await expect(page.locator("div.abstract")).toBeVisible();
      await page.locator("a.abstract").click();
      await expect(page.locator("div.abstract")).toHaveCSS("max-height", "0px");
      await expect(page.locator("div.abstract")).toHaveJSProperty("clientHeight", 0);
      await page.locator("a.bibtex").click();
      await expect(page.locator("div.bibtex")).toBeVisible();
      await page.locator("a.bibtex").click();
      await expect(page.locator("div.bibtex")).toHaveCSS("max-height", "0px");
      await expect(page.locator("div.bibtex")).toHaveJSProperty("clientHeight", 0);
    }
    await page.screenshot({ path: path.join(diagnosticsDir, `${testInfo.project.name}-${label}.png`), fullPage: true });
  }
  await expect(page).toHaveURL("http://127.0.0.1:4000/", { timeout: 6000 });
  fs.writeFileSync(
    path.join(diagnosticsDir, `${testInfo.project.name}-resources.json`),
    JSON.stringify({ localFailures, thirdPartyFailures, analyticsRequests, runtimeErrors }, null, 2)
  );
  expect(analyticsRequests).toEqual([]);
  expect(localFailures).toEqual([]);
  expect(runtimeErrors).toEqual([]);
});
