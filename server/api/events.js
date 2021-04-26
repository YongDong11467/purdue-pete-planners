const router = require("express").Router();
const manager = require('../account_manager')

router.route("/").get((req, res) => { 
    const event = ["events"]
    res.json(event);
});

router.post("/events", (req,res) => {

    res.send('200: success')
});

router.route("/createEvent").post((req, res) => {
  console.log(req);
   return manager.createEvent(req.body.name, req.body.description, req.body.Time, req.body.link, req.body.location, req.body.repeat, req.body.owner)
    .then(success => res.status(200).json(success))
    .catch(err => res.status(400).json(err));
  });

  router.route("/searchUserEvent").get((req, res) => {
    manager.searchUserEvent(req.query.prefix).then(users => {
      //console.log(users)
      res.json(users);
    });
  });

  router.route("/getAllEvents").get((req,res) => {
    manager.getAllEvents().then(response => {
      res.json(response);
    });
  });

  router.route("/getCurrentEvent").get((req,res) => {
    manager.getCurrentEvent(req.query.prefix).then(response => {
      res.json(response);
    });
  });

  module.exports = router;