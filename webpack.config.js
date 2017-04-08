// 載入 Node.js 的 path 模組
const path = require('path')
// 載入 webpack 模組
const webpack = require('webpack')

// 將全部設定輸出為模組，供 Webpack 2 使用
module.exports = {
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
          },
          {
            // 使用套件來自動加入 Hot Module Replacement 的 API 呼叫
            loader: 'webpack-module-hot-accept'
          }
        ]
      }
    ]
  },
  // 產生原始碼映射表（Source Map），方便開發時除錯
  devtool: 'cheap-module-eval-source-map',
  // Webpack Dev Server 設定
  devServer: {
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
  },
  // 插件
  plugins: [
    // Hot Module Replacement（HMR）
    new webpack.HotModuleReplacementPlugin(),
    // Hot-Reload 時在瀏覽器 Console 顯示更新的檔案名稱
    new webpack.NamedModulesPlugin()
  ]
}