#!/bin/bash

# removing existing containers
if [ "$2" = "--rm" ];
then
    sudo docker rm frontend-container -f
    sudo docker image frontend-image -f
fi

# creating new container
sudo docker build -t frontend-image $1
sudo docker run -d --rm -p 3001:3000 --network=tab -e REACT_APP_API_URL=http://localhost:8080/ --name=frontend-container frontend-image

sudo docker ps -a