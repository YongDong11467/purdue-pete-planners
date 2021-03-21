const router = require("express").Router();
const manager = require('../account_manager')

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
  manager.searchUsers(req.query.prefix).then(users => {
    console.log("In search users")
    console.log(users)
    res.json(users);
  });
});

router.route("/sendfr").post((req, res) => {
  console.log(req.body.data)
  return manager.updateFriendRequest(req.body.data)
  .then(success => res.status(200).json(success))
  .catch(err => res.status(400).json(err));
});

router.route("/updateUserInfo").post((req, res) => {
  console.log(req.body.data)
  console.log(req.body)
  if (req.body.type == "acceptfr" || req.body.type == "declinefr") {
    return manager.handleAcceptReject(req.body)
    .then(success => res.status(200).json(success))
    .catch(err => res.status(400).json(err));
  }
});

// router.route("/DONOTGOHERE").get((req, res) => { 
//   manager.populateDatabase()
// });

module.exports = router;