const express = require('express')
const multer  = require('multer')
const fs=require('fs');
let path = require('path');
let router = express.Router();
//————————————连接数据库——————————
let db = require('./db.js')
//uploads
let upload=multer({dest:'uploads/'})

router.post('/', upload.single('file'), function(req, response) {
    //读取文件路径
    fs.readFile(req.file.path,(err,data)=>{
        console.log(req.file)
        //如果读取失败
    if(err){return response.send('上传失败')}
    //如果读取成功
    //声明图片名字为时间戳和随机数拼接成的，尽量确保唯一性
    let time=Date.now()+parseInt(Math.random()*999)+parseInt(Math.random()*2222);
    //拓展名
    let extname=req.file.mimetype.split('/')[1]
    //拼接成图片名
    let keepname=time+'.'+extname
    //三个参数
    //1.图片的绝对路径
    //2.写入的内容
    //3.回调函数
    fs.writeFile(path.join(__dirname,'../static/img/'+keepname),data,(err)=>{
        if(err){
            throw err
            return res.send('写入失败')
        }else{
            const ava = 'C:/wamp64/www/blog/blog_admin/static/img/'+keepname
            // ava = "require(\'"+ava+"\')"
            return response.send(ava)
        }   
    })
 })
})
module.exports = router;