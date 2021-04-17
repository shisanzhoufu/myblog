let db = require('../db.js')
let express = require('express');
let router = express.Router();

router.get('/', function(req, response, next) {
    /**
     * 处理数据
     */
     const gender = {
         "女":0,
         "男":1,
      };
      let id = req.query.userid
     let user_name = req.query.username
     let user_gender = gender[req.query.usergender]
     let email = req.query.email
     let user_brief = req.query.userbrief
     let avater = req.query.useravater
     let data = {user_gender:user_gender,user_name:user_name,user_brief:user_brief,email:email,user_avater:avater}
    let sql = "UPDATE user SET  ?  WHERE user_id = '"+id+"'"
    
    insertData(sql,data,function(result){
        let sql = "SELECT * FROM  user WHERE user_id = '"+id+"'"
        operateData(sql,function(result){
            delete result[0].user_password
            if(result.length>0){
                response.send({statusCode:200, msg:'修改成功~',userInfo:result[0]}) 
            }else{
                response.send({statusCode:400, msg:'出错了，等会儿再试试叭~'}) 
            }
            
    })
})
})
module.exports = router;
