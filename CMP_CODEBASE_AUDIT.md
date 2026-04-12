# CMP Platform — Full Codebase Audit

**Date:** April 12, 2026
**Repos:** cmp-fe-check (Frontend), cmp-be-check (Backend), cmp-ai-check (AI Service)
**Purpose:** Identify root causes of slowness, instability, and security gaps

---

## Executive Summary

Systemic issues across all 3 repos explain the slowness and instability:

- **Frontend:** Every route re-mounts on every navigation (`uuidv4()` keys), no code splitting, mock adapter intercepting production requests
- **Backend:** N+1 database queries everywhere, sync file reads blocking event loop, 2,707-line god file, rate limiter on wrong path
- **AI Service:** All sync calls blocking the async event loop, zero authentication, no timeouts on Claude/Gemini calls

---

## FRONTEND (cmp-fe-check)

### CRITICAL

| # | Issue | File | Details |
|---|---|---|---|
| FE-1 | `uuidv4()` as route keys — full remount on every render | `Routes.jsx:33,38,43,46,49,52` | React destroys and recreates every route component on every navigation. Resets all state. **Single biggest performance killer.** Fix: use `el.path` as key. |
| FE-2 | `axios-mock-adapter` in production deps — intercepts real requests | `useChatHistory.js:3-5`, `useManagerChat.js:109-112`, `useManagerUser.js:2-6` | Listed in `dependencies` not `devDependencies`. `new MockAdapter(apiClient)` runs at module load, intercepting all axios requests globally. `useMockData = true` hardcoded. |
| FE-3 | `updateComment` body serialized as `"text:[object Object]"` | `workspaceApi.js:351` | `body: 'text:' + { comment }` serializes to string `"text:[object Object]"`. Comment editing completely broken at API layer. |
| FE-4 | Delete Account calls wrong backend (`twoconnectv1-backend`) | `PersonalInfo.jsx:251` | Hardcoded fallback URL is `twoconnectv1-backend.onrender.com` — a completely different service. Should use `config.apiURL`. |

### HIGH

| # | Issue | File | Details |
|---|---|---|---|
| FE-5 | No code splitting for most routes | All route data files except `assessmentRoutesData.js` | All auth/dashboard/sitemap/assistant routes eagerly imported via barrel `Module` object. Only 3 assessment routes use `React.lazy()`. Entire app lands in initial bundle. |
| FE-6 | 25+ empty `catch` blocks | Multiple files | Auth (SignIn:62, SignUp:35, SetPassword:40), trash (TrashWorkspaceTab:59,71), editor (Editor.jsx:106,129,146), DashboardLayout:40. Users see nothing when operations fail. |
| FE-7 | `dangerouslySetInnerHTML` with unsanitized AI content | `WordReportTemplate.jsx:143` | No DOMPurify. AI-generated HTML injected directly. XSS risk via prompt injection. |
| FE-8 | `setSelectedWorkspace` reducer calls thunk without dispatching | `workspacesSlice.js:73-76` | `updateWorkspaceStatus(...)` called without `dispatch()` — returns a function that's immediately discarded. Server call never fires. |
| FE-9 | `import * as FaIcons from 'react-icons/fa'` | `MessagesSection.jsx:63` | Full icon library (~3000 icons) in bundle. Only a handful used. |
| FE-10 | Orphaned `workspaceSlice.js` thunk from unregistered slice | `MessagesSection.jsx:66`, `NewChat.jsx:29` | `getChatsAsync` imported from old unregistered slice. Dispatches into void. |

### MEDIUM

