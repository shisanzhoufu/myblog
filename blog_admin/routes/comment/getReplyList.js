let db = require('../db.js')
let express = require('express');
let router = express.Router();

router.get('/', function(req, response, next) {
    let id = req.query.commentId
    let page = req.query.page
    let sql = "SELECT * FROM  comment_reply WHERE commentId = '"+id+"'"
    operateData(sql,function(result){
        const total = result.length
        result = result.slice(0,page*3)
        const data = {
            commentList:result,
            total:total
        }
        response.send({statusCode:200,data:data}) 
    })
})
module.exports = router;
