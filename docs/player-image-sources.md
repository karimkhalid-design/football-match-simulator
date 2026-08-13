# Player image sources

The image strategy for missing player photos uses Wikimedia/Wikipedia page thumbnails and direct media references rather than fabricated or random portraits.

- Wikimedia Commons association-football player category: https://commons.wikimedia.org/wiki/Category:Association_football_players
- MediaWiki REST API reference, including page search results with thumbnail URLs: https://www.mediawiki.org/wiki/API:REST_API/Reference
- Example player page with a lead image and structured football-player data: https://en.wikipedia.org/wiki/Lionel_Messi

The MediaWiki REST documentation describes the page-search response as including a thumbnail URL when a page has a lead image. Any automated image mapping should validate the player title and thumbnail before adding it to the project map; unresolved names must retain the initials fallback instead of receiving an unrelated image.
