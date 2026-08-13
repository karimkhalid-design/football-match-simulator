# VAR real-incident research notes

## Official protocol findings

The IFAB VAR protocol states that VAR intervention is limited to a clear and obvious error or serious missed incident in goal/no-goal, penalty/no-penalty, direct red card, and mistaken identity situations. The on-field referee must always make a decision, the VAR can only recommend a review, and the final decision remains with the referee. The protocol also states that the review has no fixed time limit because accuracy is more important than speed.

Source: [IFAB Video Assistant Referee (VAR) protocol](https://www.theifab.com/laws/latest/video-assistant-referee-var-protocol/)

The Premier League VAR FAQ explains that the referee communicates what they saw, the VAR reviews multiple angles, real-time replay is used initially to judge intensity, and slow motion is used to identify the point of contact. It also confirms that VAR covers four match-changing categories and that the referee—not VAR—makes the final decision. It gives the Portugal–Switzerland 2019 Nations League semi-final as an example where a later review changed a penalty decision after another incident was examined.

Source: [Premier League Video Assistant Referees Explained](https://www.premierleague.com/en/var/faqs)

## Product implications

The game should store the original on-field decision separately from the final verified decision, keep both hidden during the discussion stage, show a staged replay/review before revealing them, and preserve source links per incident. Real match footage should not be downloaded or redistributed without permission; the first implementation should use licensed/official embeds or rights-cleared stills and a source/replay link. Unverified social clips should not be treated as authoritative evidence.

## Candidate real incident: Luis Díaz disallowed goal, Tottenham v Liverpool, 30 September 2023

Sky Sports reports that Luis Díaz was flagged offside after scoring, but replays showed he was onside. VAR Darren England mistakenly believed the on-field decision had been to award the goal and said the check was complete. The replay operator noticed the mistake and urged the officials to stop the game, but the officials concluded they could not intervene after play restarted. This is an especially strong game round because the visible decision was wrong, the VAR communication itself was documented, and the verified final assessment is that the goal was wrongly disallowed.

Source: [Sky Sports — VAR audio released from Liverpool's disallowed goal by Luis Diaz](https://www.skysports.com/football/news/11095/12975648/var-audio-released-from-liverpools-disallowed-goal-by-luis-diaz-in-defeat-at-spurs)

The source links to an official/released audio video page, but the app should embed or link to the rights-holder page rather than download or redistribute the clip.

## Additional real-case verification

- Sky Sports, “VAR: How it's supposed to work after weekend of controversy in the Premier League”: PGMOL acknowledged incorrect VAR-advised decisions involving Maxwel Cornet's disallowed West Ham equaliser at Chelsea, Newcastle's disallowed goal against Crystal Palace, and the Cristian Romero hair-pull on Marc Cucurella. URL: https://www.skysports.com/football/news/11095/12690596/var-how-its-supposed-to-work-after-weekend-of-controversy-in-the-premier-league
- Sky Sports, “David Moyes: West Ham manager brands late disallowed goal at Chelsea as a ridiculously bad call”: the match was Chelsea 2–1 West Ham; Maxwel Cornet scored the late equaliser, with Jarrod Bowen and Edouard Mendy involved in the disputed contact. URL: https://www.skysports.com/football/news/11095/12689120/david-moyes-west-ham-manager-brands-late-disallowed-goal-at-chelsea-as-a-ridiculously-bad-call
- BBC Sport, “Newcastle United 0-0 Crystal Palace: Hosts denied as goal ruled out by VAR”: Tyrick Mitchell scored an own goal that was later disallowed after Joe Willock was adjudged to have fouled the Palace goalkeeper. URL: https://www.bbc.com/sport/football/62697713
- Brighton & Hove Albion, “PGMOL statement on disallowed goal at Palace”: PGMOL stated the lines drawn to assess Pervis Estupiñán's offside position were incorrect and the goal should have stood. URL: https://www.brightonandhovealbion.com/media-article/PGMOL-statement-on-disallowed-goal-at-Palace
- Sky Sports, “Mike Dean admits he made wrong decision as VAR over Cristian Romero's hair pull on Marc Cucurella”: Mike Dean acknowledged the missed intervention in Chelsea v Tottenham. URL: https://www.skysports.com/football/news/11661/12676049/mike-dean-admits-he-made-wrong-decision-as-var-over-cristian-romeros-hair-pull-on-marc-cucurella-in-chelsea-vs-tottenham

## UI verification

On the VAR setup screen at the preview hash route, the page title is “VAR و لا لأ؟”, the tagline is now “اقرأ الحالة… خد قرارك”, and the screen shows the real-case text flow without an iframe or video control. The supplied VAR logo and mobile-first player setup remain visible.
