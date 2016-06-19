var express = require('express');
var fs = require('fs');

var app = express()

app.get('/',(req,res)=>{
  fs.createReadStream("test.txt")
    .pipe(res)
})

app.listen(process.env.PORT || 5000,()=>{
  fs.writeFile("test.txt","successful!",(e)=>{})
})
