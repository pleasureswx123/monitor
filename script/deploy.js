#!/usr/bin/env node

const webpack = require('webpack');
const fs      = require('fs');
const path    = require('path');

let webpackConf = require('../webpack.config.js');

webpack(webpackConf({production: true}), function(err, stats){
  console.log('ok111111');
});
