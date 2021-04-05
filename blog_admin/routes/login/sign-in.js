let db = require('../db.js')
let express = require('express');
let router = express.Router();
// let mysql = require("../mysql.config");

router.get('/', function(req, response, next) {
    /**
     * 处理数据
     */
    let user_name = req.query.userName
    let user_password = req.query.password
    let sql = "SELECT * FROM  user WHERE user_name = '"+user_name+"' AND user_password = '"+user_password+"'"
    selectData(sql,function(result){
        if(result){
            response.send({err:200, msg:'登录成功~'}) 
        }
        
    })
})
module.exports = router;
