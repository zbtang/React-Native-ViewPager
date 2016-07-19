#!/bin/bash

rm -rf ./demo/node_modules/rn-viewpager
packName=`npm pack`
cd ./demo
npm install ../$packName
cd ../

