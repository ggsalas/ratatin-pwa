var axios = require('axios')

const people = async (req, res) => {
  try {
    const response = await axios({
      method: 'get',
      url: 'https://api.gotinder.com/v2/recs/core?locale=en',
      headers: { 'x-auth-token': req.query.token },
    })

    res.status(200).json(JSON.stringify(response.data))
  } catch (error) {
    throw new Error('people error ', JSON.stringify(error))
  }
}

export default people
