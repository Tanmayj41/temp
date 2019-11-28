var express= require("express");
var router = express();
var mysql = require("mysql");
var config = require("config");
var connection = mysql.createConnection({
    host:config.get("host"),
    database:config.get("database"),
    user:config.get("user"),
    password:config.get("password")
})

router.get("/",(request,response)=>{
    var sql = "select * from emp";
    connection.query(sql,(err,result)=>{
        if(err==null)
        {
            response.send(JSON.stringify(result));
        }
        else
        {
            console.log(err);
            response.send(JSON.stringify(err));
        }
    })
})

router.use(express.json());

router.post("/",(request,response)=>{
    var sql = `insert into emp values(${request.body.No},'${request.body.Name}','${request.body.Address}')`;
    connection.query(sql,(err,result)=>{
        if(err==null)
        {
            response.send(JSON.stringify(result));
        }
        else
        {
            response.send(JSON.stringify(err));
        }
    })
})

router.get("/:No",(request,response)=>{
    var sql = `select * from emp where No = ${request.params.No}`;
    connection.query(sql,(err,result)=>{
        if(err==null)
        {
            response.send(JSON.stringify(result));
        }
        else
        {
            console.log(err);
            response.send(JSON.stringify(err));
        }
    })
})

router.put("/:No",(request,response)=>{
    var sql = `update emp set Name='${request.body.Name}',Address='${request.body.Address}' where No= ${request.params.No}`;
    connection.query(sql,(err,result)=>{
        if(err==null)
        {
            response.send(JSON.stringify(result));
        }
        else
        {
            response.send(JSON.stringify(err));
        }
    })
})

router.delete("/:No",(request,response)=>{
    var sql = `delete from emp where No= ${request.params.No}`;
    connection.query(sql,(err,result)=>{
        if(err==null)
        {
            response.send(JSON.stringify(result));
        }
        else
        {
            response.send(JSON.stringify(err));
        }
    })
})


module.exports = router;
