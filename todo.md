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

- [x] Build the first playable «أفتكر» football-player guessing game with clues, answer input, scoring, and round progression.
- [x] Enable the «أفتكر» Game Hub card and add navigation into the new game with a return-to-games control.
- [x] Add responsive UI and automated tests for guessing, scoring, reset, and round completion.

- [x] Build «أفتكر» with a logo-led visual identity derived from the Aftakar logo, separate from «اعمل الصح» styling while preserving the «كوره كده» portal identity.

- [x] Add a text answer field and guess submission flow to «أفتكر» alongside the multiple-choice options.
- [x] Add Aftakar tests for replay/reset behavior and completing all rounds through the final results screen.
- [x] Visually verify the Aftakar game screen on mobile and desktop breakpoints.

- [x] Expand «أفتكر» into a much larger difficult question bank with many football trivia prompts and player-identification clues.
- [x] Generate closely confusing distractor choices from the same era, position, nationality, club, or competition while keeping one verified correct answer.
- [x] Randomize hard rounds without repeating questions or players within a session, and add regression tests for the expanded bank.

- [x] Add rich trivia metadata for nationality, clubs, achievements, and aliases, and test diverse clue categories across the expanded bank.

- [x] Prefer trivia-rich questions in normal sessions and add assertions for nationality, clubs, achievements, and aliases in the verified metadata subset.

- [x] Guarantee and test a minimum number of unique trivia-rich questions across multiple seeds and session sizes.
- [x] Strengthen tests to verify nationality, clubs, achievements, and aliases are directly surfaced in supported metadata clues.

- [x] Remove nationality wording from all Aftakar clue templates and replace it with harder club, competition, record, award, style, and position clues.
- [x] Add regression coverage proving generated clues do not reveal nationality while retaining hard trivia coverage.

- [x] Build offline one-phone party game «VAR و لا لأ؟» with 2–10 players, player names, rotating judge, and 10 rounds.
- [x] Add expandable VAR round data covering penalty, offside, goal, red card, foul, and decision-change scenarios.
- [x] Implement one-phone phase flow: watch clip placeholder, 60-second discussion timer, VAR checking animation, final decision, explanation, Egyptian comments, and scoring.
- [x] Add VAR logo asset and neon navy/green/yellow/red visual identity, then enable the Game Hub card and route.
- [x] Add automated tests for setup, judge rotation, timer transition, scoring, final rankings, reset, and responsive rendering.

- [x] Use the exact game title «VAR و لا لأ؟» consistently across the hub card, page metadata, setup screen, and in-game headings.

- [x] Set and test the exact document title «VAR و لا لأ؟» while the VAR game is open.
- [x] Add deterministic DOM coverage for the mobile-first responsive structure and critical controls of the VAR setup/game screens.

- [x] Add a 375px gameplay DOM test covering the discussion countdown, prediction grid, VAR button, decision controls, and result CTA.

- [x] Add a verified library of difficult real controversial football incidents alongside clearly labeled expandable training scenarios.
- [x] Keep the original referee decision hidden until the VAR reveal, then show the verified decision and explanation.
- [x] Add source metadata and an embed/link-only rights-safe strategy for real incidents, without downloading or redistributing footage.
- [x] Test incident uniqueness, hidden answers, reveal accuracy, source visibility, and mobile replay presentation.

- [x] Give every VAR round a playable video source or a reliable watch fallback, with a visible unavailable-source state instead of a broken embed.
- [x] Shuffle the VAR round order on every new game while keeping the selected session free of repeated incident IDs.
- [x] Add tests for media coverage, fallback handling, random ordering across seeds, and no repeats within a session.

- [x] Add an iframe/media error fallback state with a clear unavailable-source message and a source-link action.
- [x] Label training-round search links as references rather than guaranteed playable clips, and keep real embeds as externally hosted sources.
- [x] Add UI tests proving fallback controls appear for non-embed rounds and unavailable media is handled visibly.

- [x] Reset media failure state on every next-round transition and test that the following round can render its own media/reference state.

- [x] Convert the first VAR version to text-only real incidents with no video or media fallback UI.
- [x] Add verified real player names, team names, match context, original decisions, final VAR decisions, and explanations to the incident library.
- [x] Preserve hidden decisions and randomized no-repeat sessions, and add regression tests for real-name coverage and text-only presentation.

- [x] Add a verification reference to every real VAR incident, using official or trusted match/report sources, without exposing it during the hidden-decision phase.
- [x] Add data validation proving every real incident has a non-empty verification reference.

- [x] Rewrite Aftakar clues to be difficult and indirect, avoiding explicit answer-revealing hints such as direct club, nationality, or iconic-stat giveaways.
- [x] Expand Aftakar with a large varied bank across competitions, records, careers, tactical details, transfers, awards, eras, and match events.
- [x] Randomize the selected questions on every entry/restart while guaranteeing no repeated question or player within a session.
- [x] Add tests for clue subtlety, category diversity, fresh ordering across sessions, and no repeats.

