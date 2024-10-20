// 현재 프로젝트에서 모듈 경로를 찾을 수 있도록 지정.
// 특히 Windows에서 발생하는 오류 해결을 위한 코드.
// 이 코드가 없어도 잘 동작하는 경우 필요치 않음.
const _require = id => require(require.resolve(id, { paths: [require.main.path] }))

// import
const path = _require('path')
const HtmlPlugin = _require('html-webpack-plugin')
const CopyPlugin = _require('copy-webpack-plugin')
const {VueLoaderPlugin} = _require('vue-loader')

// export
module.exports = {
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '~': path.resolve(__dirname, 'src'),
      'assets': path.resolve(__dirname, 'src/assets')
    }
  },

  // 파일을 읽어들이기 시작하는 진입점 설정
  entry: './src/main.js',

  // BUILD: 결과물(번들)을 반환하는 설정
  output: {
    // path: path.resolve(__dirname, 'dist'), // 절대경로 __dirname 부터 뒤 내용을 하나로 합쳐준다.
    // // __dirname : 현재 파일이 있는 절대 경로. -> path : 최종 절대 경로를
      // filename: 'main.js', // 위 내용을 모드 반영하여 main.js로 배포.
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      },
      {
        test: /\.s?css$/, // .css를 갖는 모든 파일은 test 속성이고 use: 패키지를 사용한다.
        use: [
          'vue-style-loader', // 4. .vue 파일 내부의 style 태그 부분을 동작하도록 로딩
          'style-loader', // 3. index.html에 style 태그로 삽입
          'css-loader',    // 2. css-loader로 javascript에서 css 해석
          'postcss-loader', // 1. postcss-loader로 공급 업체 접두사 적용 및 postcss 플러그인 사용
          'sass-loader' // 0. main.scss 내용을 sass-loader로 해석
        ]
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader' // js 파일들에 babel 적용하여 index.html script 태크로 추가
        ]
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        use: 'file-loader'
      }
    ]
  },

  // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  plugins: [
    new HtmlPlugin({
      template: './index.html' // html 시작 파일
    }),
    new CopyPlugin({
      patterns: [
        { from: 'static'} // 개발/배포용 리소스 디렉토리 static 에서 배포 디렉토리 dist 로 복사.
      ]
    }),
    new VueLoaderPlugin()
  ],

  // DEV
  devServer: {
    host: 'localhost', // 개발 서버 주소
    compress: false, // gzip 압축
    port: 8080,
    hot: true, // HMR(Hot Module Replacement) 활성화 (실시간 갱신)
  }
}