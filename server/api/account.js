const router = require("express").Router();
const manager = require('../account_manager')

router.route("/").get((req, res) => { 
  const account = ["login", "register", "profile"]
  res.json(dining);
});

router.route("/searchUsers").get((req, res) => {
  manager.searchUsers(req.query.prefix).then(users => {
    console.log("In search users")
    console.log(users)
    res.json(users);
  });
});

// router.route("/DONOTGOHERE").get((req, res) => { 
//   manager.populateDatabase()
// });

module.exports = router;