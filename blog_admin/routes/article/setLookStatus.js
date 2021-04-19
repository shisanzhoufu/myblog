let db = require('../db.js')
let express = require('express');
let router = express.Router();

router.get('/', function (req, response, next) {
    /**
     * 处理数据
     */
    let blog_id = req.query.blogid
    let look
    let sql = "SELECT * FROM  blog WHERE blog_id = '" + blog_id + "'"
    operateData(sql, function (result) {
        look = result[0].blog_look+1
        let sql = "UPDATE blog SET  ? WHERE blog_id = '" + blog_id + "'"

        let data = { blog_look: look }
        console.log(look)
        insertData(sql, data, function (result) {
            response.send({ statusCode: 200, msg: '点赞成功~' })
        })
    })

})
module.exports = router;
