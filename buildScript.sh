#!/bin/bash

pm2 stop static-page-server-5000
pm2 delete static-page-server-5000
rm welcomeSPA.zip
rm -rf build

aws s3 cp s3://alc-autobots-artifacts/welcomeSPA.zip .
unzip welcomeSPA.zip
pm2 serve build --spa --port 5000
pm2 status