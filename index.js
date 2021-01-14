var express = require("express");
var app = express();
const fs = require('fs');
const path = require('path');
app.listen(3000, () => {
 console.log("Server running on port 3000");
});
const array = [];

const traverseDir = async (dir,name) => {
         fs.readdirSync(dir).forEach(file => {
            let fullPath = path.join(dir, file);
            if (fs.lstatSync(fullPath).isDirectory()) {
              //  console.log(fullPath);
               traverseDir(fullPath,name);
             } else {
              //  console.log("fullPath",fullPath)
            fs.readFile(fullPath,async function (err, data) {
                
                // fs.readFile(fullPath[0], (err,data) => {
                if (err){
                    throw err;
                }
                if(data.indexOf(name) >= 0){
                    console.log(fullPath)
                  
                 array.push(fullPath);
                //   callback(null,array);
                //   res.json(array);
                }
              });
             }  
          });
      
  }
// traverseDir(__dirname+ '/SampleDir',"ToDo")
 app.get("/getOutput", async(req, res, next) => {
    console.log("req",req.query)
    const search = req.query.search;
  traverseDir(__dirname+ '/SampleDir',search);
    // res.json(["Tony","Lisa","Michael","Ginger","Food"]);
   });