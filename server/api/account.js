const router = require("express").Router();

router.route("/").get((req, res) => { 
  const account = ["login", "register", "profile"]
  res.json(dining);
});

module.exports = router;