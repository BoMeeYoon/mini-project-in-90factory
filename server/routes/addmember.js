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

    console.log(carNumber);
    let sql = `INSERT INTO members (carNumber, name, mobile, startDate, expireDate) VALUES (?, ?, ?, ?, ?)`
    let param = [carNumber, name, mobile, startDate, expireDate, carNumber];
    console.log(param+"데이터")
    db.query(sql, param, function(err, add, fields) {
        let sql1 = `SELECT * FROM members where carNumber = ?`
        let param1 = [carNumber]
        db.query(sql1, param1, function (err, check, fields) { res.send(check);
            console.log(check);
        })
    })

})


// router.post('/', function (req, res, next) {
//     let carNumber = req.body.carNumber;
//     let name = req.body.name;
//     let mobile = req.body.mobile;
//     let startDate = req.body.startDate;
//     let expireDate = req.body.expireDate;

//     console.log(carNumber);
//     let sql = `INSERT INTO members (carNumber, name, mobile, startDate, expireDate) VALUES (?, ?, ?, ?, ?)`
//     let param = [carNumber, name, mobile, startDate, expireDate, carNumber];
//     console.log(param+"데이터")
//     db.query(sql, param, function(err, add, fields) {
//         let sql1 = `SELECT * FROM members where carNumber = ?`
//         let param1 = [carNumber]
//         db.query(sql1, param1, function (err, check, fields) {
//             console.log(check);
//         })
//     })

// })

module.exports = router;