'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"https://api-dev"'
  // BASE_API: '"/admin"',    // 开发
  BASE_API: '"https://easy-mock.com/mock/5c3c2ce0de22053ce38a84de/vivi"',
  staticPath: '"../static/"'   // static路径配置
})
