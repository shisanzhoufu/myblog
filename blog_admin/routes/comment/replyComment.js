let db = require('../db.js')
let express = require('express');
let router = express.Router();

router.get('/', function(req, response, next) {
    let data = req.query
    let sql = 'INSERT INTO comment_reply SET  ?'
    let datas = {commentId:data.commentId, fromAvatar: data.fromAvatar,fromId:data.fromId,fromName:data.fromName,time:data.time,toAvatar:data.toAvatar,toId:data.toId,toName:data.toName,content:data.content}
    insertData(sql,datas,function(result){
        response.send({statusCode:200,msg:'回复成功~'}) 
    })







    // let sql = "SELECT * FROM  comment WHERE comment_id = '"+id+"'"
    // operateData(sql,function(result){
    //     console.log(result)
    //     let review
    //     if(result[0].comment_reply!==''){
    //         review = eval(result[0].comment_reply)
    //     }else{
    //         review = []
    //     }
    //     review.push(req.query)
    //     console.log(review)
    //     review = parseJSON(review)
        
    //     let sql = "UPDATE comment SET  comment_reply = '"+review+"' WHERE comment_id = '"+id+"'"
    //         let data = {}
    //         // insertData(sql,data,function(result){
    //         //     // let sql = "SELECT * FROM  comment WHERE comment_id = '"+id+"'"
    //         //     // operateData(sql,function(result){
    //         //     //     console.log(result)
    //         //     // })
    //         //     // console.log(result)
    //         //     response.send({statusCode:200,msg:'注册成功~'}) 
    //         // })
    // })
})
module.exports = router;
