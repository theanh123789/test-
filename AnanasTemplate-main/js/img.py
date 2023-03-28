import json
from requests import get


def download(url, filename):
    with open(filename, "wb") as file:
        response = get(url)
        file.write(response.content);

f = open('./shoesdata.json', 'r', encoding='utf8')
data = json.load(f)

for item in data:
    download(item["src"], item["src"][item["src"].rindex("/")+1:]);
