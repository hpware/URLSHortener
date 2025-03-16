#!/bin/bash

cd ./management-panel
docker build -t shortener-management-panel-url .
cd ..
cd ./shortener
docker build -t shortener-main-shortener .
cd ..
