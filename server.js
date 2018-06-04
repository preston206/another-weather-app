const express = require('express');
const app = express();
const axios = require('axios');

app.use(express.static('public', { index: 'index.html' }));

app.get('/current/:city', (req, res) => {

  const APPID = "APPID=0878fcdcd9ee145713639e7da41f6512",
    city = req.params.city;

  axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&${APPID}`, { withCredentials: true })
    .then(response => {
      return res.send(response.data);
    })
    .catch(error => console.log(error));
});

app.get('/forecast/:city', (req, res) => {

  const APPID = "APPID=0878fcdcd9ee145713639e7da41f6512",
    city = req.params.city;

  axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&${APPID}`, { withCredentials: true })
    .then(response => {
      return res.send(response.data.list);
    })
    .catch(error => console.log(error));
});

const PORT = 8080;
app.listen(PORT, () => console.log("server is listening..."));