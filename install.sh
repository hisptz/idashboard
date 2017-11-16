#!/usr/bin/env bash
git submodule init
git submodule update
cd src/app/data-filter
pwd
git pull origin master
cd ../../../
cd src/app/map
pwd
git pull origin master
cd ../../../
cd src/app/menu
pwd
git pull origin master
cd ../../../
#echo "Pulling codes for the main repository"
#git pull origin 2.0
#
#echo "Pulling codes for data filter component"
#cd src/app/data-filter
#git pull
#
#echo "Pulling codes for period filter component"
#cd ../period-filter
#git pull
#
#echo "Pulling codes for menu component"
#cd ../menu
#git pull
#cd ../../../
#
#echo "Downloading dependencies from npm.."
#npm install
