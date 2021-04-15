let db = require('../db.js')
let express = require('express');
let router = express.Router();

router.get('/', function(req, response, next) {
    /**
     * 处理数据
     */
    let user_name = req.query.userName
    let user_id = req.query.userId
    let user_avater = req.query.userAvater
    let comment_info = req.query.comment
    let time = req.query.time
    let sql = 'INSERT INTO comment SET  ?'
    let data = {user_id:user_id,user_name:user_name,user_avater:user_avater,comment_info:comment_info,comment_time:time}
    insertData(sql,data,function(result){
        response.send({statusCode:200,msg:'留言成功~'}) 
    })
})
module.exports = router;
