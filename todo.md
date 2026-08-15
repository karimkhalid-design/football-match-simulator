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

- [x] توسيع مكتبة اللاعبين من 124 إلى أكثر من 500 لاعب مع توزيع متوازن على المراكز والعصور
- [x] إضافة بيانات موحدة لكل دفعات اللاعبين الجدد ومنع التكرار في المعرفات والأسماء
- [x] تحسين الصور الاحتياطية والبحث والأداء عند عرض 500+ بطاقة
- [x] اختبار التوازن والتغطية والواجهة على الهاتف ثم حفظ checkpoint

- [x] إضافة صور موثوقة للاعبين الذين لا يملكون صورة حالياً
- [x] تحديث خريطة الصور مع منع الروابط المكسورة واستخدام fallback واضح
- [x] اختبار تغطية الصور والبطاقات على الهاتف ثم حفظ checkpoint

- [x] إضافة أول لعبة أونلاين «هتعرف تجاوب؟» إلى قسم العب أونلاين باستخدام اللوجو المرفوع
- [x] استلام وتوثيق قواعد اللعبة وتحديد نموذج الغرفة واللاعبين والجولات
- [x] بناء Lobby وتدفق اللعب الأونلاين والنتائج بعد اعتماد التفاصيل

- [x] تثبيت اسم اللعبة «هتعرف تجاوب؟» واللوجو داخل قسم العب أونلاين
- [x] إنشاء Room حقيقية 1 ضد 1 بكود ورابط دعوة وNickname بدون Bot أو محاكاة LocalStorage
- [x] تنفيذ Lobby وReady وPresence وCountdown مع تزامن Realtime بين جهازين
- [x] إنشاء قاعدة أسئلة 100+ موزعة على الفئات والصعوبات مع حفظ الإجابة الصحيحة على السيرفر فقط
- [x] تنفيذ 10 جولات مع مؤقت متزامن، إجابة لمرة واحدة، Speed Bonus، Combo، وتعادل حاسم
- [x] إضافة Disconnect/Reconnect وPlay Again داخل نفس الغرفة وLeaderboard Rating/XP
- [x] إضافة أصوات اختيارية، Animations، Share Result، حالات التحميل والأخطاء، وتصميم Mobile First
- [x] اختبار السيناريو الكامل بين عميلين وحفظ checkpoint للإصدار الأونلاين

- [x] إصلاح تفعيل زر «جاهز» للاعب الثاني بعد جاهزية اللاعب الأول في لعبة «هتعرف تجاوب؟»
- [x] توسيط لوجو لعبة «هتعرف تجاوب؟» بشكل صحيح على الهاتف والكمبيوتر
- [x] إزالة الـ outline حول هالات الإضاءة الخلفية للوجوهات مع الحفاظ على التوهج الناعم
- [x] إضافة اختبارات انحدار للمشكلات الثلاث والتحقق البصري ثم حفظ checkpoint

- [x] قصر لعبة الأونلاين على أسئلة كرة القدم فقط وربط الأسئلة بمستوى الصعوبة المختار
- [x] رفع مدة السؤال إلى 20 ثانية ومنع إعلان الخطأ قبل وصول المؤقت إلى صفر
- [x] تغيير اسم كارت التصنيف إلى «العب أونلاين» مع الحفاظ على اسم اللعبة داخل صفحة اللعب
- [x] إصلاح تموضع لوجوهات كروت التصنيفات على الكمبيوتر مع الحفاظ على توافق الهاتف
- [x] إضافة اختبارات للمؤقت وبنك الأسئلة والاسم والتخطيط ثم حفظ checkpoint

- [x] إنهاء الجولة فور تسجيل إجابة اللاعبين الاثنين وتوزيع النقاط دون انتظار المؤقت
- [x] الانتقال السريع للجولة التالية مع إبقاء المؤقت كحل احتياطي لمن لم يجب
- [x] إضافة اختبار عميلين للإجابة المزدوجة والانتقال الفوري ثم حفظ checkpoint

