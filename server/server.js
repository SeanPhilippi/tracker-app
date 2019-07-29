const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fetch = require('node-fetch');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

let lastClientId = 0;
const clients = [];

app.post('/clients', (req, res) => {
  const { name, lastClientId, lat, long, location } = req.body;
  lastClientId++;
  const newClient = {
    name,
    clientId: lastClientId,
    lat,
    long,
    location
  }
  clients.push(newClient);
  res.json(clients);
});

app.post('/locations', (req, res) => {
  const { id, lat, long } = req.body;

  fetch('http://nominatim.openstreetmap.org/reverse?format=json&lat=30.2689161&lon=-97.740671999999997&zoom=18&addressdetails=1',
  {
    method: 'GET',
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36"
    }
  })
  .then(res => res.json())
  .then(json => {
    console.log(json);
  });
});

app.use(express.static('client'));
// fallback: look for index.html in /client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client', 'index.html'));
});

app.listen(8050, () => {
  console.log('express app listening on port 8050');
});

