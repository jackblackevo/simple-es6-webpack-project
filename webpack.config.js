// 載入 Node.js 的 path 模組
const path = require('path')
// 載入 webpack 模組
const webpack = require('webpack')

// Webpack 設定值
// 定義開發與正式共用的設定值
const webpackConfig = {
  // 專案根目錄路徑（本機路徑，須為絕對路徑）
  // 預設值為 webpack 指令作用的工作目錄（current working directory, CWD）
  // __dirname 為此 Webpack 設定檔模組的所在目錄
  context: path.join(__dirname, 'src'),
  // Entry（進入點）檔案路徑（基於 context）
  // 專案應用程式會由 Entry 啟動，並引入依賴模組
  entry: {
    index: './index.js'
  },
  // 輸出設定
  output: {
    // 輸出檔的目標位置（本機路徑，須為絕對路徑）
    path: path.join(__dirname, 'dist', 'js'),
    // 輸出檔名
    filename: 'bundle.js',
    // 輸出檔於伺服器公開位置中的絕對路徑
    // 開啟 Hot-Reload 時，此選項為必要設定
    // 因 Hot Module Replacement 須由此位置檢查更新的檔案
    publicPath: '/js/'
  },
  // 模組設定
  // Webpack 將專案中所有的資源（asset）檔案皆視為模組
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
            /\.js$/
          ],
          // 須排除路徑條件（本機路徑，須為絕對路徑）
          exclude: [
            // 表示排除專案中的 node_modules 目錄
            path.join(__dirname, 'node_modules')
          ]
        },
        // 應用於此處理規則的 Loaders（轉換器）
        // Loader 可以載入指定的資源，並進行輸出轉換
        // Webpack 本身只支援 JavaScript 模組
        // 是藉由 Loader 來支源其它不同類型的資源
        // 作用的順序是由陣列中最末項的 Loader 開始，再依序往前
        // 將轉換過的結果交由前一項索引的 Loader 繼續處理
        // Loader 最後會將資源輸出為字串，Webpack 再包裝成 JavaScript 模組
        use: [
          {
            // Loader 名稱在 Webpack 2 之後不可省略 '-loader' 後綴
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  // 插件
  plugins: [
    // 宣告一個全域的常數並賦值，讓進入點及其相依的模組使用
    new webpack.DefinePlugin({
      // 將 Node.js 環境的 process.env.NODE_ENV 宣告為全域常數
      // 讓瀏覽器環境也可以取用 process.env.NODE_ENV
      // 實際上 DefinePlugin 是以直接替換文字的方式運作
      // 所以賦值的時候，值若是字串則寫法必須特別處理
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  // 若要編譯成正式產品，使用以下設定值：
  // 加入插件
  webpackConfig.plugins.push(
    // 最小化 JavaScript 檔案
    new webpack.optimize.UglifyJsPlugin(),
    // 透過計算引入模組及 chunk（程式碼塊，被 Webpack 重新組合而成的一段一段程式碼）的次數
    // 進而減少整體輸出檔案的大小
    // 自 Webpack 2 開始，預設為開啟
    // new webpack.optimize.OccurrenceOrderPlugin()
  )
} else {
  // 開發階段執行，則使用以下設定值：
  // 產生原始碼映射表（Source Map），方便開發時除錯
  webpackConfig.devtool = 'cheap-module-eval-source-map'
  // Webpack Dev Server（WDS）設定
  webpackConfig.devServer = {
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
    // 因 Webpack Dev Server 運作時
    // 並不會真的產出轉換後的檔案，而是存放在記憶體中
    // 記憶體中的檔案，路徑會對應 devServer.publicPath 所設定的位置
    // 建議與 output.publicPath 一致
    // 若開啟 Hot-Reload，則必須與 output.publicPath 一致
    publicPath: '/js/',
    stats: {
      colors: true
    }
  }
  // 加入插件
  webpackConfig.plugins.push(
    // Hot Module Replacement（HMR）
    new webpack.HotModuleReplacementPlugin(),
    // Hot-Reload 時在瀏覽器 Console 顯示更新的檔案名稱
    new webpack.NamedModulesPlugin()
  )
}

// 將全部設定輸出為 Node.js 模組，供 Webpack 使用
module.exports = webpackConfig
