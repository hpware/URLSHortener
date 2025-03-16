#!/bin/bash

cd ./shortener
docker build -t shortener-main-shortener .
cd ..
cd ./rest-api
docker build -t shortener-rest-api .
cd ..
cd ./management-panel
docker build -t shortener-management-panel-url .
