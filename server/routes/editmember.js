const express = require('express');
const router = express.Router();
const db = require('../../db');
const bodyParser = require('body-parser');

router.post('/', function (req, res, next) {
    let carNumber = req.body.carNumber;
    let name = req.body.name;
    let mobile = req.body.mobile;
    let startDate = req.body.startDate;
    let expireDate = req.body.expireDate;

    console.log(name);
    let sql = `UPDATE members SET name=?, mobile=?, startDate=?, expireDate=? WHERE carNumber =?`
    let param = [name, mobile, startDate, expireDate, carNumber];
    console.log(param+"데이터")
    db.query(sql, param, function(err, add, fields) {
        let sql1 = `SELECT * FROM members where carNumber = ?`
        let param1 = [carNumber]
        db.query(sql1, param1, function (err, edit_check_list, fields) { res.send(edit_check_list);
            console.log(edit_check_list);
        })
    })

})


module.exports = router;