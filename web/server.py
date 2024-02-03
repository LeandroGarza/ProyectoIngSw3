import http.server
import socketserver
import os

# Puerto en el que se ejecutará el servidor
PORT = 8080

# Directorio que se servirá
# DIRECTORY = '/app'

# Configuración del manejador de solicitudes
Handler = http.server.SimpleHTTPRequestHandler


# Crear el servidor
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Servidor en el puerto {PORT}")
    # Iniciar el servidor
    httpd.serve_forever()