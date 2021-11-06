var axios = require('axios')

const matches = async (req, res) => {
  try {
    // TODO: the response not include all matches, only matches that you have talked
    const response = await axios({
      method: 'get',
      url: 'https://api.gotinder.com/v2/matches?locale=en&count=60&message=1&is_tinder_u=false',
      headers: { 'x-auth-token': req.query.token, Origin: 'localhost' },
    })

    res.status(200).json(response.data)
  } catch (error) {
    console.error(error)
    throw new Error('matches error ', JSON.stringify(error))
  }
}

export default matches
