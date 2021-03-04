const router = require("express").Router();
const axios = require('axios')

var diningUrl = 'https://api.hfs.purdue.edu/menus/v2/';

router.route("/").get((req, res) => {
  //TODO: parse the data
  diningUrl += "locations/Hillenbrand/03-03-2021";
  return axios.get(diningUrl)
    .then((response) => {
      if (!response.data) {
        return reject('No data was returned');
      }

      console.log(response.data)
      res.json(response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
});

router.route("/locations").get((req, res) => {
  //TODO: get rw date
  return axios.get(diningUrl + `locations/${req.query.location}/03-03-2021`)
    .then((response) => {
      if (!response.data) {
        return reject('No data was returned');
      }

      console.log(response.data)
      res.json(response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
});

module.exports = router;