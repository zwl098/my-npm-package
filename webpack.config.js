const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
module.exports = {
  mode:"production",
  entry: './src/components/checkBoxSelect.vue', // 输入文件
  output: { // 输出文件夹及文件名
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    library: 'my-checkbox-select', // 打包后的库全局名称
    libraryTarget: 'umd', // 打包目标的方式
  },
  module: {
    // 使用babel-loader转换ES6代码
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            ['@babel/preset-env', {
              modules: false,
            }],
          ],
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
    ],
  },
  plugins: [
    // 请确保引入这个插件来克隆你的定义
    new VueLoaderPlugin()
  ]
};