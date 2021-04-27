const router = require("express").Router();
const manager = require('../account_manager');

router.route("/").get((req, res) => {
  const schedule = ["schedule"]
  res.json(schedule);
});

router.post("/schedule", (req,res) => {
  res.send('200: success')
});

router.route("/createSchedule").post((req, res) => {
  console.log('here is create schedule');
  console.log(req);
  return manager.createSchedule(req.body.title, req.body.date, req.body.userName)
    .then(success => res.status(200).json(success))
    .catch(err => res.status(400).json(err));
});

module.exports = router;
