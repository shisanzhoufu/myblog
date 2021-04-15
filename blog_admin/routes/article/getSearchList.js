let db = require('../db.js')
let express = require('express');
let router = express.Router();

router.get('/', function(req, response, next) {
    let value = req.query.searchInfo
    let sql = "SELECT * FROM blog WHERE blog_title  LIKE '%"+value+"%'"
    operateData(sql,function(result){
        response.send({statusCode:200,commentList:result}) 
    })
})
module.exports = router;
