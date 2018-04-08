#!/usr/bin/env bash
# This script deploys ~/www to /var/www
# It is to be run on the server the site
# is being deployed to, not on the dev machine
# i.e. not the machine you're probably reading
# this from.
rm -rf /var/www/*
cp -r ./www/* /var/www/
