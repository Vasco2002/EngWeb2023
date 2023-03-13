// server.js

var http = require('http')
var axios = require('axios')
var templates = require('./templates')
var static = require('./static.js')
const { parse } = require('querystring');

// Aux functions

function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation

var tasksServer = http.createServer(async function (req, res) {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 10)
    console.log(req.method + " " + req.url)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET /tasks --------------------------------------------------------------------
                if((req.url == "/") || (req.url == "/tasks")){
                    axios.get("http://localhost:3000/tasks?_sort=dueDate")
                        .then(async response => {
                            var tasks = response.data

                            var max = 0
                            for(let i = 0; i < tasks.length; i++){
                                if(parseInt(tasks[i].id) > max) max = parseInt(tasks[i].id)
                            }
                            max++

                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.tasksPage(tasks,max,d))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de tarefas... Erro: " + erro)
                            res.end()
                        })
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write("<p>" + req.method + " " + req.url + " unsupported on this server.</p>")
                    res.end()
                }
                break

                case "POST":
                    if(req.url == "/tasks/registo"){

                        collectRequestBodyData(req, result => {
                            if(result){
                                axios.post('http://localhost:3000/tasks', {
                                    "id": result.id,
                                    "what": result.what,
                                    "who": result.who,
                                    "dueDate": result.dueDate,
                                }).then(resp => {
                                        console.log(resp.data);
                                        res.writeHead(302, {'Location': '/tasks'});
                                        res.end()
                                })
                                .catch(error => {
                                    console.log(result.what)
                                    console.log('Erro: ' + error);
                                    res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write("<p>Unable to update task record..</p>")
                                    res.end()
                                }) 
                            }
                        })
                        
                    }
                    else{
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write('<p>Unsupported POST request: ' + req.url + '</p>')
                        res.write('<p><a href="/">Return</a></p>')
                        res.end()
                    }
                    break

            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " unsupported in this server.</p>")
                res.end()
        }
    }
    
})

tasksServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})



