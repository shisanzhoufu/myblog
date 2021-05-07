let db = require('../db.js');
let express = require('express');
let router = express.Router();
let crypto = require('crypto')

router.post('/', function(req, response, next) {
    /**
     * 处理数据
     */
    let user_name = req.body.userName
    let user_password = req.body.password
    var md5 = crypto.createHash('md5')
    user_password = md5.update(user_password).digest('hex')
    let sql = "SELECT * FROM  user WHERE user_name = '"+user_name+"' AND user_password = '"+user_password+"'"
    operateData(sql,function(result){
        if(result.length>0){
            delete result[0].user_password
            response.send({statusCode:200, msg:'登录成功~',userInfo:result[0]}) 
        }else{
            response.send({statusCode:400, msg:'用户名或密码错误~'}) 
        }
        
    })
})
module.exports = router;
