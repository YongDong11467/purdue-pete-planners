const express = require('express');
const diningRouter = require("./api/dining");
const accountRouter = require("./api/account");
const account_manager = require("./account_manager");


const app = express(),
      bodyParser = require("body-parser");
      port = 3080;


async function initialize_app(){
    await account_manager.startDatabaseConnection();
}
app.use(bodyParser.json());
app.use("/api/dining", diningRouter);
app.use("/api/account", accountRouter);


app.get('/', (req,res) => {
    res.send('Default route');
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});

initialize_app()