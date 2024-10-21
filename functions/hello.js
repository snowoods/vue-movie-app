exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: 'SNOWOODS',
      age: 111,
      email: 'nbc@snowoods.com'
    })
  }
}