| # | Issue | File | Details |
|---|---|---|---|
| FE-11 | No Vite manual chunk splitting | `vite.config.js` | ~30 heavyweight deps (jspdf, pdfmake, docx, pptxgenjs, exceljs, jodit, framer-motion, @xyflow/react) all in one chunk. |
| FE-12 | No `invalidatesTags` on RTK Query mutations | `workspaceApi.js:30-61` | `updateWorkspace`, `removeFolder`, `addChat` etc. never invalidate cache. Stale data after mutations. |
| FE-13 | `AOS.init()` on every render (no dep array) | `App.jsx:16-25` | `useEffect(() => { Aos.init({...}) })` — no `[]`. Reinitializes animation library on every state change. |
| FE-14 | `redux-persist` persists stale server data | `store.js:63-67` | Entire `workspaces` slice persisted to localStorage. App loads with stale data on restart. |
| FE-15 | Async `useEffect` without mounted guards | `usestartAssessment.js:86-106`, `assessment/MessagesSection.jsx:119-150` | State updates after await on potentially unmounted components. |
| FE-16 | Duplicate color picker libraries | `package.json` | Both `react-color-palette` and `react-colorful` installed. |
| FE-17 | Both `marked` and `react-markdown` installed | `package.json` | Overlapping markdown rendering. |
| FE-18 | Inner `setTimeout` not cleaned up | `SitemapLayoutFlow.jsx:577` | Nested timeout inside a useEffect — outer is cleaned, inner is not. |
| FE-19 | `NotificationBar` first timeout not cleaned | `NotificationBar.jsx:9-22` | First `setTimeout` not stored/cleared on unmount. |

### LOW

| # | Issue | File | Details |
|---|---|---|---|
| FE-20 | Dead dependencies in `package.json` | `package.json` | `quill` (never imported), `postman-to-openapi` (CLI tool), `canvg`, `domhandler`, `htmlparser2` (not directly imported). |
| FE-21 | Dead `UpdatedApi/` directory | `src/UpdatedApi/` | Auto-generated OpenAPI SDK code, never consumed. |
| FE-22 | Massive commented-out code blocks | `store.js:36-80` (~45 lines), `MessagesSection.jsx:43-100` (~60 lines), `api/auth.js` (entire file) | |
| FE-23 | `console.log` with user data | `HelpCenterComp.jsx:33-34` | Logs email and description to browser console. |
| FE-24 | Token in localStorage (XSS-accessible) | Multiple files | Combined with dangerouslySetInnerHTML, token theft possible. |

---

## BACKEND (cmp-be-check)

### CRITICAL

| # | Issue | File | Details |
|---|---|---|---|
| BE-1 | OTP returned in API response body | `users/controller.js:74`, `users/service.js:129` | `res.send({ OTP })` — attacker gets OTP without email. OTP has no expiry enforcement either. |
| BE-2 | Stripe webhook receives parsed JSON (signature always fails) | `Subscription/controller.js:70-78` | `express.json()` applied globally before webhook route. `stripe.webhooks.constructEvent` requires raw buffer. Also `stripeService.webhook()` not awaited. |
| BE-3 | `tokens` implicit global (no const/let/var) | `users/controller.js:23` | `tokens = await tokenService.generateAuthTokens(user)` — implicit global in non-strict mode. Race condition under concurrent logins. |
| BE-4 | `process.env.JWT_SECRET` used directly (undefined risk) | `workSpaces/service.js:311` | Bypasses config validation. If env var absent, `jsonwebtoken` accepts `undefined` as secret — any token validates. |
| BE-5 | CORS fully open | `app.js:48-49` | `cors()` with no options allows all origins. |
| BE-6 | File upload: no MIME/extension validation, served from webroot | `fileUpload.js:1-30` | `imageFilter` defined but never applied. Any file type accepted (`.exe`, `.php`). Stored under `public/uploads/` served as static. Arbitrary file upload → RCE vector. |
| BE-7 | Sync `readFileSync` blocks event loop | `workSpaces/service.js:594,612,614` | Large PDF/DOCX read synchronously inside async handlers. All requests queue during parse. |

### HIGH

