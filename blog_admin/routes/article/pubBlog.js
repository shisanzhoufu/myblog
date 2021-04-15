let db = require('../db.js')
let express = require('express');
let router = express.Router();

router.get('/', function(req, response, next) {
    /**
     * 处理数据
     */
    let blog_title = req.query.title
    let blog_tag = req.query.tags
    blog_tag = blog_tag.join(',')
    let blog_class = req.query.class
    let blog_html = req.query.html
    let blog_md = req.query.md
    let blog_create_date = req.query.time
    let sql = 'INSERT INTO blog SET  ?'
    let data = {blog_title:blog_title,blog_tag:blog_tag,blog_class:blog_class,blog_md:blog_md,blog_html:blog_html,blog_create_date:blog_create_date}
    insertData(sql,data,function(result){
        response.send({statusCode:200,msg:'发布成功~'}) 
    })
})
module.exports = router;
