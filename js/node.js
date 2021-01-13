var express = require("express")  //加载依赖包
var bodyParser = require("body-parser")
var app = express() //生成实例
var path = require("path")
var arr = [1,2,3] 

app.get("/",function(req,res){
    res.send("index")
})
app.get("/data/query",function(req,res){
    res.send(JSON.stringify(arr))
})
app.listen(3000,function(){
    console.log("123456456")
})