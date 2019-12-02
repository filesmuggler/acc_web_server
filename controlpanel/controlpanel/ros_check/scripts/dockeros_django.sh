<< --MULTILINE-COMMENT--
AutonomousCarsCoop(ACC) 

File: dockeros.sh

Program purpose: Program for handling ROS Master operations in Docker.

Requirements: It is required to sudo this script.

MIT License

Copyright (c) 2019 Krzysztof Stężała

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

--MULTILINE-COMMENT--

#!/bin/bash

## Welcome user 
## Present options for execution

## Based on the argument input
MODE=$1

REPO_IMAGE="krzysztofstezala/autonomcarcoop:v0.3"
CONTAINER_NAME="acc-master"


if [ "$1" = "install" ]; then

    OUT_PULL=""
    OUT_INSTALL=""
    
    echo "Pulling image from $REPO_IMAGE"
    {
        if sudo docker pull $REPO_IMAGE ; then
            OUT_PULL="Successfully pulled the image."
        else
            OUT_PULL="Error pulling image. Check your internet connection."
            exit 1
        fi
    } &> /dev/null

    echo "Creating container $CONTAINER_NAME from $REPO_IMAGE"

    {
        if sudo docker run --network="host" --name $CONTAINER_NAME -dit $REPO_IMAGE /bin/bash ; then
            clear
            OUT_INSTALL="Container created. "
        else
            clear
            OUT_INSTALL="Container is already created. "
        fi
    } &> /dev/null

    echo $OUT_INSTALL

elif [ "$1" = "start" ]; then
    # getting ID of docker container
    ID_CONTAINER=$(sudo docker inspect --format="{{.Id}}" $CONTAINER_NAME)
    # start container
    OUT_START=""

    echo "Starting docker container $CONTAINER_NAME"
    { 
        if sudo docker start $ID_CONTAINER ; then
            OUT_START="Container running."
        else
            OUT_START="Error starting container. Try 'sudo bash dockeros.sh install'"
        fi
    } &> /dev/null

    echo $OUT_START

elif [ "$1" = "ssh" ]; then

    OUT_SSH=""

    # getting ID of docker container
    {
        if ID_CONTAINER=$(sudo docker inspect --format="{{.Id}}" $CONTAINER_NAME) ; then
            OUT_SSH="'It's a magical place.' -PC"
        else
            OUT_SSH="'You might want to take a few steps back.' -PC"
        fi
    } &> /dev/null

    # running container
    clear
    echo $OUT_SSH
    sudo docker exec -it $ID_CONTAINER bash

elif [ "$1" = "ros" ]; then

    OUT_SSH=""

    # getting ID of docker container
    {
        if ID_CONTAINER=$(sudo docker inspect --format="{{.Id}}" $CONTAINER_NAME) ; then
            OUT_SSH="'It's a magical place.' -PC"
        else
            OUT_SSH="'You might want to take a few steps back.' -PC"
        fi
    } &> /dev/null

    # running container
    clear
    echo $OUT_SSH
    sudo docker exec $ID_CONTAINER /home/start.sh

elif [ "$1" = "" ] || [ "$1" = "help" ]; then
    echo "You should provide an argument for correct docker container operation"
    echo "usage: dockeros [argument]
---
Examples:
$ sudo dockeros
$ sudo dockeros help      -> display this message

$ sudo dockeros install   -> pull image, create container with name '$CONTAINER_NAME'

$ sudo dockeros start     -> starts docker container 

$ sudo dockeros ssh       -> connects to running docker and starts bash

"
fi
