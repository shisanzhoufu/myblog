let db = require('../db.js')
let express = require('express');
let router = express.Router();

router.get('/', function(req, response, next) {
    /**
     * 处理数据
     */
     let user_id = req.query.userid
     let blog_id= req.query.blogid
     let status = req.query.status
     let blog_like = req.query.bloglike
     let sta = {
         true:1,
         false:0
     }

     status = sta[status]
    let sql = "SELECT * FROM  blog_like WHERE user_id = '"+user_id+"' AND blog_id = '"+blog_id+"'"
    operateData(sql,function(result){
        console.log(result.length)
        let sql = "UPDATE blog SET  ? WHERE  blog_id = '"+blog_id+"'"
        let data = {blog_id:blog_id,blog_like:blog_like}
        insertData(sql,data,function(result){
            console.log('点赞+1')
        })
        if(result.length===0){
            let sql = 'INSERT INTO blog_like SET  ?'
            let data = {user_id:user_id,blog_id:blog_id,status:status}
            insertData(sql,data,function(result){
                response.send({statusCode:200,msg:'点赞成功~'}) 
            })
        }else{
            let sql = "UPDATE blog_like SET  ? WHERE user_id = '"+user_id+"' AND blog_id = '"+blog_id+"'"
            let data = {user_id:user_id,blog_id:blog_id,status:status}
            console.log('更新')
            insertData(sql,data,function(result){
                response.send({statusCode:200,msg:'点赞成功~'}) 
            })
        }
    })
    
})
module.exports = router;
