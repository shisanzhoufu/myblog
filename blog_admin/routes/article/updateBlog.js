let db = require('../db.js')
let express = require('express');
let router = express.Router();

router.post('/', function(req, response, next) {
    /**
     * 处理数据
     */
    let id = req.body.id
    let blog_title = req.body.title
    let blog_tag = req.body.tags
    blog_tag = blog_tag.join(',')
    let blog_class = req.body.class
    let blog_html = req.body.html
    let blog_md = req.body.md
    let blog_update_date = req.body.time
    let sql = "UPDATE blog SET  ? WHERE blog_id = '"+id+"'"
    let data = {blog_title:blog_title,blog_tag:blog_tag,blog_class:blog_class,blog_md:blog_md,blog_html:blog_html,blog_update_date:blog_update_date}
    insertData(sql,data,function(result){
        let sql = "SELECT * FROM  blog WHERE blog_title = '" + blog_title + "' AND blog_id = '" + id + "'"
        operateData(sql, function (result) {
            response.send({ statusCode: 200, result: result[0] })
        }) 
    })
})
module.exports = router;
