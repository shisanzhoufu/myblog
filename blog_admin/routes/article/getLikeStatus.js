let db = require('../db.js')
let express = require('express');
let router = express.Router();

router.get('/', function(req, response, next) {
    let user_id = req.query.userid
    let blog_id = req.query.blogid
    let sql = "SELECT * FROM  blog_like WHERE user_id = '"+user_id+"' AND blog_id = '"+blog_id+"'"
    operateData(sql,function(result){
        let sta = {
            1:true,
            0:false
        }
        let status
        if(result[0]){
            status = sta[result[0].status]
        }else{
            status = null
        }
        
        response.send({statusCode:200,status:status}) 
    })
})
module.exports = router;
