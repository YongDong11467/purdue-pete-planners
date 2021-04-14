const diningRouter = require("./api/dining");
const accountRouter = require("./api/account");
const eventRouter = require("./api/events");
const messageRouter = require("./api/messaging");
const account_manager = require("./account_manager");
const cors = require("cors");

const app = require('express')();
const http = require('http').createServer(app);
const io = require("socket.io")(http, {cors: {
    origin: '*',
  }
});
bodyParser = require("body-parser");
port = 3080;

async function initialize_app(){
    await account_manager.startDatabaseConnection();

    // The following lines are meant for testing, and should not be uncommented
    /*
    await account_manager.getUserChats("goodwi13");
    let id = await account_manager.createChatRoom(["goodwi13", "simp"]);
    console.log(id);
    await account_manager.getChatHistory(id);
    */
}

//initialize_app();
app.use(bodyParser.json());
app.use(cors());
app.use("/api/dining", diningRouter);
app.use("/api/account", accountRouter);
app.use("/api/events", eventRouter);
app.use("/api/messaging", messageRouter);

app.get('/', (req,res) => {
    res.send('Default route');
});

io.on('connection', (socket) => {
    console.log('a user connected via socket.io');

    socket.on('message', (message) => {});

    socket.on('disconect', () => {
        console.log('a user disconnected via socket.io');
    });
});

http.listen(process.env.PORT || port, async () => {
    try{
        initialize_app();
        console.log(`Server listening on the port::${port}`);
    }catch(err){
        console.error(err);
    }
});