| # | Issue | File | Details |
|---|---|---|---|
| BE-8 | Duplicate route definitions — unreachable handlers | `Assessments/route.js` | Three `POST /` handlers registered. Only first reachable. `createSurvey`, `createCheckChat` unreachable. `/inspire` calls wrong controller. |
| BE-9 | N+1 queries in `getUserChats` | `workSpaces/service.js:1779-1798` | 2 queries per "New Chat" entry in a for loop. 50 chats = 100 sequential round-trips per request. |
| BE-10 | N+1 queries in `getFullPlaybook` | `digitalPlaybook/service.js:97-161` | 2 queries per stage + 2 per node. 5 stages x 5 nodes = 32+ sequential queries. |
| BE-11 | 6 sequential queries in `getUserSubscription` | `users/service.js:209-255` | user_subscriptions, workspaces count, workspaces select, folders count, folders select, sitemaps count. All sequential. |
| BE-12 | Rate limiter on wrong path | `app.js:51-53` | Limiter mounted at `/auth`, routes at `/api/auth`. Rate limiting never fires for login/register/forgot-password. |
| BE-13 | `makeAxiosCall` swallows errors silently | `global.functions.js:8-28` | Catch block logs error, returns `undefined`. Callers get `undefined` instead of error. |
| BE-14 | Subscription check fails open | `checkSubscription.js:40-43` | Any error → `next()`. DB outage = free premium access. |
| BE-15 | Full request body logged to disk | `logRequest.js:7-8` | Passwords, OTPs, PII written to `syslog.txt` in plaintext. |
| BE-16 | `GET /api/auth` unauthenticated user listing | `users/route.js:14` | `queryUsers` has no `auth()` middleware. Anyone can enumerate all users. |
| BE-17 | `convertMarkdownToPDF` undeclared variables | `markdownToPDF.js:165-167` | `inTable`, `tableHeaders`, `tableAlignments` never declared. ReferenceError on any table. |
| BE-18 | `convertMarkdownToPDF` never awaited | `workSpaces/service.js:1122,1232,2303,2362` | Promise returned but not awaited. PDF never written. Path saved to DB for non-existent file. |

### MEDIUM

| # | Issue | File | Details |
|---|---|---|---|
| BE-19 | God file: 2,707 lines | `workSpaces/service.js` | Workspace, folder, chat, assessment, survey, wireframe, comments, bookmarks, trash, reports, RAG, dashboard — all in one file. |
| BE-20 | `router.delete;` dangling statement (no-op) | `workSpaces/route.js:191` | Bare property access. Likely incomplete route registration. |
| BE-21 | Unused controllers never routed | Various | `searchChats`, `UpdateGeneralMessage`, `deleteUser`, `refreshTokens`, entire `Projects/` module. |
| BE-22 | 500MB JSON body limit | `app.js:42-44` | Trivial denial-of-service. Also `express.urlencoded` applied twice. |
| BE-23 | No multer file size limit | `fileUpload.js:16` | No `limits` configured. Any file size accepted. |
| BE-24 | OTP has no expiry | `users/service.js:120-148` | `otp_valid_till` never written. OTP valid forever until used. |
| BE-25 | Wrong HTTP status codes | Multiple controllers | 201 CREATED returned for GETs, DELETEs. `getAssistantChat`:69, `deleteAssistantChat`:155, `deleteComment`:215, `moveToTrash`:352-372. |
| BE-26 | No pagination on high-volume endpoints | Multiple services | `getUserChats`, `getUserAssessments`, `getUserSitemaps`, `getCommentsForUser`, `getBookmarksForUser` — all unbounded. |
| BE-27 | `.select("*")` on every query | 39+ occurrences | Fetches all columns including password hashes, internal flags. |
| BE-28 | No timeout on AI axios calls | `global.functions.js`, various services | Hung AI call blocks indefinitely. No timeout configured. |
| BE-29 | `forgotPassword` doesn't await email send | `users/service.js:128` | Email failure silently dropped. |
| BE-30 | Sensitive data logged at INFO | `global.functions.js:11-14` | All AI request payloads (user messages, documents) logged. |
| BE-31 | `customer_email` often null from Stripe | `Subscription/service.js:124` | Subscription lookup by email fails for server-side events. |
| BE-32 | `verifyEmail` checks wrong field name | `users/service.js:79` | Accesses snake_case `verification_code_key` on camelCase-formatted object. Always `undefined`. |
| BE-33 | `Chats/` module appears redundant | `module/Chats/` | Duplicate chat functionality alongside `workSpaces/service.js`. |

### LOW

