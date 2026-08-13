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

The live auction screen was reviewed after the identity update. Budget cards, formation boards, player card, bidding actions, hidden-player card, and progress tracker now consistently use the gold, bronze, and black «اعمل الصح» palette.

The second live auction round was also reviewed after a fast-cycle check. The awarded player, hidden reveal, reduced budget, squad progression, and next player card retained the unified gold-and-black treatment.

The full eleven-round draft was then completed through the live interface using eligible bid and pass actions, reaching the final-results experience after the gold-and-black theme update.

The final auction round was explicitly settled with the only eligible bidder, confirming the transition to the completed-squad screen under the unified gold-and-black theme.

The completed-squad screen and the final match simulation were inspected at desktop size. Both now use the gold-and-black visual system consistently across result cards, roster values, scoreline, goal timeline, player-of-the-match marker, and statistics bars.

The final match was also exercised inside a 375px-wide mobile frame. The gold-and-black branded background remained active, the simulated result was visible, and the match report collapsed to a single-column layout.

The live auction was separately checked in a 375px-wide mobile frame. The auction stage, bid control, round tracker, and both squad boards were present with the gold border treatment, while the auction layout collapsed into a single column.

The landing page now opens with «لاعب رقم ١» and «لاعب رقم ٢». After entering the auction, the first live player card loaded a real football-player thumbnail (Petr Čech from Wikipedia), and the custom labels carried into the budget cards, bid controls, and squad headers.

The mobile auction flow is visible at 375px and the player image component falls back cleanly while a remote thumbnail is unavailable in the isolated mobile frame; desktop confirmed the live thumbnail loads successfully.

The deterministic image map was generated for 112 of 122 catalogue names. In the desktop auction preview, the first player card loaded Lev Yashin's real Wikipedia thumbnail successfully, while «لاعب رقم ١» and «لاعب رقم ٢» remained visible across the auction controls and squad headers.

The 375px mobile flow kept both default labels and the auction visible, but the external thumbnail was not complete within the isolated mobile test window. The component intentionally renders a branded football fallback until the static image completes; desktop network verification loaded the mapped image successfully.

A longer 7-second mobile check confirmed the auction remains visible and the selected football player name renders, but the isolated preview still did not complete the external thumbnail. The branded fallback remains intentional for slow or blocked image requests.

The actual desktop preview after switching to eager image loading shows Lev Yashin's mapped thumbnail in the live player card and preserves «لاعب رقم ١» and «لاعب رقم ٢» in all visible team controls.

The completed auction results screen was verified on desktop. Both final squad lists displayed mapped football-player thumbnails beside their names, including Lev Yashin, Carles Puyol, Thiago Silva, Roberto Carlos, Toni Kroos, Mohamed Salah, Eden Hazard, and Harry Kane.

The 375px mobile full-auction check reached the final results screen and rendered all 22 player-photo elements in the final squad lists. The isolated offscreen iframe reported zero completed external thumbnails because the network images are outside that iframe's viewport/cache, while the same mapped URLs rendered in the actual desktop preview; the branded fallback remains available for delayed requests.

After caching the thumbnails in project storage, the true 375px mobile full-auction check reached the final screen with 22 final-player-photo elements. It found 20 unique hosted image resources across the live card and final list, and all 20 loaded successfully with non-zero naturalWidth through same-origin Image objects. The previously flaky Wikimedia network dependency is no longer used by the app.

The mobile winner-reveal check at 375px now reports one grid column, two stacked reveal cards in increasing top order, 306px card width, 195px card height, and a 25px team-name heading. The winning player and hidden player details are separated into readable vertical cards instead of the previous cramped horizontal layout.

The duplicate regression was tested through the complete browser flow. After all 11 rounds, the final results contained 22 player photos, 22 unique player names, and no duplicates; the final match simulation then opened successfully.

Flexible-bid mobile validation passed at 375px: the +1/+5/+10 presets were present, selecting +5 set the increment to 5, and after the opening bid the opposing button displayed an actual “ارفع بـ 5M إلى 14M” raise.

Clearable bid-input validation passed at 375px: the input type is text with numeric mobile mode, clearing it produced an empty value, typing 6 retained “6”, and after the opening bid the opponent button displayed “ارفع بـ 6M إلى 13M”.

Total-price bidding validation passed at 375px: entering 20 before the first bid was accepted as exactly 20M and the price panel showed 20M. After entering 6M, the opponent button showed “ارفع إلى 6M” but the pure validation rules reject it because it is below the current 20M bid.

Game Hub verification: the new first page renders the «اعمل الصح» active card and the disabled «أفتكر» card with the uploaded Aftakar logo. Desktop and 375px mobile screenshots confirm readable card hierarchy, stacked mobile layout, and visible «قريباً/اللعبة غير متاحة حالياً» state for Aftakar. GameHub tests confirm the active card callback and Aftakar logo path; the existing auction bid-flow tests also pass.

Final hub verification after branding correction: the 375px mobile page shows «كوره كده» in the top identity/footer, the newly uploaded «اعمل الصح» logo in the hero and active card, and the disabled «أفتكر» card below it. Card hierarchy remains readable and stacked.
