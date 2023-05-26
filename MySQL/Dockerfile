# Usa l'immagine base di MySQL
FROM mysql:5.7

# Copia i tuoi script SQL nel container
COPY ./MySQL/*.sql /docker-entrypoint-initdb.d/