| # | Issue | File | Details |
|---|---|---|---|
| BE-34 | 58+ `console.log` instead of Winston | Throughout | `users/controller.js:86` logs full user object. `workSpaces/controller.js:192,229` logs entire req. |
| BE-35 | JWT secret defaults to `"change-me-in-production"` | `config/config.js:15` | Should be `Joi.string().required()`. |
| BE-36 | No `from` field on outgoing emails | `emailService.js:13-18` | Many SMTP servers reject. Recipients see blank sender. |
| BE-37 | `deleteUser` no ownership check | `users/controller.js:57-61` | Takes `req.params.id` with no check that caller owns account. |
| BE-38 | Debug artifact in auth middleware | `middlewares/auth.js:10` | `console.log('HEEEEEEEEEEEEEEEEEEEEEEEEEEE')` fires on every failed auth. |
| BE-39 | Outdated dependencies | `package.json` | `passport@0.4` (session fixation), `multer@1.4.2` (DoS), `express@4.17.1` (path traversal), `jsonwebtoken@8.5.1` (algorithm confusion), `helmet@4.1.0`, `dotenv@8.2.0`. |
| BE-40 | `syslog.txt` unbounded, lost on restart | `logger.js:23` | No rotation. Lost on Render redeploy. |
| BE-41 | N+1 on feedback category inserts | `Feedback/service.js:15-33` | Each category inserted separately in loop. |

---

## AI SERVICE (cmp-ai-check)

### CRITICAL

| # | Issue | File | Details |
|---|---|---|---|
| AI-1 | Sync embedding calls block event loop | `embedding_service.py:36-61` | `embed_text()` and `embed_query()` are sync functions calling Gemini API. Called from async endpoints without `run_in_executor`. Under 2+ concurrent requests, all stall. |
| AI-2 | Sync Supabase calls block event loop | `embedding_service.py:88-118, 121-139` | Every `sb.table(...).insert(...).execute()` and `sb.rpc(...)` is blocking HTTP. 50K doc = 63 blocking inserts in hot loop. |
| AI-3 | CORS wildcard with credentials | `main.py:45-51` | `allow_origins=["*"]` + `allow_credentials=True`. Broken per CORS spec for browser auth. |
| AI-4 | Zero authentication on all endpoints | `main.py:153-438` | Every endpoint completely unauthenticated. Anyone can call Claude at your cost, ingest docs under any user_id. |
| AI-5 | Path traversal on PDF endpoint | `main.py:125-128` | `PdfRequest.pdf_file` accepts a filesystem path passed directly to `PdfReader()`. Caller can read any server file. |
| AI-6 | Prompt injection via RAG context | `embedding_service.py:143`, `assessment_service.py:36-40` | Retrieved document chunks injected verbatim into system prompt. No sanitization. |

### HIGH

| # | Issue | File | Details |
|---|---|---|---|
| AI-7 | No timeouts on any AI calls | `openai_service.py:41-47`, `embedding_service.py:39-47,53-61` | Claude and Gemini calls can hang 30-120+ seconds with no timeout. |
| AI-8 | No retry logic on API failures | `openai_service.py:41-47` | Single call, no exponential backoff. Transient 429/502/503 immediately propagate as 500. |
| AI-9 | Silent RAG failure swallowing | `chat_service.py:19-20,41-43`, `assessment_service.py:27-28,63-68,90-95` | All RAG calls wrapped in `try/except Exception: pass`. Auth errors permanently suppressed. |
| AI-10 | `ingest_document` no error handling on chunk loop | `embedding_service.py:102-110` | If any chunk insert fails, document record orphaned in `documents` table. No rollback. |
| AI-11 | History list unbounded | `main.py:60,74,84,94,102` | `history: list[str]` has no `max_items`. Unlimited token cost. |
| AI-12 | PDF error returns 200 OK with error string | `pdf_service.py:35-40` | `"Error: PDF file not found."` returned as successful response. Client can't distinguish from success. |

### MEDIUM

