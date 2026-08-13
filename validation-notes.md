# Validation notes

The live preview was manually exercised on 2026-08-12. A Real Madrid versus Manchester City simulation was launched successfully; the match view switched to live state, displayed the progressive clock, revealed a goal event separately in the timeline, and updated the running score. The completed match exposed its detailed summary screen with possession, shots, shots on target, total passes, pass accuracy, corners, complete event feed, and both starting XIs.

The simulated 3–3 result was also visible in the history API path after match completion. This validates the core progressive-event experience and post-match statistic requirements before final visual checks across the player database, builder, history, and mobile layouts.

The player database was then searched for “Ronaldo”; the UI correctly reduced the 121-player catalogue to the two matching retired player profiles, Ronaldo Nazário and Cristiano Ronaldo. The result cards retained status, position, age, and surfaced statistics, confirming the text-search filtering path.

Cristiano Ronaldo’s profile modal was opened successfully and showed summary statistics, performance attributes, and a career timeline. The “add to team builder” action then transitioned to the tactical formation view, which rendered the starting eleven on a marked pitch and preserved the searchable player-pool context. This validates the player-detail and manual-builder navigation path.

The match archive displayed the saved Real Madrid 3–3 Manchester City result with date and scoreline. Selecting the row returned to the match lab with the corresponding teams selected, confirming the persisted-history review flow.

During the first post-migration preview, the catalogue synchronization was observed to delay the initial page response while persistent player records were being created. The catalogue synchronization is therefore configured as non-blocking so the football interface remains responsive while the durable catalogue is refreshed.

After the non-blocking change, the match lab loaded immediately and the history screen again listed the persisted Real Madrid versus Manchester City fixture. This confirms that background catalogue synchronization does not block interactive use of the interface.

The archived fixture now opens a standalone summary sourced from the saved record, including the scoreline, possession, shots, passes, timeline, and starting XIs. Selecting Thibaut Courtois from that summary opened the dedicated player dossier page with profile statistics, attributes, and career timeline.

The direct URL `/players/real-madrid-thibaut-courtois` was tested from a fresh navigation and successfully loaded the player dossier after the standard catalogue initialization. The page presented the expanded five-stop career timeline and the complete player statistics without requiring a prior search or in-memory selection.
