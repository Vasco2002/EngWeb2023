import json

with open("dataset-extra1.json", "r", encoding= 'utf-8') as file:
    data = json.load(file)
    i = 0
    
    for d in data['pessoas']:
        d['id'] = "p" + str(i)
        i+=1
        
    
    with open("dataset-extra1.json", "w") as file:
        json.dump(data,file)
