var axios = require('axios')

export default (req, res) => {
  var config = {
    method: 'get',
    url: 'https://api.gotinder.com/v2/fast-match/teasers?locale=en',
    headers: {
      'x-auth-token': req.query.token,
      Origin: 'tinder.com',
    },
  }

  axios(config)
    .then(function (response) {
      res.statusCode = 200
      res.json(JSON.stringify(response.data))
    })
    .catch(function (error) {
      console.log(error)
    })
}
