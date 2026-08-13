import re
from pathlib import Path

map_path = Path('client/src/lib/playerImageMap.ts')
log_path = Path('/tmp/upload-player-images.log')
text = map_path.read_text()
uploads = {}
for line in log_path.read_text().splitlines():
    match = re.search(r'/e3mal-elsah-player-images/([^/]+)\.jpg -> (/[\w/-]+\.jpg)', line)
    if match:
        uploads[match.group(1)] = match.group(2)

updated = 0
def replacement(match: re.Match[str]) -> str:
    global updated
    name = match.group(1)
    safe = re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')
    path = uploads.get(safe)
    if not path:
        raise RuntimeError(f'Missing hosted upload for {name} ({safe})')
    updated += 1
    return f'  "{name}": "{path}"'

result = re.sub(r'^\s*"([^"]+)":\s*"https://[^\"]+"', replacement, text, flags=re.MULTILINE)
map_path.write_text(result)
print(f'updated={updated} uploads={len(uploads)}')
