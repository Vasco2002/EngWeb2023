var Exame = require('../models/exame')

module.exports.list = () => {
    return Exame
        .find({}, {_id: 1, nome: 1, data: 1, resultado: 1})
        .then(dados => {
            return dados
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getExame = id => {
    return Exame.findOne({_id: id})
        .then(dados => {
            return dados
        })
        .catch(erro => {
            return erro
        })
}

module.exports.modalityList = () => {
    return Exame
        .distinct("modalidade")
        .then(dados => {
            return dados
        })
        .catch(erro => {
            return erro
        })
}

module.exports.trueList = () => {
    return Exame
        .find({resultado : true})
        .then(dados => {
            return dados
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getModalityList = m => {
    return Exame
        .find({modalidade : m})
        .then(dados => {
            return dados
        })
        .catch(erro => {
            return erro
        })
}

module.exports.feminineList = () => {
    return Exame
        .find({género : "F"}, {nome: 1, _id: 0})
        .sort({"nome.primeiro" : 1, "nome.segundo" : 1})
        .then(dados => {
            return dados
        })
        .catch(erro => {
            return erro
        })
}

module.exports.clubList = c => {
    return Exame
        .find({club : c}, {nome: 1, _id: 0})
        .sort({"nome.primeiro" : 1, "nome.segundo" : 1})
        .then(dados => {
            return dados
        })
        .catch(erro => {
            return erro
        })
}
