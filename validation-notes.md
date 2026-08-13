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

The AL MZAD auction interface was tested with the expanded 122-player catalogue. The first goalkeeper round surfaced Manuel Neuer from the catalogue, and Ali Mokhtar's opening 11M bid correctly updated the active-leader state while keeping the opposing 12M counterbid available.

After Hussein Ihab passed, the award action became available and correctly revealed Thibaut Courtois only at the settlement stage. Ali Mokhtar received Manuel Neuer for 11M with his budget updated to 89M, while Hussein Ihab received Courtois free of charge; both squad boards correctly recorded the goalkeeper assignment.

The live interface automatically advanced to round two after the reveal. The remaining rounds were then exercised through the same UI controls, including a budget-constrained switch of bidder, and the game reached the final-results screen with both eleven-player squads completed.

The final screen correctly listed both full squads, remaining budgets, auction-versus-hidden counts, and paid squad values. Selecting the match simulation then generated a final score, goal timeline with scorers and assists, man of the match, possession, shots, shots on target, and dangerous chances.

The reset action was tested from an active bid state. It restored round 01/11, cleared both squads to 0/11, returned each team budget to 100M, removed the active leader, and restored the opening bidding prompt.

The «اعمل الصح» landing page was verified with the supplied golden-and-black logo. The creator credit for كريم is present, and both team-name inputs accepted custom values before the auction begins.

Custom names «فريق كريم» and «نجوم القاهرة» were carried into the auction successfully. They appear in the team budgets, squad boards, bidding buttons, and pass actions without any remaining default-name labels.

The same custom-name journey was exercised in a 375px-wide mobile frame. Both values were accepted, the auction started successfully, and the names were present in the mobile auction interface.
