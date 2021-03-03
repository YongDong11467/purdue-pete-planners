const router = require("express").Router();
const manager = require('../account_manager')

router.route("/").get((req, res) => { 
  const account = ["login", "register", "profile"]
  res.json(dining);
});

router.route("/searchUsers").get((req, res) => { 
  manager.searchUsers(req.query).then(function (users) {
    res.json(users);
  });
});

module.exports = router;