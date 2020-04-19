#!/bin/bash

rm -rf ./demo/node_modules/@shankarmorwal/rn-viewpager
packName=`npm pack`
cd ./demo
npm install ../$packName
cd ../
