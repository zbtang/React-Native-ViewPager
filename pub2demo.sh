#!/bin/bash

rm -rf ./RNViewPagerDemo/node_modules/rn-viewpager
packName=`npm pack`
cd ./RNViewPagerDemo
npm install ../$packName
cd ../
