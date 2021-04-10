let db = require('../db.js')
let express = require('express');
let router = express.Router();

router.post('/', function(req, response, next) {
    /**
     * 处理数据
     */
    let user_name = req.body.userName
    let user_password = req.body.password
    let sql = "SELECT * FROM  user WHERE user_name = '"+user_name+"' AND user_password = '"+user_password+"'"
    selectData(sql,function(result){
        delete result[0].user_password
        if(result.length>0){
            response.send({statusCode:200, msg:'登录成功~',userInfo:result[0]}) 
        }else{
            response.send({statusCode:400, msg:'用户名或密码错误~'}) 
        }
        
    })
})
module.exports = router;
