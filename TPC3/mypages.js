// mypages.js
// 2023-03-03 by jcr
// HTML templates generating functions

exports.genMainPage = function(lista, data){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>About People...</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>Lista de Pessoas</h1>
                </header>
        
                <div class="w3-container">
                    <table class="w3-table-all">
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Sexo</th>
                        <th>Cidade</th>
                    </tr>
                `
    for(let i=0; i < lista.length; i++){
        pagHTML += `
        <tr>
            <td>${lista[i].id}</td>
            <td>
                <a href="/pessoas/${lista[i].id}">${lista[i].nome}</a>
            </td>
            <td>${lista[i].idade}</td>
            <td>${lista[i].sexo}</td>
            <td>${lista[i].morada.cidade}</td>
        </tr>
        `
    }

    pagHTML += `
                    </table>
                </div>
                <footer class="w3-container w3-purple">
                    <h5>Generated in EngWeb2023 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

exports.genPersonPage = function(p, d){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Person Page</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>${p.nome}</h1>
                </header>

                <div class="container">
                    <p><b>Idade:</b> ${p.idade}</p>
                    <p><b>Sexo:</b> ${p.sexo}</p>
                    <p><b>Morada:</b> ${p.morada}</p>
                    <p><b>BI:<b/> ${p.BI}</p>
                    <p><b>Profissão:</b> ${p.profissao}</p>
                    <p><b>Partido Político:</b></p>
                    <p><ul class="w3-ul">
                        `
                    for(let i = 0; i < p.partido_politico.length; i++){
                        pagHTML += `<li><p>${p.partido_politico[i]};</p></li>`
                    }
                    
                    pagHTML +=   `
                    </ul>
                    <p><b>Religião:</b> ${p.religiao}</p>
                    <p><b>Desportos:</b> ${p.idade}</p>
                    <p><b>Animais:</b> ${p.idade}</p>
                    <p><b>Figura Pública Portuguesa:</b> ${p.figura_publica_pt}</p>
                    <p><b>Marca do Carro:</b> ${p.marca_carro}</p>
                    <p><b>Destinos Favoritos:</b> ${p.idade}</p>
                    <p><b>Atributos:</b> ${p.idade}</p>
                </div>
                
                <footer class="w3-container w3-purple">
                    <h5>Generated in EngWeb2023 ${d}</h5>
                </footer>
            </div>
        </body>
    </html>
                `
    return pagHTML
}

exports.distsexo = function(p, d){
    const map = new Map();

    map.set('masculino', 0);
    map.set('feminino', 0);
    map.set('outro', 0);

    p.forEach((person) =>{
        map.set(person.sexo, map.get(person.sexo) + 1)
    })

    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>About People...</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-amber w3-text-brown">
                    <h1>Distribuição por sexo</h1>
                </header>


                <div class="w3-container w3-text-brown">
                    <table class="w3-table-all w3-xlarge">
                    <tr>
                        <th>Masculino</th>
                        <th>Feminino</th>
                        <th>Outro</th>
                    </tr>
                    <tr>
                        <td>${Math.round(map.get('masculino')/p.length * 100)} %</td>
                        <td>${Math.round(map.get('feminino')/p.length * 100)} %</td>
                        <td>${Math.round(map.get('outro')/p.length * 100)} %</td>
                    </tr>
                    </table>
                <div>
                <footer class="w3-container w3-yellow w3-center w3-text-brown">
                    <h4><a href="http://localhost:7777/">Voltar ao Menu</a><h4>
                </footer>
                <div>
            </div>
        </body>
    </html>
                `
    return pagHTML
}

exports.distdesporto = function(p, d){
    const map = new Map();
 
    p.forEach((person) => {
        let desportos = person.desportos
        desportos.forEach((d) => {
            if(!map.has(d)){
                map.set(d, 0)
            }
            map.set(d,map.get(d) + 1)
        })
    })

    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>About People...</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-red">
                    <h1>Distribuição por desporto</h1>
                </header>


                <div class="w3-container">
                    <table class="w3-table-all w3-hoverable w3-large">
                    `
    for (let [key, value] of map) {
                        pagHTML += `
        <tr>
            <th>${key}</th>
            <td>${Math.round(value/p.length * 100)}%</td>
        </tr>
        `
    }
    pagHTML += `
                </table>
                <div>
                <footer class="w3-container w3-red w3-center">
                    <h4><a href="http://localhost:7777/">Voltar ao Menu</a><h4>
                </footer>
                <div>
            </div>
        </body>
    </html>
                `
    return pagHTML
}

exports.profissao = function(p, d){
    const map = new Map();
 
    p.forEach((person) => {
        if(!map.has(person.profissao)){
            map.set(person.profissao, 0)
        }
        map.set(person.profissao,map.get(person.profissao) + 1)
    })

    let sortedMap = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));

    const top10 = Array.from(sortedMap).slice(0,10)

    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>About People...</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-teal">
                    <h1>Top 10 de profissões</h1>
                </header>


                <div class="w3-container">
                    <table class="w3-table-all w3-hoverable">
                    `
    for (let i = 0 ; i < top10.length ; i++) {
        pagHTML+= `<tr>
        <th>${i}º</th>
        <td>${top10[i][0]}</td>
        <td><b>Entradas:</b> ${top10[i][1]}</td>
        </tr>`
    };
    pagHTML += `
                </table>
                <div>
                <footer class="w3-container w3-teal w3-center">
                    <h4><a href="http://localhost:7777/">Voltar ao Menu</a><h4>
                </footer>
                <div>
            </div>
        </body>
    </html>
                `
    return pagHTML
}