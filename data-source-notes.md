# Football data source notes

The player catalogue is designed to scale from a curated in-product starter set to a broader import pipeline. The reviewed public source is [salimt/football-datasets](https://github.com/salimt/football-datasets), a Transfermarkt-derived datalake that reports coverage of more than 92,000 player profiles and player performance, market-value, transfer-history, injury-history, national-team, and teammate data. The source’s stated structure informs the application's `players`, `player_careers`, and future performance-history entities.

The discovered player-profile import path is `datalake/transfermarkt/player_profiles/player_profiles.csv`; companion directories exist for `player_performances` and `transfer_history`. The application model will retain corresponding fields so that an authorized, validated import can replace or augment the initial catalogue without a schema redesign.

The initial release will keep the deployed database responsive by seeding a curated, diverse catalogue of notable active and retired players, while preserving normalized data fields and import-ready relationships for a later full-scale data ingestion. Any larger import should validate the source license, provenance, freshness, and duplicate-handling policy before publication.
