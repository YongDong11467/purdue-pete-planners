const express = require('express');
const diningRouter = require("./api/dining");
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;

app.use(bodyParser.json());
app.use("/api/dining", diningRouter);

app.get('/', (req,res) => {
    res.send('Default route');
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});