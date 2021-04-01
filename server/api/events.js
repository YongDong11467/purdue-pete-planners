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
    manager.createEvent(res.query.name, res.query.description, res.query.time, res.query.link, res.query.location, res.query.repeat).then(events => {
      console.log(events)
      res.json(events);
      res.send(events);
    });
  });

  module.exports = router;