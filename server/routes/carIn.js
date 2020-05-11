const express = require('express');
const router = express.Router();
const db = require('../../db');
const bodyParser = require('body-parser');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('carIn');
});

router.post('/', function(req, res, next) {
    let carNumber = req.body.adduser;
    console.log(req.body);
    let sql = `SELECT paidCar from users WHERE carNumber=?`
    let params =[carNumber];
    db.query(sql, params, function(err, check, fields) {
        
        if(check.length>0) {
            if (check[0].paidCar === 0) { 
                check = `입차처리된 차량입니다. <br/> 차량번호를 확인하세요`; 
                res.send(check)}
            else {
            let sql1 = `INSERT INTO users (carNumber, paidCar, memberId) VALUES (?, ?, ?);`
            let params1 = [carNumber, 0, 1];
            db.query(sql1, params1, function (err, insertinfo, fields) {
                let sql2 = `UPDATE users AS a, members AS b SET a.memberId=b.memberId where a.carNumber=b.carNumber`;
                db.query(sql2, function (err, updates, fiedls) {
                    let sql3 = `UPDATE users SET paidCar=1 WHERE memberId > 1`;
                    db.query(sql3, function (err, rows, fiedls){
                        // if(err) console.log(err);
                        let sql4 = `SELECT * from users Where carNumber=?`
                        let params4 = [carNumber];
                        db.query(sql4, params4, function(err, check, fiedls) {
                        res.send(check);
                        })
                    })
                })
            })}
        }
        else if(check.length === 0) {
        let sql1 = `INSERT INTO users (carNumber, paidCar, memberId) VALUES (?, ?, ?);`
        let params1 = [carNumber, 0, 1];
        db.query(sql1, params1, function (err, insertinfo, fields) {
            let sql2 = `UPDATE users AS a, members AS b SET a.memberId=b.memberId where a.carNumber=b.carNumber`;
            db.query(sql2, function (err, updates, fiedls) {
                let sql3 = `UPDATE users SET paidCar=1 WHERE memberId > 1`;
                db.query(sql3, function (err, rows, fiedls){
                    // if(err) console.log(err);
                    let sql4 = `SELECT * from users Where carNumber=?`
                    let params4 = [carNumber];
                    db.query(sql4, params4, function(err, check, fiedls) {
                    res.send(check);
                    })
                })
            })
        })}
    })
})

module.exports = router;
