// 載入 Node.js 的 path 模組
const path = require('path')
// 載入 webpack 模組
const webpack = require('webpack')

// Webpack 2 設定值
// 定義開發與正式共用的設定值
const webpackConfig = {
  // 執行環境，即 webpack 指令要作用的工作目錄（本機路徑）
  // __dirname 為此 Webpack 2 設定檔模組的所在目錄
  context: path.join(__dirname, 'src'),
  // Entry（進入點）檔案路徑（基於 context）
  // Entry 即專案中引入依賴其他模組的檔案
  entry: [
    './index.js'
  ],
  // 輸出設定
  output: {
    // 輸出檔的目標位置（本機路徑，須為絕對路徑）
    path: path.join(__dirname, 'dist', 'js'),
    // 輸出檔名
    filename: 'bundle.js',
    // 輸出檔於伺服器公開位置中的絕對路徑
    // 在 Webpack Dev Server 運作時
    // 並不會真的產出轉換後的檔案，而是存放在記憶體中
    // 記憶體中的檔案，路徑會對應 publicPath 所設定的位置
    // 開啟 Hot-Reload 時，此選項為必要設定
    // 因 Hot Module Replacement 須由此位置檢查更新的檔案
    publicPath: '/js/'
  },
  // Loaders（轉換器）設定
  // Loader 可以載入指定的資源，並進行輸出轉換
  module: {
    // Loaders 規則
    rules: [
      {
        // 表示作用在 *.js 檔案（正則表示法）
        test: /\.js$/,
        // 排除作用於 node_modules 目錄（正則表示法）
        exclude: /node_modules/,
        // 應用此規則的 Loaders
        use: [
          {
            // Loader 名稱在 Webpack 2 不可省略 '-loader' 後綴
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
    new webpack.optimize.OccurrenceOrderPlugin()
  )

} else {
  // 開發階段執行，則使用以下設定值：
  // 產生原始碼映射表（Source Map），方便開發時除錯
  webpackConfig.devtool = 'cheap-module-eval-source-map'
  // Webpack Dev Server（WDS）設定
  webpackConfig.devServer = {
    // 伺服器根目錄位置（本機路徑，基於 context）
    contentBase: 'dist',
    // 開啟 inline mode（檔案有更新時自重整頁面）
    inline: true,
    // 開啟 Hot-Reload
    // 檔案有更新時，僅熱抽換該模組（支援的檔案才有效果）
    // 須搭配 Hot Module Replacement 插件
    hot: true,
    // 自動開啟瀏覽器
    open: true,
    port: 9000,
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

// 將全部設定輸出為 Node.js 模組，供 Webpack 2 使用
module.exports = webpackConfig