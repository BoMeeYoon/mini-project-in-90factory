const express = require('express');
const router = express.Router();
const db = require('../../db');
const bodyParser = require('body-parser');

router.post('/', function (req, res, next) {

    let carNumber = req.body.carNumber;

    let sql = `DELETE from members where carNumber = ?`

    db.query(sql, [carNumber], function(err, delete_check, fields) {
        
        res.send(delete_check)
        return 1;
    })

})


module.exports = router;
