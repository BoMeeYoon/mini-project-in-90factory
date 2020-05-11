const db = require('../../db');

class Fee {

    constructor(time, coupon) {
        this.time = time;
        this.coupon = coupon;
    }
    timer(time) {
        if(30<time<=(8*60)) {
            return time = Math.round(time/10)*10;
        } else {
            return time;
        }
    }

    fee(time) {
        let price;
        if (time<=30) { return price = 1000; }
        else if (30<time<=(8*60)) { return price = 1000+((time-30)/10*500);}
        else if ((8*60)<time<(24*60)) { return price = 15000; }
        else { return price = 15000+((time-(24*60))/(10*500));}
    }
  
    discount(coupon, price) {
        switch(coupon) {
            case 0: return price;
            case 1: return price*(1-0.2);
            case 2: return price*(1-0.5);
            case 3: return price*(1-0.7);
        }
    }
  }

module.exports = Fee;