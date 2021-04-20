let db = require('../db.js')
let express = require('express');
let router = express.Router();

router.get('/', function (req, response, next) {
    let id = req.query.commentid
    console.log(id)
    let sql = "DELETE FROM  comment WHERE comment_id = '" + id + "'"
    operateData(sql, function (result) {
        // console.log(result)
        let sql = "DELETE FROM  comment_reply WHERE commentId = '" + id + "'"
        operateData(sql, function (result) {
            let sql = "SELECT * FROM  comment"
            operateData(sql, function (result) {
                response.send({ statusCode: 200, commentList: result })
            })
        })
    })
})
module.exports = router;
