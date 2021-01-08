const http=require('http');
const express= require('express');
const app = express();
const server= http.createServer(app);
const cors = require('cors');
const session = require("express-session");
const bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
let projectData={};
let getAllData=(req,res,next)=>{
    res.send(projectData);
}
postInitData=(req,res,next)=>{
    projectData= req.body;
    console.log(projectData)

    res.end();
    
    }
    
//end of declrtion
app.use(session({secret:'hihiCaptin',resave:false,saveUninitialized:false}))
app.use(express.static('./public'));
app.get('/getData',getAllData);
app.post('/allData',postInitData);

//listenn to the server on port 4000
console.log(`server listen in 4000`);

server.listen(3000);
