// var createError = require('http-errors');
let express = require('express');
let session = require('express-session')
const bodyParser=require('body-parser')
let upRouter = require('./routes/login/sign-up');
let inRouter = require('./routes/login/sign-in');

let app = express();

//session配置
app.use(session({
    secret: 'billy',
    resave: false,
    saveUninitialized: false,
}));

//跨域
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  next();
});
// 2配置
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//注册apiin
app.use('/api/sign-up', upRouter);
//注册api
app.use('/api/sign-in', inRouter);
app.listen(3001,function(){
  console.log('app is runing at port 3001');
})

module.exports = app;
