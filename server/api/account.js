const router = require("express").Router();
const account_manager = require("../account_manager");

router.route("/").get((req, res) => { 
    const account = ["login", "register", "profile"]
    res.json(account);
});

router.get("/login", (req,res) => {
    console.log(req);
    res.send('200: success');
});

router.post("/register", (req,res) => {

    res.send('200: success')
});

module.exports = router;