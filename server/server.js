const express = require('express');
const diningApi = require('./api/dining');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;

app.use(bodyParser.json());

app.get('/', (req,res) => {
    res.send('Default route');
});

app.get('/api/dining', (req, res) => {
    const dining = diningApi.getDiningCourts();
    res.json(dining);
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});