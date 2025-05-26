import http.server
import socketserver
import os

PORT = 3000
DIRECTORY = "public"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def log_message(self, format, *args):
        print("%s - - [%s] %s" %
            (self.address_string(),
             self.log_date_time_string(),
             format % args))

print(f"Starting server at http://localhost:{PORT}")
print(f"Serving files from the '{DIRECTORY}' directory")
print("Press Ctrl+C to stop the server")

try:
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        httpd.serve_forever()
except KeyboardInterrupt:
    print("\nServer stopped.") 