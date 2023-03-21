var express = require('express');
var router = express.Router();
var Task = require('../controllers/task')

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Task.list()
    .then(tasks => {
      var max = 0
      for(let i = 0; i < tasks.length; i++){
        if(parseInt(tasks[i].id) > max) max = parseInt(tasks[i].id)
      }
      max++
      res.render('index', { tasks: tasks, max: max, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da to do list"})
    })
});

/* GET Task Update page. */
router.get('/tasks/edit/:id', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Task.getTask(req.params.id)
    .then(task => {
      res.render('updateForm', { task: task, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo da tarefa"})
    })
});

router.post('/tasks/registo', function(req,res,next) {
  Task.addTask(req.body)
  .then(task =>{
    res.redirect('/');
  })
  .catch(erro =>{
    res.render('error', {error: erro, message: "Erro ao adicionar tarefa"})
  })
})

router.post('/tasks/edit/:id', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Task.updateTask(req.body)
    .then(task => {
      res.redirect('/')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na alteração do registo da taefa"})
    })
});

router.get('/tasks/done/:id', function(req,res,next) {
  Task.getTask(req.params.id).then(task =>{
    Task.checkTask(task).then(task => {
      res.redirect('/');
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro ao completar tarefa"})
    })
  })
  .catch(erro => {
    res.render('error', {error: erro, message: "Erro na obtenção da tarefa"})
  })
})

module.exports = router;
