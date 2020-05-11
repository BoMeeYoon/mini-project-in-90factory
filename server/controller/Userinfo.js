const db = require('../../db');

class UserInfo {
    
    getinfo (info) {
        for(let userinfo in info){
            
        this.userId = info[userinfo].userId;
        this.carNumber = info[userinfo].carNumber;
        this.entryTime = new Date(info[userinfo].entryTime);
        this.memberId = info[userinfo].memberId;
        this.paid = info[userinfo].paid;
    }}
      
    time (entryTime) {
        let payTime = new Date();
        this.time = Math.floor((payTime.getTime()-this.entryTime.getTime())/60000);
    }
  }

module.exports = UserInfo;