- [x] إعادة ضبط أسئلة «أفتكر» إلى مستوى متوسط وأسئلة كروية مباشرة وممتعة دون غموض أو سهولة زائدة
- [x] إعادة كتابة بنك الأسئلة بقوالب حقيقية عن المسيرة والأندية والبطولات والانتقالات واللحظات المهمة
- [x] تحديث الاختبارات والتحقق البصري ثم حفظ checkpoint

- [x] إضافة أسئلة واقعية عن أهداف المواسم والهدافين والكرة الذهبية والبطولات والسنوات والأندية
- [x] بناء اختيارات متناسقة من نفس المركز والفترة والسياق لكل سؤال واقعي
- [x] إضافة اختبارات للتحقق من صحة الحقول وتنوع الفئات ثم حفظ checkpoint

- [x] إعادة هيكلة بنك «أفتكر» بالكامل إلى أسئلة واقعية موثقة بلا قوالب وصفية عامة
- [x] توحيد فئات الأسئلة والاختيارات وفق الموسم والبطولة والمركز والسياق
- [x] تحديث الاختبارات والتحقق البصري وحفظ checkpoint جديد

- [x] إضافة لعبة «مين بيهبد؟» ببيانات كرة قدم واقعية وحقيقة/هبد
- [x] بناء إعداد 3–10 لاعبين وأسماء ديناميكية و10 جولات على جهاز واحد
- [x] تنفيذ مؤقت النقاش والتصويت السري وكشف الإجابة وحساب النقاط
- [x] إضافة الترتيب والألقاب النهائية ودمج بطاقة اللعبة واللوجو في Game Hub
- [x] كتابة الاختبارات والتحقق على الموبايل ثم حفظ checkpoint

- [x] إصلاح فقدان التركيز بعد كل حرف في حقول أسماء لاعبي «مين بيهبد؟"
- [x] اختبار كتابة الاسم كاملاً وبقاء التركيز والكيبورد
- [x] التحقق البصري وحفظ checkpoint للإصلاح

- [x] تجهيز بروتوتايب iPhone 1 كـPWA باسم «كوره كده»
- [x] إضافة manifest وأيقونات وشاشة تشغيل مناسبة للموبايل
- [x] اختبار التثبيت ومسارات Game Hub والألعاب الأربع على viewport آيفون
- [x] حفظ checkpoint وتسليم بروتوتايب iPhone 1

- [x] إضافة شاشة تحميل افتتاحية للـPWA قبل Game Hub
- [x] اختبار مدة التحميل والانتقال السلس على viewport آيفون
- [x] حفظ checkpoint لتحديث شاشة التحميل

- [x] استبدال أيقونة PWA وApple Touch Icon بالأيقونة المربعة الجديدة
- [x] تحديث شاشة التحميل وmanifest واختبارات الأيقونة
- [x] التحقق على iPhone viewport وحفظ checkpoint

- [x] إطالة شاشة التحميل الافتتاحية إلى مدة مشاهدة مريحة
- [x] تحديث اختبار المؤقت والتحقق على الهاتف ثم حفظ checkpoint

- [x] ضبط شاشة التحميل الافتتاحية على 10 ثوانٍ كاملة
- [x] تحديث اختبار المدة والتحقق ثم حفظ checkpoint

- [x] ضبط شاشة التحميل الافتتاحية على 30 ثانية كاملة
- [x] تحديث اختبار المدة والتحقق ثم حفظ checkpoint

- [x] إضافة زر «تخطي» لشاشة التحميل الافتتاحية ذات 30 ثانية
- [x] اختبار التخطي والانتقال التلقائي على الهاتف ثم حفظ checkpoint

- [x] إصلاح عدم ظهور زر «تخطي» في النسخة المعروضة بسبب الكاش أو نسخة قديمة
- [x] تحديث Service Worker والتحقق البصري من الزر ثم حفظ checkpoint

- [x] إصلاح ظهور زر «تخطي» داخل Safari وPWA على iPhone
- [x] إضافة توافق WebKit واختبار احتياطي للزر والكاش ثم حفظ checkpoint

- [x] إرجاع أيقونة PWA وApple Touch Icon بعد اختفائها
- [x] تثبيت مسارات الأيقونة وإضافة اختبار يمنع اختفاءها بعد المزامنة
- [x] التحقق على الهاتف وحفظ checkpoint للإصلاح

- [x] جعل مشتتات «أفتكر» من لاعبين حققوا نفس الإنجاز أو ينتمون لنفس فئة السؤال
- [x] بناء مجموعات واقعية للهدافين والجوائز والبطولات والأرقام والانتقالات
- [x] إضافة اختبارات اتساق الخيارات والتحقق البصري ثم حفظ checkpoint

