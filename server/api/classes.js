const router = require("express").Router();
const manager = require('../account_manager')

router.route("/").get((req, res) => { 
    const event = ["classAdd", "classRemove"]
    res.json(event);
});

router.route("/classAdd").post((req,res) => {
    //console.log(req.body);
    //console.log("req-class: ", req.body.classes);
    return manager.addClassToUser(req.body.user_name, req.body.data)
    .then(success => res.status(200).json(success))
    .catch(err => res.status(400).json(err));
});

router.route("/classRemove").post((req,res) => {
    console.log(req.body);
    console.log("req-data: ", req.body.data);
    return manager.RemoveClassToUser(req.body.user_name, req.body.data)
    .then(success => res.status(200).json(success))
    .catch(err => res.status(400).json(err));
});

module.exports = router;