let db = require('../db.js')
let express = require('express');
let router = express.Router();

router.get('/', function(req, response, next) {
    let id = req.query.commentId
    let sql = "SELECT * FROM  comment_reply WHERE commentId = '"+id+"'"
    operateData(sql,function(result){
        response.send({statusCode:200,commentList:result}) 
    })
})
module.exports = router;
