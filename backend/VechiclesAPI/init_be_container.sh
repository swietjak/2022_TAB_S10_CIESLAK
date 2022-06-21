#!/bin/bash

# removing existing containers
if [ "$2" = "--rm" ];
then
    sudo docker rm backend-container -f
    sudo docker image backend-image -f
fi

# creating new container
sudo docker build -t backend-image $1
sudo docker run -d --rm -p 8080:8080 --name=backend-container --network=tab -e DbContextSettings:ConnectionString="Host=my-postgresdb-container;Database=world;Port=5432;User Id=postgres;Password=docker;Pooling=true;" backend-image

sudo docker ps -a