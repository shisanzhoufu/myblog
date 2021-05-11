let db = require('../db.js')
let express = require('express');
let router = express.Router();

router.get('/', function (req, response, next) {
    let id = req.query.blogid
    console.log(id)
    let sql = "DELETE FROM  blog WHERE blog_id = '" + id + "'"
    operateData(sql, function (result) {
            let sql = "SELECT * FROM  blog"
            operateData(sql, function (result) {
                response.send({ statusCode: 200, commentList: result })
            })
        
    })
})
module.exports = router;
