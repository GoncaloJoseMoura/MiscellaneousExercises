const express = require('express');
const path = require('path');
const app = express();

app.get('*', (req, res) => {
  const filename = req.path === '/' ? 'index.html' : req.path + '.html';
  res.sendFile(path.join(__dirname, filename), (err) => {
    if (err) {
      res.status(404).sendFile(path.join(__dirname, '404.html'));
    }
  });
}).listen(8080);

// CREATING A SERVER WITH JUST NODEJS
// var http = require('http');
// var fs = require('fs')
// var url = require('url');

// http.createServer(function (req, res) {
//     let parsed_url = url.parse(req.url, true);
//     var filename = parsed_url.pathname == '/' ? "./index.html" :  "." + parsed_url.pathname + '.html';
//     console.log('filename', filename)
//     try {
//         const data = fs.readFileSync(filename);
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.write(data)
//         return res.end();
//       } catch (err) {
//         const errofile = fs.readFileSync('./404.html');
//         res.writeHead(404, {'Content-Type': 'text/html'});
//         res.write(errofile)
//         return res.end();
//       }
// }).listen(8080);

// OR

// http.createServer(function (req, res) {
//     let parsed_url = url.parse(req.url, true);
//     var filename = parsed_url.pathname == '/' ? "./index.html" :  "." + parsed_url.pathname + '.html';
//     console.log('filename', filename)
//     fs.readFile(filename, (err, data) => {
//         if (err) {
//             fs.readFile('./404.html', (err, data) => {
//               if (err) {
//                 console.error('Error reading 404.html:', err);
//                 return res.end();
//               } else {
//                 res.writeHead(404, {'Content-Type': 'text/html'});
//                 res.write(data);
//                 return res.end();
//               }
//             });
//         } else {
//             res.writeHead(200, {'Content-Type': 'text/html'});
//             res.write(data)
//             return res.end();
//         }
//     })
// }).listen(8080);