const router = require("express").Router();

router.route("/").get((req, res) => { 
  const dining = ["hilly", "earhart"];
  res.json(dining);
});

module.exports = router;