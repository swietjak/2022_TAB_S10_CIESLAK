#!/bin/bash

# removing existing containers
sudo docker rm my-postgresdb-container -f
sudo docker image rm my-postgres-db -f

# creating new container
sudo docker build -t my-postgres-db ./
sudo docker run -d --name my-postgresdb-container -p 5432:5432 my-postgres-db

if [ "$1" = "-d" ];
then
    sudo docker ps -a
fi