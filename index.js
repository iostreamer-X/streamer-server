var express = require('express');
var http = require('http');
var WebSocketServer = require('ws').Server

var app=express()
var listeners = []

app.get('/',(req,res)=>{
  res.writeHead(200, {'Content-Type': 'audio/mpeg','Cache-Control': 'no-cache'})
  listeners.push(res)
  res.on('close',()=>{
    var index = listeners.indexOf(res)
    listeners.splice(index,1)
  })
})


var server = http.createServer(app)
server.listen(process.env.PORT || 5000)

var ws = new WebSocketServer({server:server})

ws.on('connection',(conn)=>{
  conn.on('message',(data)=>{
    for(var listener of listeners){
      listener.write(data)
    }
  })
})
