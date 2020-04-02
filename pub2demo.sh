#!/bin/bash

rm -rf ./RNViewPagerDemo/node_modules/@shankarmorwal/rn-viewpager
packName=`npm pack`
cd ./RNViewPagerDemo
npm install ../$packName
cd ../
