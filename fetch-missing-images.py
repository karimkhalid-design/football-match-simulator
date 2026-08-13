import json
import re
from pathlib import Path
from urllib.parse import urlencode
from urllib.request import Request, urlopen

catalogue = Path('client/src/lib/auctionData.ts').read_text()
image_map = Path('client/src/lib/playerImageMap.ts').read_text()
players = sorted(set(re.findall(r'\["([^"]+)",\s*\d+,', catalogue)))
keys = set(re.findall(r'^\s*"([^"]+)":\s*"https://', image_map, re.MULTILINE))
missing = [name for name in players if name not in keys]
aliases = {'Ederson': 'Ederson (footballer, born 1993)', 'Luis Díaz': 'Luis Díaz (footballer, born 1997)', 'Marcelo': 'Marcelo (footballer, born 1988)', 'Nuno Mendes': 'Nuno Mendes (footballer, born 2002)', 'Xavi': 'Xavi Hernández'}
for name in missing:
    title = aliases.get(name, name)
    params = urlencode({'action': 'query', 'format': 'json', 'prop': 'pageimages', 'piprop': 'thumbnail', 'pithumbsize': '250', 'titles': title, 'redirects': '1'})
    request = Request('https://en.wikipedia.org/w/api.php?' + params, headers={'User-Agent': 'e3mal-elsah-image-audit/1.0'})
    with urlopen(request, timeout=20) as response:
        data = json.load(response)
    pages = data['query']['pages']
    page = next(iter(pages.values()))
    thumb = page.get('thumbnail', {}).get('source')
    print(json.dumps({'name': name, 'url': thumb}, ensure_ascii=False))
