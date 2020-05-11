const express = require('express');
const router = express.Router();
const db = require('../../db');
const bodyParser = require('body-parser');
const UserInfo = require('../controller/UserInfo');
const Fee = require('../controller/Fee');

let queryId = "";
/* GET home page. */
router.get('/', function(req, res, next) {
  queryId = req.query.id;
  console.log("queryID: ",queryId);
  let sql = `SELECT carNumber, entryTime FROM users WHERE userId = ?`
  db.query(sql, [queryId], function(err, info, fields) {

    let carNumber, entryTime, time, fee, userId = "";
    let userinfo = new UserInfo();

    userinfo.getinfo(info);
    userinfo.time(userinfo.entryTime);

    carNumber = userinfo.carNumber;
    userId = userinfo.userId;
    entryTime = userinfo.entryTime.toLocaleString();

    time = userinfo.time;

    let pay = new Fee();
    time = pay.timer(time);
    fee = pay.fee(time);
    

    res.render('carOut_pay', {info:info, carNumber:carNumber, entryTime:entryTime, time:time, fee:fee, userId:userId});
  });
});


router.post('/', function(req, res, next) {
  let sql = `UPDATE users SET paidCar=1, exitTime=NOW() WHERE userId = ?`
  db.query(sql, [queryId], function(err, rows, fields) {
    console.log("ok");
    let byetext = `이용해 주셔서 감사합니다.`;
    res.send(byetext);
  })
})

module.exports = router;
