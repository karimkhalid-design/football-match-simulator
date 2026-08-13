# Project TODO

- [x] Review the supplied HTML, CSS, and JavaScript reference files and translate the relevant interaction patterns into the new application.
- [x] Define a scalable football data model for players, teams, careers, simulated matches, match events, statistics, and custom lineups.
- [x] Create and apply database schema migrations for player records, career history, teams, matches, and match events.
- [x] Add a substantial starter player catalogue containing active and retired footballers with biographical and playing statistics.
- [x] Build an elegant Arabic-first, responsive visual system with premium typography, navigation, loading states, and accessible controls.
- [x] Build the home match setup interface with two team selectors and quick match actions.
- [x] Implement progressive live match simulation with goals, cards, substitutions, match clock, and score updates.
- [x] Build the manual team builder with searchable player selection and formation-aware lineup controls.
- [x] Build the player database with search and filters for name, nationality, position, club, and career status.
- [x] Build player profile pages with detailed statistics and full career history.
- [x] Build post-match summary screens with possession, shots, passes, scoreline, and event timeline.
- [x] Persist and display full match history with links to match summaries.
- [x] Add server and client unit tests for core simulation, filtering, and data transformations.
- [x] Verify responsive layouts, live interactions, and error-free browser rendering before delivery.
- [x] Add persistent team records to the database schema and expose them through the football data layer.
- [x] Add a dedicated player-detail route with imported career entries rather than a generated summary only.
- [x] Add a saved match-summary loader so every archive record opens its own persisted score, statistics, and event timeline.
- [x] Serve team records from the persistent teams table through the football data procedure after synchronization.
- [x] Support direct player dossier URLs and routing from the database, builder, and summary screens.
- [x] Complete the in-product career archive coverage for every player profile in the starter catalogue.
- [x] Replace the current football simulator interface with the AL MZAD two-team auction game experience.
- [x] Add editable in-browser auction round data for eleven positions, bid players, hidden players, starting prices, and ratings.
- [x] Implement budget-safe bidding, per-round pass rules, automatic eligibility restrictions, winner assignment, and hidden-player reveal for the losing team.
- [x] Render live 4-3-3 squad boards, spend totals, remaining budgets, round progress, and a short award/reveal transition without page reloads.
- [x] Add an end-of-auction results view with squad values, purchased-versus-hidden counts, and a match simulation based on the drafted teams.
- [x] Test the complete eleven-round auction lifecycle, reset behavior, and responsive design on desktop and mobile.
- [x] Add a broad editable player catalogue with varied current players and legends across every required position, rating tier, and starting-price band.
- [x] Test reset-game behavior from an in-progress auction and verify every visible game state returns to its initial values.
- [x] Apply the supplied «اعمل الصح» logo as the primary game identity and rename the product throughout the interface.
- [x] Build a premium golden-and-black landing page that introduces the football auction concept and its main rules.
- [x] Add editable team-name fields before starting the auction and carry the chosen names through all game screens.
- [x] Add a clear call to action from the landing page into the live auction experience and preserve the existing game flow.
- [x] Verify the new branding, landing page, and editable team names on desktop and mobile before delivery.
- [x] Add a prominent «صناعة كريم» creator credit to the «اعمل الصح» landing experience.
- [x] Replace default names in auction action labels with the user-entered team names.
- [x] Apply the supplied «اعمل الصح» logo as the primary game identity and rename the product throughout the interface.
- [x] Build a premium golden-and-black landing page that introduces the football auction concept and its main rules.
- [x] Add a clear call to action from the landing page into the live auction experience and preserve the existing game flow.
- [x] Verify the new branding and landing page on desktop and mobile before delivery.
- [x] Verify custom team-name entry and auction start from the mobile layout end-to-end.
- [x] Replace the lime and cyan accents in auction, squad, reveal, and match-result screens with the «اعمل الصح» gold-and-black visual system.
- [x] Verify the unified gold-and-black theme on live auction and final match screens at desktop and mobile breakpoints.
- [x] Verify the gold-and-black styling on the final results and final match screens at desktop size.
- [x] Verify the gold-and-black styling on the live auction and final match screens at a mobile breakpoint.
- [x] Verify the gold-and-black styling of auction cards, controls, squad boards, and progress UI at a mobile breakpoint.

