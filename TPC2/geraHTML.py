import json

def sort_cities(city):
    return city.get("nome")

with open("mapa.json", "r", encoding="UTF-8") as data:
    map = json.load(data)

cities = map["cidades"]
cities.sort(key=sort_cities)
connections = map['ligações']

cityD = {}
districtD = {}
for city in cities:
    cityD[city['id']] = city

connectionD = {}
for cid in cityD.keys():
    connectionD[cid] = []
    for connection in connections:
        if connection['origem'] == cid:
            connectionD[cid].append(connection['destino'])

pagHTML = """
<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="UTF-8"/>
    </head>
    <body>
        <div class="card">
        <h1>Mapa Virtual</h1>
            <!--Índice-->
            <ol>
             
"""
for city in cities:
    #tirando o char '#' e usando o server.js as páginas separadas das cidades conectam-se aos links no index.html
    pagHTML += f"<li><a href='#{city['id']}'>{city['nome']}</a></li>"

pagHTML += """
</ol>
</div>
</body>
</html>"""

for city in cities:
    template = f"""

        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>{city['nome']}</title>
        </head>

        <body>

            <h1>{city['nome']}</h1>
    
            <a name="{city['id']}"></a>
            <h3>{city["nome"]}</h3>

            <p><b>Distrito:</b> {city["distrito"]}</p>
            <p><b>População:</b> {city["população"]}</p>
            <p><b>Descrição:</b> {city["descrição"]}</p>
                        
            <center>
                <hr width="80%"/>
            </center>

        </body>

    </html>
    """
    pagHTML += template
    file = open("./cities/"+city['id']+".html", "w")
    file.write(template)
    file.close()

file = open("index.html", "w")
file.write(pagHTML)
file.close()