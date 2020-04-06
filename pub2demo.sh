#!/bin/bash

rm -rf ./RNViewPagerDemo/node_modules/rn-viewpager-handy
packName=`npm pack`
cd ./RNViewPagerDemo
npm install ../$packName
cd ../
