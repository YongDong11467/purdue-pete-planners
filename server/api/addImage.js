const router = require("express").Router();
const manager = require('../account_manager')

router.route("/").get((req, res) => { 
    const img = ["image"]
    res.json(img);
});