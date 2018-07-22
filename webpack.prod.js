const merge = require('webpack-merge')

const webpackCommonConfig = require('./webpack.common.js')

const webpackProdConfig = {
  // 若要編譯成正式產品，使用以下設定值：
  mode: 'production',
  // 加入 optimization 設定
  optimization: {
    // 最小化 JavaScript 檔案
    // 於 production mode 時預設為開啟
    // minimize: true,
    // 透過計算引入模組及 chunk（程式碼塊，被 webpack 重新組合而成的一段一段程式碼）的次數
    // 進而減少整體輸出檔案的大小
    // 自 webpack 2 開始，預設為開啟
    // occurrenceOrder: true
  }
}

module.exports = merge(webpackCommonConfig, webpackProdConfig)
