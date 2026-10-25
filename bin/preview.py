"""Serve the production output locally, including concurrent module imports."""

from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class PreviewServer(ThreadingHTTPServer):
    request_queue_size = 128


class PreviewHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


if __name__ == "__main__":
    site = Path(__file__).resolve().parent.parent / "_site"
    handler = partial(PreviewHandler, directory=str(site))
    with PreviewServer(("127.0.0.1", 4000), handler) as server:
        print("Production preview: http://127.0.0.1:4000/", flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass
