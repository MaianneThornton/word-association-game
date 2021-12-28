// backend process to access the api without revealing my api key
const PORT = 8000
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const axios = require('axios')
const app = express()

app.use(cors())

app.get('/results', (req, res) => {
  // setting the level of hardness selected by user as a variable to be passed into the parameters
  const passedLevel = req.query.level
  console.log(passedLevel);

  const options = {
    method: 'GET',
    url: 'https://twinword-word-association-quiz.p.rapidapi.com/type1/',
    params: { level: passedLevel, area: 'sat' },
    headers: {
      'x-rapidapi-host': 'twinword-word-association-quiz.p.rapidapi.com',
      'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
    }
  };

  axios.request(options).then(function (response) {
    res.json(response.data)
    // error handling
  }).catch(function (error) {
    console.error(error);
  });
})

app.listen(PORT, () => console.log(`Server running on ${PORT}`))