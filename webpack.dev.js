// 載入 Node.js 的 path 模組
const path = require('path')
// 載入 webpack 模組
const webpack = require('webpack')
const merge = require('webpack-merge')

const webpackCommonConfig = require('./webpack.common.js')

const webpackDevConfig = {
  // 開發階段執行，則使用以下設定值：
  mode: 'development',
  // 產生原始碼映射表（Source Map），方便開發時除錯
  devtool: 'cheap-module-eval-source-map',
  // webpack DevServer（WDS）設定
  devServer: {
    // 伺服器根目錄位置（本機路徑，建議使用絕對路徑）
    contentBase: path.join(__dirname, 'dist'),
    // 開啟 inline mode（檔案有更新時自動重整頁面）
    // 使用 Hot Module Replacement 時建議開啟此模式
    inline: true,
    // 開啟 Hot-Reload
    // 檔案有更新時，僅熱抽換該模組（支援的檔案才有效果）
    // 須搭配 Hot Module Replacement 插件
    hot: true,
    // 自動開啟瀏覽器
    open: true,
    port: 9000,
    // 因 webpack DevServer 運作時
    // 並不會真的產出轉換後的資源檔案，而是存放在記憶體中
    // 記憶體中的檔案，其在 DevServer 上的服務位置即在 devServer.publicPath 所設定的路徑之下
    // 建議與 output.publicPath 一致
    // 若開啟 Hot-Reload，則必須與 output.publicPath 一致，才能取得更新的內容
    publicPath: '/',
    stats: {
      colors: true
    }
  },
  // 加入插件
  plugins: [
    // Hot Module Replacement（HMR）
    new webpack.HotModuleReplacementPlugin()
  ],
  // 加入 optimization 設定
  optimization: {
    // 宣告一個全域的常數並賦值，讓進入點及其相依的模組使用
    // 將 Node.js 環境的 process.env.NODE_ENV 宣告為全域常數
    // 讓瀏覽器環境也可以取用 process.env.NODE_ENV
    // webpack 4 以新增的 mode 參數值為預設值
    // （實際上是使用 DefinePlugin）
    // nodeEnv: argv.mode,
    // Hot-Reload 時在瀏覽器 Console 顯示更新的檔案名稱
    // 於 development mode 時預設為開啟
    // namedModules: true
  }
}

module.exports = merge(webpackCommonConfig, webpackDevConfig)
