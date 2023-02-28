var http = require('http');
var fs = require('fs');
var url = require('url')

http.createServer(function(req, res) {
    var pedido = url.parse(req.url,true).pathname
    if(pedido === "/"){
        fs.readFile('index.html', (err, html) => {

            if(err){
                res.write("Erro na leitura do ficheiro: " + err)
            }else{
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(html);
            }
            res.end()
        })
    }
    else{
        var city = pedido.slice(1)
        console.log(city)

        fs.readFile("./cities/" + city +'.html', function(err, html) {
            res.writeHead(200, {'Content-Type': 'text/html; charset: utf8'})
            if(err){
                res.write("Erro na leitura do ficheiro " + err)
            }
            else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(html);
            }
            res.end();
        })
    }
}).listen(7777);

console.log("Servidor à escuta na porta 7777...");