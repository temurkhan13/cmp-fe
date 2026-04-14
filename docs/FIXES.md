# CMP Frontend — Fixes Log

Tracks all fixes applied during testing, with the feature area, issue, and resolution.

---

| # | Date | Feature | Issue | Fix Applied |
|---|------|---------|-------|-------------|
| 1 | 2026-04-14 | Subscriptions & Billing | Frontend calling `/api/subscription` but backend serves at `/api/stripe/subscription` — resulting in 404 | Updated API paths in `PlanAndBilling.jsx` from `/subscription` to `/stripe/subscription` for GET (fetch plans) and POST (initiate checkout) endpoints |
| 2 | 2026-04-14 | Subscriptions & Billing | `POST /api/stripe/subscription` response was returning `{ sessionId }` but frontend expects `{ redirectToCheckoutURL }` — checkout redirect never triggered | Fixed `createSubscription` controller in `Subscription/controller.js` to return `{ status: true, redirectToCheckoutURL }` instead of `{ sessionId }` |
| 3 | 2026-04-14 | Subscriptions & Billing | No `/success` page existed — Stripe redirected to a 404 after payment | **FE:** Created `PaymentSuccess.jsx` with loading/success/error states, registered `/success` route in `plainRoutesData.js`, exported from `modules/auth/index.js` |
| 4 | 2026-04-14 | Subscriptions & Billing | No backend endpoint to verify Stripe checkout session — subscription update relied solely on webhooks | **BE:** Added `POST /api/stripe/subscription/verify-session` endpoint — retrieves session from Stripe, checks `payment_status === "paid"`, then upserts `user_subscriptions` table using existing `handleSubscriptionEvent` logic. Added route, controller, and service in `Subscription/` module |
| 5 | 2026-04-14 | Subscriptions & Billing | Success page was a placeholder with a timeout — not connected to the verify endpoint | **FE:** Wired `PaymentSuccess.jsx` to call `POST /api/stripe/subscription/verify-session` with `session_id` from URL, shows success/error based on response |
| 6 | 2026-04-14 | Subscriptions & Billing | User had to manually type email on Stripe checkout page | **BE:** Added `customer_email: user.email` to `stripe.checkout.sessions.create()` in `Subscription/service.js` so the email is pre-filled |
| 7 | 2026-04-14 | Subscriptions & Billing | "Upgrade Plan" button in sidebar shown to all users, even those with an active subscription | **FE:** Added `useSelector` for `auth.user` in `DashboardLayout.jsx` and wrapped the upgrade CTA in `{user && !user.subscription && (...)}` so it only renders for non-subscribed users |
| 8 | 2026-04-14 | Subscriptions & Billing | `currentPlanName` fallback showed "Free" even when no subscription data was loaded yet | **FE:** Changed fallback in `PlanAndBilling.jsx` from `'Free'` to `'-'` so the UI doesn't mislead while data is loading |
| 9 | 2026-04-14 | Landing Page | `HeroSection.jsx` used HTML `class` attribute instead of React's `className` — caused console warnings | **FE:** Replaced all `class=` with `className=` in `HeroSection.jsx` |
| 10 | 2026-04-14 | Subscriptions & Billing | Typo in `modules/auth/index.js` — comment said `// stipe` instead of `// stripe` | **FE:** Fixed typo to `// stripe` |
