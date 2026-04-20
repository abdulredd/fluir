#!/usr/bin/env python3
import http.server, sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def log_message(self, fmt, *args):
        pass  # suppress per-request noise

print(f'Dev server at http://localhost:{PORT}  (no-cache)')
http.server.HTTPServer(('', PORT), NoCacheHandler).serve_forever()