- [x] منع انتهاء سؤال الأونلاين عند 14 ثانية أو أي قيمة مبكرة
- [x] ضمان استمرار السؤال حتى وصول مؤقت الخادم إلى صفر عند عدم اكتمال الإجابتين
- [x] إضافة اختبار للمؤقت حتى الصفر واختبار عميلين ثم حفظ checkpoint

- [x] رفع صعوبة أسئلة «مين بيهبد؟» مع الحفاظ على حقائق كروية واقعية
- [x] جعل المضللات قريبة من الحقيقة دون غموض أو أكثر من إجابة صحيحة
- [x] إضافة اختبارات لجودة البنك والصعوبة ثم حفظ checkpoint

- [x] جعل مكتبة اللاعبين الموحدة المصدر المشترك لكل الألعاب التي تعتمد على اللاعبين
- [x] ربط لعبة المزاد و«أفتكر» وأي ألعاب لاعبين لاحقة بالكتالوج الموحد مع الحفاظ على قواعد كل لعبة
- [x] اختبار تغطية الكتالوج والصور والأسماء ومنع التكرار ثم حفظ checkpoint

- [x] إضافة مرحلة مساعدة بعد اختيار كل اللاعبين في «مين بيهبد؟»
- [x] اختيار لاعب عشوائي من المشاركين وتوزيع كارت مساعدة عشوائي كل راوند
- [x] تنفيذ تأثيرات المساعدة على السؤال والنقاط مع استهلاك الكارت مرة واحدة
- [x] إضافة اختبارات للعدالة والعشوائية والتأثيرات وتدفق الواجهة ثم حفظ checkpoint

- [x] حذف تلميحات «أفتكر» العامة مثل المركز والتقييم واستبدالها بمعلومات كروية حقيقية
- [x] إعادة بناء اختيارات كل سؤال من نفس البطولة أو الحقبة أو الإنجاز
- [x] منع أي مجموعة اختيارات غير متناسقة أو سؤال لا يختبر معرفة فعلية
- [x] إضافة اختبارات جودة للبنك والتلميحات والاختيارات ثم حفظ checkpoint

- [x] إصلاح احتساب كارت الـ50 نقطة الإضافية وباقي كروت المساعدة في نقاط الراوند
- [x] عرض قيمة تأثير كارت المساعدة داخل نتيجة الراوند والمجموع النهائي
- [x] إضافة اختبارات لكل كارت ثم حفظ checkpoint
- [x] حفظ سجل نقاط كل لاعب في كل راوند مع الإجابة وتأثير كارت المساعدة
- [x] عرض تفاصيل مجموع كل لاعب في نهاية اللعبة مع الإجمالي والزيادات والخصومات
- [x] ربط التفاصيل بكارت المشاركة وإضافة اختبارات الاسكور النهائي ثم حفظ checkpoint

- [x] إضافة أسئلة «مين بيهبد؟» صعبة وممتعة مبنية على مواسم وأرقام وانتقالات وإنجازات حقيقية
- [x] جعل المضللات قريبة من الحقيقة دون كشف الإجابة أو وجود أكثر من إجابة صحيحة
- [x] إضافة اختبارات للصعوبة والتنوع ومنع الأسئلة السهلة المباشرة ثم حفظ checkpoint

- [x] قياس فارق سرعة الإجابة الصحيحة بين لاعبي الأونلاين
- [x] إضافة عداد بونص يتقدم للاعب الأسرع ويمنحه مساعدة عند الامتلاء
- [x] تنفيذ مساعدة حذف إجابتين خاطئتين للاعب صاحب العداد المكتمل فقط
- [x] إضافة اختبارات تزامن وسرعة وتحقق من بقاء اختيار صحيح وآخر خاطئ ثم حفظ checkpoint

