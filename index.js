var express = require('express');
var http = require('http');
var WebSocketServer = require('ws').Server

var app=express()
var response;

app.get('/',(req,res)=>{
  res.writeHead(200, {'Content-Type': 'audio/mpeg','Cache-Control': 'no-cache','Content-Length':Buffer.byteLength('ok','utf8')})
  res.write('ok')
  response=res
  response.on('drain',()=>{console.log('draaaaaaaaaaaaaaaaaaaaaiiiiiin!!!!!')})
})


var server = http.createServer(app)
server.listen(process.env.PORT || 5000)

var ws = new WebSocketServer({server:server})

ws.on('connection',(conn)=>{
  conn.on('message',(data)=>{
    if(response!=undefined)
      var r = response.write(data)
      if(!r)
        console.log('couldn\'t write');
  })
})
