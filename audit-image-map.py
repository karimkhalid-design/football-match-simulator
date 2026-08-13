import re
from pathlib import Path
catalogue = Path('client/src/lib/auctionData.ts').read_text()
image_map = Path('client/src/lib/playerImageMap.ts').read_text()
players = set(re.findall(r'\["([^"]+)",\s*\d+,', catalogue))
keys = set(re.findall(r'^\s*"([^"]+)":\s*"https://', image_map, re.MULTILINE))
missing = sorted(players - keys)
extra = sorted(keys - players)
print(f'catalogue={len(players)} mapped={len(players & keys)} missing={len(missing)}')
print('MISSING')
print('\n'.join(missing))
print('EXTRA')
print('\n'.join(extra))
