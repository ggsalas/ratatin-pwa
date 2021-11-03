var axios = require('axios')

const peopleAction = async (req, res) => {
  try {
    const response = await axios({
      method: 'get',
      url: `https://api.gotinder.com/${req.query.action}/${req.query.id}`,
      headers: { 'x-auth-token': req.query.token },
    })

    // match_result will be true if they like you, false if they haven't liked you or don't like you
    res.status(200).json(JSON.stringify(response.data))
  } catch (error) {
    throw new Error('people error ', JSON.stringify(error))
  }
}

export default peopleAction