- [x] ضبط شحن عداد السرعة ليتمكن اللاعب من ملئه خلال مباراة من 10 أسئلة
- [x] توسيع بنك أسئلة الأونلاين بشكل كبير لكل مستويات الصعوبة مع حقائق كرة قدم واقعية
- [x] ضمان خلط وترتيب مختلف للأسئلة في كل Session ومنع التكرار داخل المباراة
- [x] إضافة اختبارات لحجم البنك وتوازن الصعوبة والعشوائية والعداد ثم حفظ checkpoint

- [x] إزالة شاشة OAuth وUsername من قسم الأونلاين
- [x] إعادة تدفق الاسم المستعار القديم دون إجبار على تسجيل الدخول
- [x] اختبار الغرف والدعوات وعدم تأثر باقي الألعاب ثم حفظ checkpoint

- [x] إضافة زر واضح للرجوع إلى صفحة الأقسام من صفحة الألعاب الجماعية
- [x] ضبط الزر على الهاتف والكمبيوتر وإضافة اختبار تنقل
- [x] حفظ checkpoint بعد التحقق من الرجوع للأقسام

- [x] Add a responsive «الأقسام» back button to the Group Games hub header and verify navigation back to Category Hub on mobile and desktop.

- [x] ربط رقم اللاعبين في صفحة الأقسام بعدد لاعبي كتالوج كورة كده الفعلي
- [x] إضافة اختبار يضمن تحديث العداد عند تغيّر حجم مكتبة اللاعبين
- [x] التحقق البصري وحفظ checkpoint بعد ربط العداد

- [x] إضافة اختيار قسم للمزاد قبل البداية: الدوري الإنجليزي، الدوري الإسباني، والأساطير
- [x] تصفية لاعبي المزاد حسب القسم المختار مع منع خروج لاعب من قسم آخر
- [x] إضافة اختبارات للأقسام وتدفق البداية والتحقق البصري ثم حفظ checkpoint

- [x] إضافة قسم الدوري الألماني إلى المزاد وتصنيف لاعبيه
- [x] إضافة قسم الدوري المصري إلى المزاد وتصنيف لاعبيه
- [x] إضافة قسم «ميكس» يضم كل لاعبي المكتبة وتحديث واجهة الاختيار
- [x] إضافة اختبارات للأقسام الجديدة والتحقق البصري ثم حفظ checkpoint

- [x] قصر أقسام الدوري الإنجليزي والإسباني والألماني والمصري على اللاعبين الحاليين فقط
- [x] إصلاح صور اللاعبين غير الظاهرة بإضافة خريطة أو fallback موثوق
- [x] إضافة اختبارات للحالة والصور والتحقق البصري ثم حفظ checkpoint

- [x] السماح بضم الأساطير إلى قسم الدوري المصري فقط مع إبقاء باقي الدوريات للحاليين
- [x] تحديث اختبارات التصفية والتحقق البصري ثم حفظ checkpoint

- [x] توسيع خريطة صور اللاعبين لتغطية أكبر عدد من لاعبي الكتالوج
- [x] تقوية fallback للصور غير الظاهرة ومنع الصورة المكسورة
- [x] إضافة اختبار تغطية الصور والتحقق البصري ثم حفظ checkpoint

- [x] إضافة لعبة «خليك وسطهم» إلى قسم الألعاب الجماعية مع اللوجو الجديد
- [x] تنفيذ إعداد لعبة محلية من 3 إلى 10 لاعبين مع أسماء واختيار أقسام متعددة أو عشوائي
- [x] إضافة مكتبات اللاعبين والمدربين والاستادات والبطولات والأندية والمنتخبات
- [x] تنفيذ توزيع العميل السري وتمرير الهاتف بأمان ومرحلة الأسئلة والتصويت والتخمين النهائي
- [x] إضافة النتائج وطريقة اللعب والاختبارات والتحقق البصري ثم حفظ checkpoint

- [x] إضافة شاشة فصل بين كل لاعب تعرض اسم اللاعب التالي فقط قبل كشف دوره
- [x] منع الانتقال المباشر لبيانات اللاعب التالي واختبار خصوصية التوزيع
- [x] التحقق البصري وحفظ checkpoint بعد إصلاح تمرير الهاتف

