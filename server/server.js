const express = require('express');
const diningRouter = require("./api/dining");
const accountRouter = require("./api/account");
const account_manager = require("./account_manager");


const app = express(),
      bodyParser = require("body-parser");
      port = 3080;


async function initialize_app(){
    await account_manager.startDatabaseConnection();

    // The following lines are meant for testing, and should not be uncommented
    /* 
    await account_manager.getUserChats("goodwi13");
    await account_manager.createChatRoom(["goodwi13", "simp"]);
    */
}

//initialize_app();
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
