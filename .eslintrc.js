// module.exports
// export default 
module.exports = {
  env: { // 프론트엔드는 둘 다
    browser: true, // 브라우저 환경 코드 검사
    node: true // NodeJS 환경 코드 검사
  },
  extends: [
    // vue
    // 'plugin:vue/vue3-essential', // Lv1
    'plugin:vue/vue3-strongly-recommended', // Lv2
    // 'plugin:vue/vue3-recommended', // Lv3
    // js
    'eslint:recommended'
  ],
  parserOptions: { // 코드 분석기 지정
    parser: 'babel-eslint' // babel : ES6 이상의 문법을 ES5로 변경
  },
  rules: { 
    // 위의 extends 부분의 문법 제약을 추가했다면 특별히 추가할 내용 없다.    
    // 단, 아래는 eslint 추가 내용.

    'vue/html-self-closing': ['error', {
      html: {
        void: 'always',
        normal: 'never',
        component: 'always'
      },
      svg: 'always',
      math: 'always'
    }],
    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline: 'never'
    }]
  }
}