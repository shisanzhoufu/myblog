let db = require('../db.js')
let express = require('express');
let router = express.Router();
let { v4: uuidv4 } = require('uuid')
// let mysql = require("../mysql.config");

router.get('/', function(req, response, next) {
    /**
     * 处理数据
     */
    let user_name = req.query.userName
    let user_password = req.query.userPassword
    let email = req.query.email

    /**
     * sql语句
     */
    let avater = 'http://127.0.0.1/blog/blog_admin/static/img/1618719343117.png'
    let sql = "SELECT * FROM  user WHERE user_name = '"+user_name+"'"
    operateData(sql,function(result){
        if(result.length>0){
           return response.send({statusCode:400,msg:'用户名已存在，换一个叭~'}) 
        }else{
            let sql = 'INSERT INTO user SET  ?'
            let id = uuidv4()
            let data = {user_id:id,user_name:user_name,user_password:user_password,email:email,user_avater:avater}
            insertData(sql,data,function(result){
                response.send({statusCode:200,msg:'注册成功~'}) 
            })
        }
        
    })
})
module.exports = router;
