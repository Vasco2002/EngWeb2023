var express = require('express');
var router = express.Router();
var Exame = require('../controllers/exame')

router.get('/api/emd', function(req, res, next) {
  if (req.query.res === 'OK') {
    Exame.trueList()
      .then(data => res.json(data))
      .catch(erro => res.json(erro));
  } else if (req.query.modalidade) {
    Exame.getModalityList(req.query.modalidade)
      .then(data => res.json(data))
      .catch(erro => res.json(erro));
  } else {
    Exame.list()
      .then(data => res.json(data))
      .catch(erro => res.json(erro));
  }
});

router.get('/api/emd/:id', function(req, res, next) {
  Exame.getExame(req.params.id)
    .then(data => res.json(data))
    .catch(erro => res.json(erro))
});

router.get('/api/modalidades', function(req, res, next) {
  Exame.modalityList()
    .then(data => res.json(data))
    .catch(erro => res.json(erro))
});

router.get('/api/atletas', function(req, res, next) {
  if (req.query.gen === 'F'){
    Exame.feminineList()
      .then(data => res.json(data))
      .catch(erro => res.json(erro))
  } else if (req.query.clube){
    Exame.clubList(req.query.modalidade)
    .then(data => res.json(data))
    .catch(erro => res.json(erro))
  }
});

module.exports = router;
