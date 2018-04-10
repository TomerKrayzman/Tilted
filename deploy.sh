#!/usr/bin/env bash
# Syntax:
# deploy.sh <user@server> <location of pem file for server>
# For example:
# ./deploy.sh ubuntu@loltilted.com tilted-key.pem

# Delete previous deployment
ssh -i "$2" $1 rm -rf update-www.sh www
# Move deploy script to server
scp -i "$2" ./update-www.sh $1:~/
# Move payload to server
scp -i "$2" -r ./src $1:~/www
# Run deploy script on server
ssh -i "$2" $1 sudo bash ./update-www.sh
# That's all