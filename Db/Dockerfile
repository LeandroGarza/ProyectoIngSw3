FROM mysql

ENV MYSQL_ROOT_PASSWORD=leandro2
ENV MYSQL_DATABASE=ingsw3leandro

# Copiar el archivo SQL a la carpeta de inicialización del MySQL
COPY lea.sql /docker-entrypoint-initdb.d/lea.sql