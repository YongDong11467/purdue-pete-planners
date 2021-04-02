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
    manager.createEvent(req.query.body.name, req.query.body.description, req.query.body.time, req.query.body.link, req.body.query.location, req.query.body.repeat).then(events => {
      console.log(events)
      res.json(events);
      res.send(events);
    });
  });

/*
  router.post("/createEvent", (req,res) => {
    console.log(req);
    response = "HTTP/1.1 200 OK";
    res.end(response);
});
*/


  module.exports = router;