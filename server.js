const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 6969;
fs.readFile('index.html', (err, html) => {
  if(err){
    throw err;
  }
  const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'html');
    res.write(html);
    res.end('');
  });
  const wss = new WebSocket.Server({ server })

  wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(data) {
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      })
    })
  });

  server.listen(port, hostname, () => {
    console.log("Сервер запущен на порту:  " + port);
  });

})



