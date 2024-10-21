const axios = require('axios')
const { OMDB_API_KEY } = process.env

exports.handler = async function (event, context) {
  // console.log(event)
  // console.log(context)
  const payload = JSON.parse(event.body)
  const { title, type, year, page, id } = payload
  const url = id 
  ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
  : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

  try {
    const { data } = await axios.get(url)
    if (data.Error) {
      return {
        statusCode: 400,
        body: data.Error // 문자 데이터 반환해야한다.
      }
    }
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch (error) {
    return {
      statusCode: error.response.status,
      body: error.message
    }
  }

  // return new Promise((resolve, reject) => {
  //   axios.get(url)
  //     .then((res) => {
  //       // console.log(res)
  //       // 정상 결과에 에러 메시지가 나올 수 있다.
  //       if (res.data.Error) {
  //         reject(res.data.Error)
  //       }
  //       resolve(res)
  //     })
  //     .catch(err => {
  //       reject(err.message) // axios.get 에러 발생하면 javascript error 객체 전달.
  //     })
  // })
}