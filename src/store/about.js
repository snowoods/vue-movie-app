export default {
  namespaced: true,
  // state을 함수로 만들어야하는 이유.
  // - 객체 데이터는 배열처럼 참조형 데이터이다.
  // 데이터 불변성을 유지하려면 함수로 만들어서 반환해야 
  // 그때 그때 state 속성에서 사용하는 데이터가 고유해진다.
  // --> 매번 메모리에 할당하여 리턴하기 때문에 참조형 데이터타입이라도 고유 데이터에 접근한다.
  state: () => ({
    name: 'SNOWOODS',
    email: 'support@snowoods.com',
    blog: 'https://codeself.com',
    phone: '+81-10-1234-5678',
    image: 'https://tistory1.daumcdn.net/tistory/939805/skin/images/logo-man.png'
  })
}