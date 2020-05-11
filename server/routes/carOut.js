const express = require('express');
const router = express.Router();
const db = require('../../db');
const bodyParser = require('body-parser');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('carOut');
});

router.post('/', function(req, res, next) {
    let carNumber = req.body.search;
    let sql = `SELECT * FROM users WHERE carNumber LIKE ?`;
    let params = ['___'+carNumber];
    db.query(sql, params, function(err, lists, fields) {
        if(err) {console.log(err);}
        else if (lists.length>0) {
            let list = [];
            let paidc = [];
            for(let i=0; i<lists.length; i++) {
                if(lists[i].paidCar === 0) {
                    list.push(lists[i]);
                } else {
                    paidc.push(list[i]);
                }
            }
            if(list.length>0) {
                res.send(list);
            } else if (paidc.length>0) {
                let list = `정산된 차량입니다.`
                res.send(list);
            }
            
        }
        else if(lists.length === 0) {
        let list = `미등록 차량입니다. <br/>차량번호를 확인하세요.`
            res.send(list);
        }
    })
})
module.exports = router;

