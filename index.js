var express = require('express');
var http = require('http');
var WebSocketServer = require('ws').Server

var app=express()

var server = http.createServer(app)
server.listen(process.env.PORT || 5000)

var ws = new WebSocketServer({server:server})

ws.on('connection',(conn)=>{
  console.log('Connection established');
  conn.send('io')
})
