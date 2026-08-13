import re
import time
from pathlib import Path
from urllib.error import HTTPError
from urllib.request import Request, urlopen

source = Path('client/src/lib/playerImageMap.ts').read_text()
entries = re.findall(r'^\s*"([^"]+)":\s*"(https://[^"]+)"', source, re.MULTILINE)
out = Path('/home/ubuntu/webdev-static-assets/e3mal-elsah-player-images')
out.mkdir(parents=True, exist_ok=True)
for name, url in entries:
    safe = re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')
    path = out / f'{safe}.jpg'
    if path.exists() and path.stat().st_size > 1000:
        continue
    data = None
    for attempt in range(6):
        try:
            request = Request(url, headers={'User-Agent': 'e3mal-elsah-player-cache/1.0 (contact: project-cache)'})
            with urlopen(request, timeout=30) as response:
                data = response.read()
            break
        except HTTPError as error:
            if error.code != 429 or attempt == 5:
                raise
            time.sleep(4 + attempt * 2)
    if data is None or len(data) < 1000:
        raise RuntimeError(f'Image too small for {name}: {len(data or b"")} bytes')
    path.write_bytes(data)
    time.sleep(0.8)
    print(f'{name}\t{path}\t{len(data)}')
print(f'cached={len(list(out.glob("*.jpg")))} expected={len(entries)}')
