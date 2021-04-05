
//————————————连接数据库——————————
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'blog'
});
 
connection.connect((err)=>{
    if(err){
     console.log(err)
    }else{
      console.log("连接成功")
    }
    
});
module.exports = connection;