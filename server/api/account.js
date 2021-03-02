const router = require("express").Router();
const account_manager = require("../account_manager");

router.route("/").get((req, res) => { 
    const account = ["login", "register", "profile"]
    res.json(account);
});

router.post("/login", (req,res) => {
    console.log(req);
    response = {
        status: "HTTP/1.1 200 OK"
    }
    res.end(response);
});

router.post("/register", (req,res) => {

    res.send('200: success')
});

module.exports = router;