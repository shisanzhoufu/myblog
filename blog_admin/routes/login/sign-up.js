let db = require('../db.js')
let express = require('express');
let router = express.Router();
// let mysql = require("../mysql.config");

router.get('/', function(req, response, next) {
    /**
     * 处理数据
     */
    let user_name = req.query.userName
    let user_password = req.query.userPassword
    let email = req.query.email
    let sql = "SELECT * FROM  user WHERE user_name = '"+user_name+"'"
    selectData(sql,function(result){
        if(result.length>0){
           return response.send({err:200,msg:'用户名已存在，换一个叭~'}) 
        }else{
            let sql = 'INSERT INTO user SET  ?'
            let data = {user_name:user_name,user_password:user_password,email:email}
            insertData(sql,data,function(result){
                response.send({err:200,msg:'注册成功~'}) 
            })
        }
        
    })
})
module.exports = router;