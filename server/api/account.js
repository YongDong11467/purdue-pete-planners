const router = require("express").Router();
const manager = require('../account_manager')

router.route("/").get((req, res) => { 
    const account = ["login", "register", "profile"]
    res.json(account);
});

/**
 * validates user credentials and allows login
 */
router.route("/login").post((req,res) => {
    console.log(req.body);
    let pass = manager.getAccountPassword(req.body.username);
    if(pass != req.body.password){
        //TODO: Add encryption for passwords
        //Passwords don't match. Deny entry
        return res.status(400).json(err);
    }else{
        return res.status(200).json(success);
    }
});

router.route("/register").post((req,res) => {
    console.log(req.body.uname);
    return manager.createAccount(req.body.uname, 'cs', req.body.email, req.body.pass)
    .then(success => res.status(200).json(success))
    .catch(err => res.status(400).json(err));
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

// router.route("/DONOTGOHERE").get((req, res) => { 
//   manager.populateDatabase()
// });

module.exports = router;