- [x] توسيط لوجو «خليك وسطهم» وضبط حجمه في شاشة بداية اللعبة
- [x] إزالة الخلفية الزرقاء غير المناسبة من عرض اللوجو داخل بطاقة الأقسام
- [x] التحقق البصري على الهاتف والكمبيوتر ثم حفظ checkpoint

- [x] إضافة مرحلة تخمين نهائي للعميل السري بعد التصويت
- [x] احتساب فوز العميل السري عند كتابة العنصر الصحيح حتى لو تم اكتشافه
- [x] إضافة اختبارات التخمين والنتيجة والتحقق البصري ثم حفظ checkpoint

- [x] منح اللاعبين 100 نقطة عند اكتشاف العميل السري
- [x] منح العميل السري 50 نقطة عند تخمين العنصر الصحيح
- [x] عرض تفاصيل النقاط وإضافة اختبارات الحالتين والتحقق البصري ثم حفظ checkpoint

- [x] إضافة ليدربورد جلسة يحفظ نقاط نفس الأسماء بين الجولات ويصفر عند تغيير الأسماء
- [x] تحديث السكور التراكمي بعد كل جيم وعرض ترتيب اللاعبين
- [x] إضافة كارت مشاركة للنتيجة مع تفاصيل السكور وزر مشاركة وحفظ كصورة
- [x] إضافة اختبارات الاستمرارية والمشاركة والتحقق البصري ثم حفظ checkpoint

- [x] جعل ترتيب اللاعبين عشوائيًا مع بداية كل جيم في خليك وسطهم
- [x] اختبار اختلاف الترتيب مع الحفاظ على الليدربورد حسب الاسم والتحقق البصري ثم حفظ checkpoint

- [x] توسيع مكتبة لاعبي خليك وسطهم وإضافة عناصر جديدة متنوعة للأقسام
- [x] ضمان عدم تكرار العنصر داخل الجيم واختبار حجم وتوازن المكتبة
- [x] التحقق البصري وحفظ checkpoint بعد توسيع المكتبة

- [x] جعل معلومات العنصر المعروضة مختلفة لكل لاعب يعرف السر داخل «خليك وسطهم»
- [x] إضافة اختيار عدد العملاء السريين بما يتناسب مع عدد اللاعبين وتحديث توزيع الأدوار والنتائج
- [x] إضافة اختبارات للإعدادات الجديدة والخصوصية والتوزيع متعدد العملاء
- [x] التحقق البصري وتشغيل الاختبارات وحفظ checkpoint للتحديث الجديد

- [x] تطوير التصويت في «خليك وسطهم» لاختيار عدة عملاء سريين في نفس الجولة
- [x] منع التكرار وإظهار عدد العملاء المتبقيين وتحديث كشف العملاء والتخمين والنتيجة
- [x] إضافة اختبارات التصويت المتعدد والتحقق البصري وحفظ checkpoint

- [x] استمرار التصويت في جولة إضافية بعد كشف العميل الأول حتى محاولة كشف العملاء المتبقين
- [x] تحديث التخمين والنقاط والنتيجة النهائية لتدعم الكشف على مراحل
- [x] اختبار التصويت المتتابع والتحقق البصري وحفظ checkpoint

- [x] إضافة زر اختيار وضع «خليك وسطهم +» مع شرح أن العملاء لا يعرفون هويتهم
- [x] توزيع عنصر مختلف للعملاء عن عنصر باقي اللاعبين مع منع التكرار
- [x] تحديث التمرير والتصويت والنتيجة والاختبارات لدعم الوضع الجديد
- [x] التحقق البصري وتشغيل الاختبارات وحفظ checkpoint

- [x] تبسيط نص بطاقة «خليك وسطهم» وإزالة شرح الوضع
- [x] استبدال شرح «خليك وسطهم +» بعبارة «هنا المتعة كلها» والتحقق من الواجهة

- [x] إعادة شرح الوضع العادي مع إبقاء عبارة «هنا المتعة كلها» لوضع «خليك وسطهم +»