| # | Issue | File | Details |
|---|---|---|---|
| AI-13 | God file: `main.py` 439 lines | `main.py` | All routes, models, CORS, logging in one file. Should use `APIRouter`. |
| AI-14 | `openai_service.py` misnamed | `openai_service.py` | Wraps Anthropic Claude, not OpenAI. Comment still says "GPT". |
| AI-15 | Duplicate request fields (spelling) | `main.py:86-88` | `bussiness_info` and `business_info` both exist. Manual coalescing at line 349. |
| AI-16 | Supabase/Gemini singletons not thread-safe | `embedding_service.py:19-26,29-33` | Lazy init without lock. Race condition possible under concurrent startup. |
| AI-17 | `max_tokens=4096` for all calls including simple transforms | `openai_service.py:25` | Grammar fix on 50 words doesn't need 4096 output tokens. |
| AI-18 | No response streaming anywhere | All endpoints | All AI calls wait for full completion. 20-60 second waits with no feedback. |
| AI-19 | `SearchRequest.limit` no upper bound | `main.py:141` | Caller can set `limit=100000`. |
| AI-20 | History role assignment assumes alternating order | `openai_service.py:31-35` | Odd=assistant, even=user. Wrong if history starts with assistant turn. |

### LOW

| # | Issue | File | Details |
|---|---|---|---|
| AI-21 | `PyPDF2` deprecated | `requirements.txt` | Unmaintained. Should migrate to `pypdf`. |
| AI-22 | Preview embedding model | `embedding_service.py:13` | `gemini-embedding-2-preview` could be deprecated without notice. |
| AI-23 | `anthropic==0.42.0` outdated | `requirements.txt` | Current is 0.49+. Missing streaming helpers, prompt caching. |
| AI-24 | `python-multipart` listed but unused | `requirements.txt` | No multipart upload endpoint. |
| AI-25 | Supabase URL leaked in `.env.example` | `.env.example:4` | Real project URL committed to source control. |
| AI-26 | Clients never closed on shutdown | `embedding_service.py`, `openai_service.py` | Connection pools leaked. Lifespan handler doesn't close them. |
| AI-27 | Report title detection fragile | `assessment_service.py:45-48` | Relies on model starting response with `## `. Claude sometimes prepends preamble. |

---

## Recommended Fix Order

### Phase 1: Demo Blockers (fix before April 16)

1. **FE-1** — Replace `uuidv4()` route keys with `el.path`
2. **FE-2** — Remove `axios-mock-adapter` from production / move to devDependencies
3. **FE-3** — Fix `updateComment` body serialization
4. **FE-4** — Fix Delete Account URL to use `config.apiURL`
5. **BE-3** — Add `const` to `tokens` declaration
6. **BE-12** — Fix rate limiter path to `/api/auth`
7. **FE-13** — Add `[]` dependency array to `AOS.init()`

### Phase 2: Performance (fix after demo)

8. **FE-5** — Add `React.lazy()` to all route data files
9. **FE-9** — Fix `import * as FaIcons` to named imports
10. **BE-7** — Replace `readFileSync` with `fs.promises.readFile`
11. **BE-9/10** — Fix N+1 queries (batch or join)
12. **BE-28** — Add timeouts to AI axios calls
13. **AI-1/2** — Wrap sync calls with `run_in_executor` or use async clients
14. **AI-7** — Add timeouts to Claude/Gemini calls
15. **FE-11** — Add Vite manual chunks config

### Phase 3: Security (fix before production)

16. **BE-1** — Stop returning OTP in response
17. **BE-5** — Restrict CORS to frontend origin only
18. **BE-6** — Apply file filter to multer, move uploads out of webroot
19. **BE-16** — Add `auth()` middleware to `GET /api/auth`
20. **AI-4** — Add authentication to AI service endpoints
21. **AI-5** — Validate PDF file path / switch to file upload
22. **FE-7** — Add DOMPurify to sanitize AI HTML before rendering
23. **BE-22** — Reduce JSON body limit from 500MB to 10MB
24. **BE-24** — Enforce OTP expiry

### Phase 4: Code Quality (ongoing)

25. **BE-19** — Break up `workSpaces/service.js` god file
26. **BE-17/18** — Fix `convertMarkdownToPDF` and add `await`
27. **FE-6** — Add error handling to empty catch blocks
28. **FE-12** — Add `invalidatesTags` to RTK Query mutations
29. **AI-13** — Split `main.py` into APIRouter modules
30. **BE-39** — Update outdated dependencies
31. **FE-20** — Remove dead dependencies
32. **BE-34** — Replace console.log with Winston
