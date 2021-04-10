// var createError = require('http-errors');
const express = require('express')
const session = require('express-session')
const bodyParser=require('body-parser')
const path = require('path')

const upRouter = require('./routes/login/sign-up')
const inRouter = require('./routes/login/sign-in')
let uploadRouter = require('./routes/upload')
const app = express();

//session配置
app.use(session({
    secret: 'billy',
    resave: false,
    saveUninitialized: false,
}))

//跨域
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  next()
})
// 2配置
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// 配置静态资源目录 整一个文件夹 通过域名能访问
app.use(express.static(path.join(__dirname,"../static")))


//注册apiin
app.use('/api/sign-up', upRouter)
//注册api
app.use('/api/sign-in', inRouter)
//图片上传
app.use('/api/upload',uploadRouter)

app.listen(3001,function(){
  console.log('app is runing at port 3001')
})

module.exports = app
