// var createError = require('http-errors');
let express = require('express');
let session = require('express-session')
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


//注册apiin
app.use('/api/sign-up', upRouter);
//注册api
app.use('/api/sign-in', inRouter);
app.listen(3001,function(){
  console.log('app is runing at port 3001');
})

module.exports = app;
