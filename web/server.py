import http.server
import socketserver
import os

PORT = int(os.environ.get('PORT', 8080))  # Obtener el puerto de la variable de entorno PORT o usar 8080 por defecto

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("Servidor web en el puerto:", PORT)
    httpd.serve_forever()