- [x] ربط العناصر البديلة المعروضة فعليًا بخيارات التصويت في وضع «خليك وسطهم +»
- [x] منع ظهور لاعب أو عنصر خارج قائمة التصويت وإضافة اختبار انحدار للتطابق
- [x] التحقق البصري وتشغيل الاختبارات وحفظ checkpoint للإصلاح

- [x] توحيد قائمة اللاعبين وترتيبهم بين شاشة التمرير وشاشة التصويت في الوضعين العادي و«خليك وسطهم +»
- [x] إضافة اختبار انحدار يثبت أن كل لاعب تم تمريره يظهر في خيارات التصويت

- [x] توحيد قائمة عناصر التمرير مع خيارات تصويت العنصر في الوضعين العادي و«خليك وسطهم +»
- [x] عرض العنصر المشترك والعناصر البديلة الفعلية فقط ضمن اختيارات التصويت وإضافة اختبار تطابق
- [x] التحقق البصري وتشغيل الاختبارات وحفظ checkpoint للإصلاح

- [x] خلط اختيارات العنصر عشوائيًا في كل جولة مع ضمان وجود العنصر الفعلي والعناصر البديلة
- [x] إضافة اختبار يثبت اختلاف ترتيب الاختيارات وعدم فقدان أي عنصر فعلي

- [x] إضافة زر ونافذة منبثقة في شاشة التحميل لشرح تثبيت «كورة كده» كتطبيق PWA
- [x] عرض تعليمات مناسبة لـ iPhone وAndroid والكمبيوتر مع إمكانية الإغلاق وعدم تعطيل التخطي
- [x] إضافة اختبارات للنافذة والتحقق البصري وتشغيل الاختبارات وحفظ checkpoint

- [x] إضافة حفظ خيار «عدم الإظهار مرة أخرى» لنافذة تعليمات PWA
- [x] دعم زر تثبيت مباشر عبر beforeinstallprompt عند توفره
- [x] تكييف تعليمات التثبيت تلقائيًا حسب الجهاز والمتصفح
- [x] إضافة اختبارات للسلوك الجديد والتحقق البصري وحفظ checkpoint

- [x] إزالة تكرار قسم iPhone وiPad من نافذة تعليمات تثبيت PWA وتحديث اختبار العرض

- [x] إخفاء زر التثبيت المباشر عند فتح الموقع كتطبيق PWA مثبت عبر standalone أو iOS standalone
- [x] إضافة اختبار يثبت إخفاء الزر في وضع التطبيق المثبت والتحقق البصري وحفظ checkpoint

- [x] منع نافذة تثبيت PWA من الظهور تلقائيًا وفتحها فقط من زر «طريقة تثبيت الموقع»
- [x] تحديث اختبارات شاشة التحميل والتحقق البصري وحفظ checkpoint

- [x] جعل الفريق الأقوى يحصل على أفضلية حقيقية في محاكاة مباراة المزاد وتقليل التعادلات المتكررة
- [x] إضافة اختبارات احتمالات الفوز والنتيجة حسب فارق قوة التشكيلتين مع مفاجآت واقعية
- [x] التحقق البصري وتشغيل الاختبارات وحفظ checkpoint لمحاكاة المباراة

- [x] تدقيق مركز كل لاعب في مكتبة المزاد والكتالوج الموحد وتصحيح السجلات غير الدقيقة
- [x] إضافة اختبارات تمنع مراكز غير صالحة وتغطي التوزيع على مراكز 4‑3‑3
- [x] التحقق البصري وتشغيل الاختبارات وحفظ checkpoint بعد مراجعة المراكز

- [x] تصحيح عمرو السولية إلى CM كلاعب وسط مدافع ومراجعة لاعبي الوسط المصريين المرتبطين به
- [x] إضافة اختبار مباشر للمراكز المصرية المصححة وتشغيل الاختبارات وحفظ checkpoint

