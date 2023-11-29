FROM mysql:8.1.0

COPY healthcheck.sh /
RUN chmod +x /healthcheck.sh
COPY init/ /docker-entrypoint-initdb.d/