// var createError = require('http-errors');
const express = require('express')
const session = require('express-session')
const bodyParser=require('body-parser')
const path = require('path')
const app = express();
// const vertoken=require('./token/token')
// const expressJwt=require('express-jwt')
/**
 * 路由引入
 */
const upRouter = require('./routes/login/sign-up')
const inRouter = require('./routes/login/sign-in')
const uploadRouter = require('./routes/upload')
const commentRouter = require('./routes/comment/comment')
const getcommentRouter = require('./routes/comment/getCommentList')
const replyCommentRouter = require('./routes/comment/replyComment')
const replyListRouter = require('./routes/comment/getReplyList')
const pubBlogRouter = require('./routes/article/pubBlog')
const getBlogRouter = require('./routes/article/getBlogList')
const getSearchRouter = require('./routes/article/getSearchList')
const changeUserInfoRouter = require('./routes/user/changeUserInfo')
const setLikeRouter = require('./routes/article/setLikeStatus')
const getLikeRouter = require('./routes/article/getLikeStatus')
const getLookRouter = require('./routes/article/setLookStatus')
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
//添加留言
app.use('/api/comment',commentRouter)
//获取留言
app.use('/api/commentList',getcommentRouter)
//回复留言
app.use('/api/replyComment',replyCommentRouter)
//留言回复列表
app.use('/api/getReplyList',replyListRouter)
//发布文章
app.use('/api/pubBlog',pubBlogRouter)
//留言文章列表
app.use('/api/getBlogList',getBlogRouter)
//搜索结果
app.use('/api/getSearchList',getSearchRouter)
//修改用户信息
app.use('/api/changeUserInfo',changeUserInfoRouter)
//设置点赞状态
app.use('/api/setLikeStatus',setLikeRouter)
//获取点赞状态
app.use('/api/getLikeStatus',getLikeRouter)
//点击量
app.use('/api/setLookStatus',getLookRouter)

app.listen(3001,function(){
  console.log('app is runing at port 3001')
})

module.exports = app
