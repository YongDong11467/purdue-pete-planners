const router = require("express").Router();
let manager = require("../account_manager");

router.route("/").get((req, res) => { 
  const account = ["login", "register", "profile"]
  res.json(dining);
});

router.route("/searchUser").get((req, res) => { 
  console.log(req.query)
  const users = manager.getUsers("bob")
  res.json(users);
});

module.exports = router;