- [x] ربط الحارس والدفاع والوسط والأجنحة والمهاجم بتقييمات منفصلة داخل محاكاة المباراة
- [x] جعل توازن المراكز يؤثر على الاستحواذ والفرص والتسديدات والأهداف مع الحفاظ على المفاجآت
- [x] إضافة اختبارات لتأثير المراكز وتشغيل الاختبارات والتحقق البصري وحفظ checkpoint

- [x] إضافة مجموعة كبيرة من اللاعبين المصريين الحاليين والمعتزلين مع مراكز وبيانات دقيقة
- [x] إضافة خرائط صور موثوقة وفallback للاعبين المصريين الجدد
- [x] ربط اللاعبين المصريين بالأقسام والألعاب التي تستخدم مكتبة اللاعبين، مع منع التكرار
- [x] إضافة اختبارات التغطية والتحقق البصري وتشغيل الاختبارات وحفظ checkpoint

- [ ] تقييم متطلبات نشر نسخة منفصلة من المشروع على Vercel دون التأثير على Manus
- [ ] إعداد فرع أو نسخة تجريبية مستقلة للنشر والاختبار
- [ ] اختبار توافق الواجهة وPWA والخادم وSocket.IO والمصادقة وقاعدة البيانات
- [ ] توثيق القيود والنتيجة قبل أي قرار نقل أو تغيير للاستضافة الأساسية

- [x] إنشاء فرع مستقل لنسخة Vercel التجريبية دون تغيير نسخة Manus
- [x] إعداد نسخة نشر Vercel وتجربة الواجهة وPWA والمزاد
- [ ] تجهيز متطلبات Socket.IO والتخزين المشترك ثم اختبار غرف الأونلاين
- [x] توثيق النتيجة والقيود وحفظ حالة التجربة

- [x] إضافة زر تبديل اللغة بين العربية والإنجليزية في نسخة Manus الأساسية
- [x] ترجمة الواجهة الأساسية وضبط اتجاه RTL/LTR وحفظ اختيار اللغة
- [x] إضافة اختبارات اللغة والتحقق البصري وحفظ checkpoint على Manus فقط

- [x] توسيع الترجمة الإنجليزية لتشمل كل صفحات الموقع والألعاب والعناوين والأزرار والرسائل
- [x] توحيد نصوص التنقل والرجوع والمشاركة والنتائج وإعدادات الألعاب حسب اللغة المختارة
- [x] نقل زر تبديل اللغة إلى موضع مستقل لا يتداخل مع زر مكتبة اللاعبين على الهاتف والكمبيوتر
- [x] إضافة اختبارات شاملة للتبديل والترجمة والاتجاه والتحقق البصري وحفظ checkpoint على Manus فقط

- [x] إصلاح زر «تخطي» في شاشة التحميل والتأكد من تجاوزه للشاشة
- [x] إضافة اختبار انحدار لزر التخطي والتحقق البصري وحفظ checkpoint على Manus

- [x] تشخيص سبب بقاء شاشة التحميل بعد الضغط على زر «تخطي» في التطبيق الكامل
- [x] إضافة اختبار تكاملي يثبت انتقال App إلى الصفحة الرئيسية بعد التخطي
- [x] التحقق على الهاتف وحفظ checkpoint جديد على Manus بعد الإصلاح

- [x] حصر وإضافة ترجمة لكل النصوص العربية المتبقية في الواجهات والألعاب والرسائل الديناميكية
- [x] منع ظهور نص عربي داخل الواجهة عند اختيار English ومنع بقاء نص إنجليزي عند اختيار العربية
- [x] إضافة اختبارات اتساق اللغة والتحقق البصري وحفظ checkpoint جديد على Manus

- [x] تشخيص وإصلاح عدم دقة عداد الوقت وتزامنه في لعبة الأونلاين
- [x] مراجعة وتنقية بنك أسئلة الأونلاين وربطه بالصعوبة وترتيبه عشوائيًا
- [x] إضافة اختبارات لغرفة 1v1 والتحقق البصري وحفظ checkpoint على Manus
