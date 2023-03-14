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
                    axios.get("http://localhost:3000/tasks?_sort=deadline")
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
                // GET /tasks/edit/id --------------------------------------------------------------------
                else if(/\/tasks\/edit\/[0-9]+$/i.test(req.url)){
                    var idTask = req.url.split("/")[3]
                    axios.get("http://localhost:3000/tasks/" + idTask)
                        .then( async response => {
                            let task = response.data
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end(templates.taskFormEditPage(task, d)) 
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(`<p>Não foi possível buscar a tarefa ${idTask}... Erro: ${erro}`)
                            res.end()
                        })
                    
                }
                // GET /tasks/done/id --------------------------------------------------------------------
                else if(/\/tasks\/done\/[0-9]+$/i.test(req.url)){
                    var idTask = req.url.split("/")[3]
                    axios.get("http://localhost:3000/tasks/" + idTask)
                        .then( response => {
                            let a = response.data
                            axios.put("http://localhost:3000/tasks/" + idTask, {
                                "id": a.id,
                                "what": a.what,
                                "who": a.who,
                                "deadline": a.deadline,
                                "done": 1,
                            }).then(resp => {
                                console.log(resp.data)
                                res.writeHead(302, {'Content-Type': 'text/html;charset=utf-8', 'Location': '/tasks'});
                                res.end()
                                
                            }).catch(error => {
                                console.log('Erro: ' + error);
                                res.end()
                            })

                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(`<p>Não foi possível obter o registo da tarefa ${idTask}... Erro: ${erro}`)
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
                                    "deadline": result.deadline,
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
                    else if(/\/tasks\/edit\/[0-9]+$/i.test(req.url)){
                        var idTask = req.url.split("/")[3]
                        collectRequestBodyData(req, result => {
                            if(result){
                                
                                axios.put('http://localhost:3000/tasks/' + idTask, result)
                                .then(resp => {
                                        console.log(resp.data);
                                        res.writeHead(302, {'Content-Type': 'text/html;charset=utf-8','Location': '/tasks'});
                                        res.end()
                                })
                                .catch(error => {
                                    console.log('Erro: ' + error);
                                    console.log(result)
                                    console.log(result.id)
                                    res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write("<p>Unable to update task record..</p>")
                                    res.end()
                                }) 
                            }
                            else{
                                res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write("<p>Unable to collect data from body...</p>")
                                res.end()
                            }
                        });
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



