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
   return manager.createEvent(req.body.name, req.body.description, req.body.Time, req.body.link, req.body.location, req.body.repeat)
    .then(success => res.status(200).json(success))
    .catch(err => res.status(400).json(err));
  });

/*
  router.post("/createEvent", (req,res) => {
    console.log(req);
    response = "HTTP/1.1 200 OK";
    res.end(response);
});
*/


  module.exports = router;