const router = require("express").Router();
<<<<<<< HEAD
const account_manager = require("../account_manager");
=======
const manager = require('../account_manager')
>>>>>>> 56c704f9e860e0237860b0a8efef189ac2986133

router.route("/").get((req, res) => { 
    const account = ["login", "register", "profile"]
    res.json(account);
});

router.post("/login", (req,res) => {
    console.log(req);
    response = "HTTP/1.1 200 OK";
    res.end(response);
});

router.post("/register", (req,res) => {

    res.send('200: success')
});

router.route("/searchUsers").get((req, res) => { 
  manager.searchUsers(req.query.prefix).then(function (users) {
    res.json(users);
  });
});

module.exports = router;