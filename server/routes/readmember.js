const express = require('express');
const router = express.Router();
const db = require('../../db');
const bodyParser = require('body-parser');


router.post('/', function(req, res, next) {
    let carNum = req.body.search;
    console.log('aaa');
    console.log(carNum);
    let sql = `SELECT * FROM members WHERE carNumber LIKE ?`;
    let params = ['___'+carNum];
    db.query(sql, params, function(err, lists, fields) {
        if (lists.length>0) {
            res.send(lists);  
            console.log(lists+"여기입니다")          
        }
        else if(lists.length === 0) {
        let lists = `미등록 차량입니다. \n 차량번호를 확인하세요.`
        console.log("까꿍") 
            res.send(lists);
        }
    })
})
module.exports = router;

