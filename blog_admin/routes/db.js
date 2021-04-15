let express = require('express');
let router = express.Router();
//————————————连接数据库——————————
let mysql = require("./mysql.config.js");

/**
 * 插入数据
 * @field  表名  String
 * @insertData  插入的数据  Object
 */
//  mysql.query('INSERT INTO user_info SET  ?',{user:name,password:pwd,email:email,role:radio},function(err,data){
 module.exports = insertData = (sql,data,callback)=>{
    mysql.query(sql,data,function(err,res){
        if(err){
            console.log('数据插入失败');
            throw err;
        }
        callback && callback(res);
    })
}

/**
 * 通用操作
 * @field  表名  String
 * @condition  查询的字段名  String
 */

 module.exports = operateData = (sql,callback)=>{
    //  "SELECT * FROM  user_info WHERE user = '"+name+"'"
    mysql.query(sql,function(err,res){
        if(err){
            console.log('数据查询失败');
            throw err;
        }
        callback && callback(res);
    })   
}

/**
 * 删除数据
 * @field  表名  String
 * @condition  查询的字段名  String
 */

 module.exports = selectData = (sql,callback)=>{
    mysql.query(sql,function(err,res){
        if(err){
            console.log('数据查询失败');
            throw err;
        }
        callback && callback(res);
    })
    
}
