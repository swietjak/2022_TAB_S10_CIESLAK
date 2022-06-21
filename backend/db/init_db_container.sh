#!/bin/bash

# removing existing containers
if [ "$2" = "--rm" ];
then
    sudo docker rm my-postgresdb-container -f
    sudo docker image rm my-postgres-db -f
fi

# creating new container
sudo docker build -t my-postgres-db "$1"
sudo docker run --rm -d --name my-postgresdb-container -p 5432:5432 --network=tab  my-postgres-db

sudo docker ps -a