- [x] Add real football-player images to player cards and squad rows, mapped to the auction catalogue.
- [x] Change landing-page team-name defaults to «لاعب رقم ١» and «لاعب رقم ٢» while preserving custom editing.
- [x] Verify player images load correctly in the auction and final squad views on desktop and mobile.

- [x] Add a deterministic validated image URL mapping for the auction catalogue instead of relying only on best-effort title lookup.
- [x] Verify player photos render in the final squad/results view after a completed auction on desktop.
- [x] Verify player photos render successfully in the live auction and final squad views at a mobile breakpoint (mobile layout and all mapped image elements verified; external Wikimedia download remains network-dependent in isolated iframe).

- [x] Stack and enlarge the auction winner/hidden-player reveal animation on mobile for readable names and clear spacing.

- [x] Prevent duplicate players across all auction rounds, both squads, hidden-player gifts, and final match flow.
- [x] Add regression tests proving every generated auction assignment and completed squad has unique player names.

- [x] Allow bids to increase by a user-selected amount greater than 1M while enforcing budget and future-round safety.
- [x] Add regression tests for flexible bid validation and UI bid controls.

- [x] Add an automated regression test for numeric bid input, +1/+5/+10 presets, next-bid label calculation, and oversized-bid blocking.

- [x] Allow the bid-increment field to be cleared and typed naturally, including entering 6M without an automatic reset to 1 during editing.
- [x] Add regression coverage for empty input, typed values, preset values, and safe fallback behavior.

- [x] Treat the bid field as the total player price, so entering 20M bids exactly 20M instead of adding 20M to the current price.
- [x] Add regression coverage for total-price bids, lower-than-current rejection, and budget/future-round safety.

- [x] Reset the current auction price and total-bid input between rounds so each player uses that round's own starting price.
- [x] Add regression coverage proving the next round does not inherit the previous winner's price.

- [x] Block any total-price bid below or equal to the current auction price and show clear feedback instead of accepting it.
- [x] Add regression coverage for lower, equal, and higher total-price bids in the rendered auction flow.

- [x] Disable withdrawal when the typed total price is invalid or below the round/current required price, preventing an accidental player lock.
- [x] Add rendered-flow regression coverage for invalid-price withdrawal and valid withdrawal behavior.

- [x] Keep the settlement button enabled after a valid bid and opponent withdrawal, while preserving invalid-bid protection.
- [x] Add rendered-flow regression coverage for bid, opponent withdrawal, and successful settlement.

- [x] Add an automatic temporary-pass state after a valid bid, without permanently marking the opponent as passed.
- [x] Allow the temporarily passed opponent to re-enter by entering a higher total price, and cover settlement after no re-entry.

- [x] Add a first-entry game hub page with an active «اعمل الصح» card and a disabled «أفتكر» card.
- [x] Upload and use the provided Aftakar logo from project static storage.
- [x] Route the active card into the auction game and provide a return-to-games control.
- [x] Verify desktop and 375px mobile layouts plus Game Hub interaction tests.

- [x] Rename the first-entry website/Game Hub identity to «كورة» and use the newly provided «اعمل الصح» logo.

- [x] Correct the hub/site name spelling from «كورة» to the exact requested «كوره» everywhere on the first page.

- [x] Use the exact full website name «كوره كده» everywhere on the first-entry Game Hub.

- [x] Replace residual Game Hub alt text and branding references with the exact final name «كوره كده» and test that «كورة» is absent.

- [x] Finalize the Game Hub with the provided «اعمل الصح» logo and exact website name «كوره كده» across visible branding and logo alt text.

- [x] Use the same existing in-game «اعمل الصح» logo on the active Game Hub card instead of the current hub logo.
