let db = require('../db.js')
let express = require('express');
let router = express.Router();

router.get('/', function(req, response, next) {
    let blog_class = req.query.class
    let sql = "SELECT * FROM  blog WHERE blog_class = '"+blog_class+"'"
    operateData(sql,function(result){
        
        response.send({statusCode:200,commentList:result}) 
    })
})
module.exports = router;
