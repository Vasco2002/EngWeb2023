var axios = require('axios')

module.exports.list = () => {
    return axios.get("http://localhost:3000/tasks?_sort=deadline")
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getTask = id => {
    return axios.get('http://localhost:3000/task/' + id)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

module.exports.addTask = a => {
    return axios.post('http://localhost:3000/task', a)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

module.exports.updateTask = a => {
    return axios.put('http://localhost:3000/task/' + a.id, a)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

module.exports.deleteTask = id => {
    return axios.delete('http://localhost:3000/task/' + id)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}