FROM postgres
ENV POSTGRES_PASSWORD docker
ENV POSTGRES_DB world
COPY init.sql /docker-entrypoint-initdb.d/

# run this commands to run the container:
# docker build -t my-postgres-db ./
# docker run -d --name my-postgresdb-container -p 5432:5432 my-postgres-db
# check your wsl eth0 address (`ipp a` command in wsl)
# in pg admin provide wsl eth0 address as host, and postgres as username POSTGRES_PASSWORD docker as password