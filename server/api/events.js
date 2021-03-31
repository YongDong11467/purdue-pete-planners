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
    manager.createEvent(req.query.name, req.query.description, req.query.time, req.query.link, req.query.location, req.query.repeat).then(events => {
      console.log(events)
      res.json(events);
      res.send(events);
    });
  });

  module.exports = router;
  