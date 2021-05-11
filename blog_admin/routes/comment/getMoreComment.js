let db = require('../db.js')
let express = require('express');
let router = express.Router();

router.get('/', function (req, response, next) {
    let sql = "SELECT * FROM  comment"
    
    let page = req.query.page
    operateData(sql, function (result) {
        const total = result.length
        result = result.slice(0,page*10)
        const data = {
            commentList:result,
            total:total
        }
        response.send({statusCode:200,data:data}) 
    })
})
module.exports = router;
