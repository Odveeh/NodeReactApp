const express = require('express');
const router = express.Router();
const request = require('request');
const Controller = require('../Controller/controller');





//player request GET route
router.get('/users/:id', (req, res) => {

    Controller.GETrequest(req, res);

    
});

//player request POST route
router.post('/profile', (req, res) => {

    Controller.POSTRequest(req, res);

});



module.exports = router;