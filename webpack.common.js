// 載入 Node.js 的 path 模組
const path = require('path')
// 載入 HtmlWebpackPlugin 插件
const HtmlWebpackPlugin = require('html-webpack-plugin')

// webpack 設定值
// 定義開發與正式共用的設定值
const webpackCommonConfig = {
  // 專案根目錄路徑（本機路徑，須為絕對路徑）
  // 預設值為 webpack 指令作用的工作目錄（current working directory, CWD）
  // __dirname 為此 webpack 設定檔模組的所在目錄
  context: path.join(__dirname, 'src'),
  // Entry（進入點）檔案路徑（基於 context）
  // 專案應用程式會由 Entry 啟動，並引入依賴模組
  entry: {
    index: ['./js/index.tsx']
  },
  // 輸出設定
  output: {
    // 輸出檔的目標位置（本機路徑，須為絕對路徑）
    path: path.join(__dirname, 'dist'),
    // 輸出檔名（可包含路徑）
    filename: 'js/bundle.js',
    // 預定所有資源檔案會置於伺服器中（通常為 CDN）的基礎路徑，即為引用靜態資源時的根路徑
    // 開啟 Hot-Reload 時，此選項為必要設定
    // 因 Hot Module Replacement 須由此基礎路徑下取得更新的資源
    publicPath: '/'
  },
  // 模組設定
  // webpack 將專案中所有的資源（asset）檔案皆視為模組
  // 在此設定如何處理專案中各種不同類型的資源模組（即檔案）
  module: {
    // 模組處理規則
    rules: [
      {
        // 資源檔案篩選條件
        resource: {
          // 須符合正則表示法條件
          test: [
            // 表示作用在所有 *.js 檔案
            /\.[jt]sx?$/
          ],
          // 須排除路徑條件（本機路徑，須為絕對路徑）
          exclude: [
            // 表示排除專案中的 node_modules 目錄
            path.join(__dirname, 'node_modules')
          ]
        },
        // 應用於此處理規則的 Loaders（轉換器）
        // Loader 可以載入指定的資源，並進行輸出轉換
        // webpack 本身只支援 JavaScript 模組
        // 是藉由 Loader 來支源其它不同類型的資源
        // 作用的順序是由陣列中最末項的 Loader 開始，再依序往前
        // 將轉換過的結果交由前一項索引的 Loader 繼續處理
        // Loader 最後會將資源輸出為字串，webpack 再包裝成 JavaScript 模組
        use: [
          {
            // Loader 名稱在 webpack 2 之後不可省略 '-loader' 後綴
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  // 插件
  plugins: [
    // 動態產生 HTML 並自動引入輸出後的 Entry 檔案
    new HtmlWebpackPlugin({
      // 依據的模板檔案路徑（基於 context）
      template: './index.html',
      // 要引入的 Entry 名稱
      chunks: ['index']
    })
  ]
}

// 將全部設定輸出為 Node.js 模組，供 webpack 使用
module.exports = webpackCommonConfig