- [x] منع الاختيارات التي تكشف الإجابة بسبب الاعتزال أو اختلاف الحقبة
- [x] بناء مجموعات جوائز وهدافين متقاربة زمنياً وصعبة بشكل واقعي
- [x] إضافة اختبارات الحقبة والصعوبة والتحقق البصري ثم حفظ checkpoint

- [x] منع ظهور قرار الحكم داخل وصف أو جملة نقاش واقعة VAR قبل الكشف
- [x] إضافة اختبار يرفض الكلمات والعبارات الكاشفة في مرحلة النقاش
- [x] التحقق البصري وحفظ checkpoint لإصلاح VAR

- [x] توحيد اسم الموقع من «كوره كده» إلى «كورة كده» في كل الواجهات والبيانات الوصفية
- [x] تحديث اختبارات الاسم والتحقق من اختفاء الصيغة القديمة
- [x] التحقق البصري وحفظ checkpoint لتحديث الاسم

- [x] Build a reusable end-of-game share summary popup with winner, rankings, and score details
- [x] Generate a branded share image from each completed game's score summary
- [x] Add native share, copy-link, download-image, and share-image actions with graceful fallbacks
- [x] Integrate the share popup into Auction, Aftakar, VAR, and Men Byhbad finish screens
- [x] Add tests and mobile visual verification for the cross-game sharing flow

- [x] إضافة صفحة تصنيف بعد شاشة التحميل بثلاثة كروت: ألعاب جماعية، ألعاب فردية، العب أونلاين
- [x] ربط كارت ألعاب جماعية بصفحة الألعاب الموجودة حالياً
- [x] إنشاء صفحة ألعاب فردية فارغة بتصميم جاهز للإضافات القادمة
- [x] جعل كارت العب أونلاين معطلاً ويعرض «قريباً»
- [x] رفع اللوجوهات الثلاثة واستخدامها في الكروت مع تصميم RTL متجاوب
- [x] إضافة اختبارات للمسارات والتحقق البصري على الهاتف ثم حفظ checkpoint

- [x] إضافة تأثير ضغط وانتقال ناعم عند فتح كروت ألعاب جماعية وألعاب فردية
- [x] احترام prefers-reduced-motion ومنع الحركة على كارت العب أونلاين المعطل
- [x] إضافة اختبارات والتحقق البصري للتأثيرات ثم حفظ checkpoint

- [x] إضافة لعبة فردية «الطريق ما يتوهش» إلى قسم الألعاب الفردية باستخدام اللوجو المرفوع
- [x] بناء بيانات لاعبين حقيقية قابلة للتوسع مع أسماء بديلة ومسارات زمنية وHints
- [x] تنفيذ جولة تخمين تدريجية: 6 Hints، Potential Score، خصم التخمين الخاطئ، وTimeline متحرك
- [x] إضافة مؤقت 90 ثانية، حالات نجاح/فشل، Streak، ومستوى صعوبة
- [x] إضافة أساس التحدي اليومي ومشاركة النتيجة دون كشف اسم اللاعب
- [x] دمج اللعبة في صفحة الألعاب الفردية وإضافة اختبارات لكل الأزرار والمسارات
- [x] التحقق البصري على الهاتف وحفظ checkpoint للإصدار الأول

- [x] إصلاح تداخل لوجوهات الجماعية والفردية والأونلاين مع نصوص الكروت على الموبايل
- [x] تخصيص مساحة مستقلة ومتوازنة لكل لوجو في تخطيط الكارت المتجاوب
- [x] اختبار viewport الآيفون والتحقق من عدم وجود overlap ثم حفظ checkpoint

- [x] إضافة خلفية ضوئية خضراء لكارت الألعاب الجماعية
- [x] إضافة خلفية ضوئية ذهبية/برونزية لكارت الألعاب الفردية
- [x] إضافة خلفية ضوئية زرقاء لكارت العب أونلاين مع الحفاظ على وضوح النص
- [x] اختبار التباين والتحقق البصري على الهاتف ثم حفظ checkpoint

- [x] توسيع مكتبة اللاعبين لتشمل الحاليين والمعتزلين والمشاهير والأقل شهرة
- [x] توحيد بيانات اللاعب: الاسم العربي والإنجليزي، الأسماء البديلة، الحالة، المركز، الجنسية، الأندية، المسيرة، الإحصائيات، والصورة
- [x] بناء صفحة مكتبة لاعبين قابلة للبحث والتصفية حسب الحالة والمركز والجنسية والعصر
- [x] إضافة ملفات شخصية للاعبين مع Timeline للمسيرة وإحصائيات واضحة
- [x] ربط المكتبة ببيانات الألعاب ومنع التكرار والتحقق من الصور
- [x] اختبار المكتبة على الهاتف وحفظ checkpoint للإصدار الموسع
