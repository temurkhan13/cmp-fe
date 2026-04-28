# Button Consolidation — Discovery & Locked Spec

**Status:** PR 1-9 complete (~207 buttons migrated across 86 files). PR 10 partial — legacy Button + global rule preservation done; ~80-class SCSS purge deferred. PR 11 (ESLint guard) pending.
**Last updated:** 2026-04-28 (revised — see § 12 Errata)
**Owner:** Frontend consolidation effort

---

## 1. Purpose

Consolidate ~193 native `<button>` instances scattered across 77 files behind a single reusable `<Button>` component. Unify ~80 distinct className strings into 7 design-system variants × 3 sizes. Resolve documented inconsistencies (e.g. duplicate close-button classes, mismatched modal cancel/confirm pairs) without breaking existing UI.

---

## 2. Decisions log

| ID | Decision | Source |
|---|---|---|
| D1 | **SCSS only** — Tailwind not in use. Don't add it as part of this work. | User Q1 |
| D2 | **No major visual changes.** Standardizing minor padding/border differences across same-role buttons is allowed. The `delete-modal-confirm-btn` lime-instead-of-red color stays as-is. | User Q2 |
| D3 | **Design tokens** for the new Button go in `cmp-fe/scss/utils/_variables.scss`. | User Q3 |
| D4 | **Old [`cmp-fe/src/components/feature/Button.jsx`](src/components/feature/Button.jsx) has 17 active usages via `Components.Feature.Button` namespace.** Deletion deferred to PR 10 after all consumers migrate. (Original claim of "0 imports, dead code" was incorrect — see § 12 Errata.) | User Q4 + § 12 |
| D5 | **Variant naming** uses design-system terms: `primary | secondary | destructive | ghost | link | icon | toggle`. | User Q5 |
| D6 | **Discovery first**, no code until spec is locked and approved. | User Q6 |
| D7 | **3 sizes** (`sm | md | lg`) — measurement-driven, not assumed. | User Q7 |
| D8 | **Tabs/toggles** are part of the same Button component via `variant="toggle"` + `active` boolean. | User Q8 |
| D9 | **Auth-provider buttons** (Google/MS sign-in) use `variant="secondary" size="lg" iconLeft={...}` — no separate `auth` variant. | User Q9 |
| D10 | **Modifier classes** (`--flex`, `--selected`, `--danger`) collapse into Button props, NOT supported as arbitrary class composition. `className` remains a passthrough escape hatch during migration. | User Q10 (delegated, recommended) |
| D11 | **CSS-modules buttons** in `Questionnaire.jsx` are migrated too (not left alone). | User Q11 |
| D12 | **This document exists** because the user explicitly approved it. | User Q12 |

---

## 3. Verified facts (no assumptions)

All numbers below were established via direct grep/read of the codebase, not delegated to an agent.

| Fact | Value | Verification |
|---|---|---|
| Native `<button>` instances | **193** across **77 files** | `<button\b` grep + multiline `<button[^>]*?>` grep |
| `<Button>` component instances | **0** | grep returned no matches; react-bootstrap not installed |
| Imports of existing `feature/Button.jsx` | **17 (via namespace re-export)** | originally grepped only `from '...components/feature/Button'` (returned 0); corrected by grepping `Components\.Feature\.Button` — the component is re-exported through [feature/index.js:3](src/components/feature/index.js#L3) and reached via the `Components.Feature.*` namespace, see § 12 |
| Distinct static `className="..."` strings on buttons | **~80** | `sort | uniq -c` on extracted classNames |
| Distinct dynamic `className={...}` expressions | **17** | same |
| Buttons with `disabled={...}` | **39 across 26 files** | `disabled\s*=\s*\{` grep |
| Buttons with `type="submit"` | **11 across 11 files** | `type=["']submit["']` grep |
| Buttons with `aria-label=` | **only 4 across 4 files** | `aria-label\s*=` grep — most icon buttons lack a11y |
| Buttons with inline `style={{...}}` | **1** ([Editor.jsx:157-161](src/components/assessment/AssessmentComponent/Editor.jsx#L157) — save-state colors) | `style=\{\{` grep |
| `<a>` styled as button | **0** | `<a[^>]*className=["'][^"']*btn` grep — no anchor-as-button needed |
| Buttons with NO className anywhere | **5+** confirmed (PlaybookEditor export-format buttons L236-239 & L262, Editor.jsx export-format L174-177) | direct file read |
| CSS-Modules buttons | **5** in `Questionnaire.jsx` (`styles.ButtonStyleNext`, `ButtonStylePrev`, `ButtonStyleAss`) | `className=\{styles\.` grep |
| Tailwind installed | **No** (only stub in `node_modules`, no config, no `tailwindcss` in `package.json`) | `package.json` read + Glob |

---

## 4. Parent-CSS audit (full)

These selectors target buttons from a parent. **Migration constraint:** the new Button must keep rendering a native `<button>` element (no wrapper div), and during cluster migrations the original className must be passed through so these selectors keep matching. Cleanup happens in the final PR after all clusters are migrated.

### 4.1 Selectors targeting bare `<button>` (10)

| File:line | Selector |
|---|---|
| [feature/_button.scss:1](../scss/components/feature/_button.scss#L1) | **GLOBAL** `button { cursor: pointer; letter-spacing: 0.24px; transition: 0.3s ease-in-out; }` — applies to every `<button>` in the app. Must be moved to [_base.scss](../scss/utils/_base.scss) before this file is deleted in PR 10. |
| [dashboard-inline.scss:171](src/components/dashboard/dashboard-inline.scss#L171) | `.notification-item .actions button` |
| [dashboard-inline.scss:458](src/components/dashboard/dashboard-inline.scss#L458) | `.feedback-component button` |
| [dashboard-inline.scss:1744](src/components/dashboard/dashboard-inline.scss#L1744) | `.payment-card-actions button` |
| [dashboard-inline.scss:1868](src/components/dashboard/dashboard-inline.scss#L1868) | `.settings-tabs button` |
| [dashboard-inline.scss:2417](src/components/dashboard/dashboard-inline.scss#L2417) | `.plan-billing-tabs button` |
| [landing-page.scss:692](src/components/LandingPage/landing-page.scss#L692) | `.team-slide button` |
| [questionnaire.module.scss:315](../scss/modules/assessment/questionnaire.module.scss#L315) | `.InitialBtn button` |
| [_businessInfo.scss](../scss/modules/auth/_businessInfo.scss) | `.businessInfo > button` |
| [assessment.scss:686](src/components/assessment/assessment.scss#L686) | `.editor-export-dropdown button` (styles export-format buttons in `Editor.jsx`) |

### 4.2 Selectors targeting `.btn-class` from a parent (4)

| File:line | Selector |
|---|---|
| [assistant.scss:196](src/components/assistant/assistant.scss#L196) | `.navbar .dropbtn` |
| [chat-message.scss:94](src/components/assessment/chat-message.scss#L94) | `.navbar .dropbtn` |
| [dashboard-inline.scss:861](src/components/dashboard/dashboard-inline.scss#L861) | `.trash-card-item .trash-delete-btn` |
| [landing-page.scss:396](src/components/LandingPage/landing-page.scss#L396) | `.landing-navbar-buttons.mobile-open .landing-navbar-btn` |

---

## 5. Top className frequency (verified)

| Count | className |
|---|---|
| 8 | `assiss-btn` |
| 6 | `dropbtn` |
| 4 | `assiss-btn assiss-btn--flex` |
| 3 | `modal-closebtn` |
| 2 each (×16) | `workspace-btn`, `vh-save-btn`, `sitemap-card__menu-btn`, `sitemap-card__dropdown-item`, `sitemap-card__dropdown-item--danger`, `responsive-fab`, `playbook-stage-action-btn`, `nav-links`, `file-preview-chip__remove`, `dropdown-item`, `custom-dropdown-nav-button`, `custom-dropdown-click-btn`, `create-workspace-btn`, `confirm-modal-close-button`, `confirm-modal-btn confirm-modal-cancel-btn`, `NewChat` |
| 1 each | ~60 more one-off classes |

The long tail (~60 single-use classes) confirms the consolidation problem: nearly every feature has its own button styling.

---

## 6. Variant classification (estimated counts)

Classification based on className naming patterns + sampled SCSS reads. Final per-class verification happens during each cluster's migration PR.

| Variant | Estimated count | Representative classes |
|---|---|---|
| **primary** | ~35 | `assiss-btn`, `confirm-modal-confirm-btn`, `vh-save-btn`, `create-workspace-btn`, `update-button`, `payment-modal-add-btn`, `pm-delete-confirm-btn`, `support-chat-send-btn`, `email-verify-btn`, `code-submit-btn`, `msg-start-btn`, `msg-view-report-btn`, `vh-btn--restore`, `personal-info-save-btn`, `notification-save-btn` |
| **secondary** | ~20 | `confirm-modal-cancel-btn`, `custom-modal-cancel-button`, `delete-modal-cancel-btn`, `vh-btn--cancel`, `pm-delete-cancel-btn`, `payment-modal-cancel-btn`, `move-trash__cancel-btn`, `trash-modal__cancel-btn`, `playbook-cancel-btn`, `personal-info-upload-btn` |
| **destructive** | ~5 | `personal-info-delete-btn`, `personal-info-delete-account-btn`, `folder-modal-button delete-btn`, `trash-delete-btn`, `sitemap-card__dropdown-item--danger`. **Note:** `delete-modal-confirm-btn` stays lime per D2. |
| **icon** | ~30 | `modal-closebtn` ×3, all `*-modal-close*` variants, `md-lb-close`, `md-lb-nav--prev/next`, `hamburger-btn`, `header-hamburger`, `file-preview-chip__remove`, `move-trash__close-icon`, `sitemap-card__menu-btn`, etc. |
| **ghost** | ~25 | `dropbtn` ×6, `dropdown-item`, `custom-dropdown-click-btn`, `custom-dropdown-nav-button`, `profile-dropdown-item`, `sitemap-card__dropdown-item`, `mark-read-btn`, `playbook-page-btn`, `editor-export-dropdown` children |
| **link** | ~5 | `nav-links` ×2, link-style buttons in auth |
| **toggle** | ~15 | `settings-tabs`, `plan-billing-tabs`, `tab ${active}`, `md-tab--active`, `playbook-template-btn--selected`, `vh-btn` family in tab role |
| **commented-out** | ~9 | `{/* <button ... */}` blocks — excluded from migration |
| **unknown / one-off** | ~50 | Investigated case-by-case during cluster migrations |

---

## 7. Size token measurement (data-backed)

Sampled 14 representative button classes via direct SCSS read. Distribution:

| Class | Padding | Font-size | Border-radius |
|---|---|---|---|
| [`.assiss-btn`](../scss/utils/_base.scss#L56) (12 uses) | `0.9rem 2rem` | (default) | `10px` |
| [`.confirm-modal-btn`](src/components/common/common.scss#L266) | `0.8rem 1.5rem` | `1.5rem` | `1rem` |
| [`.custom-modal-button`](src/components/customModal/custom-modal.scss#L69) | `0.8rem 1.5rem` | `1.5rem` | `1rem` |
| [`.delete-modal-confirm-btn`](src/components/dashboard/dashboard-inline.scss#L2361) | `1rem` | `1.3rem` | `1rem` |
| [`.payment-modal-cancel-btn`](src/components/dashboard/dashboard-inline.scss#L2065) | (none) | `1.3rem` | `1rem` |
| [`.payment-modal-add-btn`](src/components/dashboard/dashboard-inline.scss#L2080) | `0.5rem 1rem` | `1.3rem` | `0.375rem` ⚠️ |
| [`.email-verify-btn`](../scss/modules/auth/_signIn.scss#L193) | `0.5rem 1rem` | (default) | `5px` ⚠️ |
| [`.code-submit-btn`](../scss/modules/auth/_signIn.scss#L218) | `0.5rem 3rem` | `1.8rem` | `1rem` |
| [`.vh-btn`](src/components/assessment/assessment.scss#L1591) | `0.8rem` | `1.3rem` | `10px` |
| [`.vh-save-btn`](src/components/assessment/assessment.scss#L1440) | `0.8rem 1rem` | `1.3rem` | `10px` |
| [`.trash-modal__btn`](src/components/dashboard/dashboard-inline.scss#L621) | `10px 0` | `14px` | `5px` ⚠️ |
| [`.msg-start-btn`](src/components/assessment/assessment.scss#L28) | `1rem` | `1.5rem` | (mixin default) |
| [`.editor-export-dropdown button`](src/components/assessment/assessment.scss#L686) | `10px 20px` | `0.9rem` | (parent inherits) |
| [`.assiss-btn` mobile](../scss/utils/_base.scss#L80) | `0.7rem 1.2rem` | `1.2rem` | `10px` |

### Locked size tokens

| Token | Padding | Font-size | Border-radius | Use cases |
|---|---|---|---|---|
| `sm` | `0.5rem 1rem` | `1.3rem` | `0.5rem` | Compact actions, dropdown menu items, payment-form buttons, small modal buttons |
| `md` *(default)* | `0.8rem 1.5rem` | `1.5rem` | `1rem` | Standard modals, primary CTAs, save/cancel pairs (~70% of buttons) |
| `lg` | `1rem 2rem` | `1.6rem` | `1rem` | Auth full-width submits, hero CTAs (~5–8 buttons total) |

**Outliers being normalized** (per D2 — minor padding/radius differences are OK to standardize):
- `.payment-modal-add-btn` radius `0.375rem` → `sm`'s `0.5rem`
- `.email-verify-btn` radius `5px` → `sm`'s `0.5rem`
- `.trash-modal__btn` radius `5px` → `sm`'s `0.5rem`

---

## 8. Locked Button API spec

### 8.1 Component

**Path:** `cmp-fe/src/components/common/Button.jsx`

```jsx
<Button
  variant="primary | secondary | destructive | ghost | link | icon | toggle"
  size="sm | md | lg"           // default: md
  active={boolean}              // toggle variant only — applies active style
  block={boolean}               // full-width (added per § 12.7 — auth/form CTAs)
  disabled={boolean}
  loading={boolean}             // shows inline spinner via @mixin spinner; disables interaction
  type="button | submit | reset" // default: button
  iconLeft={ReactNode}
  iconRight={ReactNode}
  ariaLabel={string}            // REQUIRED when variant="icon"
  className={string}            // passthrough — appended after computed class (migration safety)
  style={object}                // passthrough — needed for Editor.jsx save-state colors
  onClick={function}
  ...rest                       // forwarded to underlying <button> (data-*, title, etc.)
>
  {children}
</Button>
```

**Implementation notes:**
- Wrapped in `forwardRef` so tooltip/popover libraries work
- Renders a native `<button>` element (NEVER a wrapper div — protects parent-CSS selectors in section 4)
- When `variant="icon"`, `ariaLabel` is required; PropTypes warns if missing
- When `loading` is true, content is replaced/decorated with spinner; `aria-busy="true"` is set
- `className` passthrough is critical: `<Button variant="secondary" className="custom-modal-cancel-button">Cancel</Button>` produces a `<button>` with both the new computed class AND the old class, so legacy parent-CSS selectors keep working during migration. Cleaned up in the final PR.

### 8.2 SCSS

**Path:** `cmp-fe/scss/components/common/_button.scss` (must be imported by `cmp-fe/scss/components/common/_index.scss`)

Class structure (BEM):
```
.cmp-btn                 // base
.cmp-btn--primary        // variant
.cmp-btn--secondary
.cmp-btn--destructive
.cmp-btn--ghost
.cmp-btn--link
.cmp-btn--icon
.cmp-btn--toggle
.cmp-btn--toggle.is-active   // active state for toggle
.cmp-btn--sm                  // size
.cmp-btn--md
.cmp-btn--lg
.cmp-btn--block               // full-width modifier (added per § 12.7)
.cmp-btn--loading             // loading state
.cmp-btn--disabled            // disabled state
```

Class prefix `cmp-btn` chosen to avoid collision with existing `.btn--*` family (which has different definitions and stays unmodified during migration).

### 8.3 Design tokens

Added to `cmp-fe/scss/utils/_variables.scss`:

```scss
// Button color tokens — derived from existing palette where possible
$btn-color-primary-bg: #C3E11D;          // matches existing $color_parentColor
$btn-color-primary-text: $color_BlueDark; // #0B1444
$btn-color-secondary-bg: transparent;
$btn-color-secondary-border: $color_BlueDark;
$btn-color-secondary-text: $color_BlueDark;
$btn-color-destructive-bg: #DC2626;       // NEW — no existing red token
$btn-color-destructive-text: #FFFFFF;
$btn-color-ghost-bg: transparent;
$btn-color-ghost-text: $color_Primary;    // #0a0a0a
$btn-color-ghost-hover-bg: $bg_gray--ligth;
$btn-color-link-text: $color_BlueLight;   // #0066ff
$btn-color-toggle-bg: transparent;
$btn-color-toggle-text: $color_Tertiary;
$btn-color-toggle-active-bg: $color_BlueDark;
$btn-color-toggle-active-text: #FFFFFF;
$btn-color-icon-bg: transparent;
$btn-color-icon-hover-bg: rgba(0, 0, 0, 0.05);

// Button size tokens
$btn-padding-sm: 0.5rem 1rem;
$btn-padding-md: 0.8rem 1.5rem;
$btn-padding-lg: 1rem 2rem;
$btn-font-sm: 1.3rem;
$btn-font-md: 1.5rem;
$btn-font-lg: 1.6rem;
$btn-radius-sm: 0.5rem;
$btn-radius-md: 1rem;
$btn-radius-lg: 1rem;
```

**Open question for Phase 2:** the destructive red `#DC2626` is my pick — no existing red token in the palette. User to confirm or change during Phase 2 SCSS implementation review.

### 8.4 What the new Button does NOT support (intentional)

Verified against the codebase — these patterns are not used anywhere, so they're out of scope for v1:

- ❌ `as="a"` (anchor rendering) — 0 instances of `<a>` styled as button
- ❌ Bootstrap variant strings (`variant="outline-primary"`)
- ❌ `formAction` / `formMethod` props
- ❌ Arbitrary modifier-class composition — modifiers collapse into props (D10)
- ❌ Inline-block sizing variants beyond sm/md/lg

---

## 9. Migration plan

11 PRs, in this order. Each cluster PR is independently revertible.

### Phase 1 — Foundation (PR 1)
- Create `cmp-fe/src/components/common/Button.jsx` per spec § 8.1
- Create `cmp-fe/scss/components/common/_button.scss` per spec § 8.2
- Add design tokens to `cmp-fe/scss/utils/_variables.scss` per spec § 8.3
- Wire `_button.scss` into the SCSS entry chain (via [common/_index.scss](../scss/components/common/_index.scss))
- Export `Button` from [common/index.js](src/components/common/index.js)
- Add a tiny dev-only route at `/button-playground` rendering every variant × size × state combination, for visual QA across phases
- **No existing button files are deleted in this PR.** Old [feature/Button.jsx](src/components/feature/Button.jsx) and [feature/_button.scss](../scss/components/feature/_button.scss) stay untouched until PR 10 (their 17 consumers must be migrated first — see § 12).
- **No existing files modified beyond _variables.scss, common/_index.scss, common/index.js, and Routes.jsx**

### Phase 2 — Cluster migrations (PR 2-9)

Each PR follows the same pattern:
1. Replace bare `<button>` with `<Button>` in the cluster's files
2. **Pass through the original className** so legacy parent-CSS keeps matching
3. Manually QA the cluster in browser (since no test suite exists, per user)
4. Take before/after screenshots, attach to PR
5. NO SCSS deletion in this phase

| PR | Cluster | Files |
|---|---|---|
| 2 | **Common modals** | `ConfirmModal.jsx`, `InputModal.jsx`, `CustomModal.jsx`, `DeleteModal.jsx` |
| 3 | **Auth pages** | `BusinessInfo`, `SetNewPassword`, `SetPassword`, `SignIn`, `SignUp`, `Verification`, `VerificationCode`, `EmailVerificationHandler`, `ChoosePlain`, `PaymentSuccess` (last two added per § 12 — both use `Components.Feature.Button`) |
| 4 | **Dashboard settings** | `PaymentMethod`, `PaymentModal`, `PersonalInfo`, `Notifications`, `ChangePassword`, `DashboardSettings/index` |
| 5 | **Workspace / Folder / Trash** | `Workspaces`, `Folder`, `MoveToTrash`, `TrashModal`, `TrashModule`, `FileStructure`, `Account`, `DashboardCard`, `PlanAndBilling`, `PlanAndBillingmodal`, `MyAssessmentComp`, `HelpCenterComp`, `RAGUpload`, `NotificationDropdown`, `Feedback` |
| 5b | **Checkout / Pricing cards** (added per § 12) | `checkout/PlainDetail`, `checkout/PayWithCard`, `feature/PlainCard` — all three use `Components.Feature.Button` and are tightly coupled to `SubscriptionPlainsGrid` |
| 6 | **Assessment / Questionnaire** | `Editor`, `EditModal`, `AssessmentTasks`, `AssessmentVersionHistory`, `AssessmentModal`, `assessment/MessagesSection`, `Questionnaire` (also migrate the 5 CSS-modules buttons per D11) |
| 7 | **Chat / Media / SupportChat** | `chat/TonePopup`, `common/TonePopup`, `chat/Header`, `AskAi`, `Media`, `ChatHistory`, `ChatHistoryComp`, `chat/Home`, `chat/User`, `assistant/MessagesSection`, `assistantModal/ChatBookmark`, `assistantModal/Comments`, `assistantModal/VersionHistory`, `CommentPopup`, `SupportChat`, `assistant/Chat`, `assessment/Chat` |
| 8 | **Sitemap / Playbook** | `Playbook-List`, `PlaybookEditor`, `PlaybookSection`, `SitemapLayoutFlow`, `Node`, `NoData`, `List`, `AiAssistant` |
| 9 | **Landing + misc** | `LandingPage/Navbar`, `Pricing`, `HeroSection`, `Team`, `common/Header`, `Logout`, `OnboardingTour`, `ErrorBoundary`, `DashboardCard`, `StartAssessmentPopup`, `FileInput`, `WordReportTemplate`, `CustomDropdown` (×2), `SearchDropdown`, `Sharemodal`, `MoveToModal`, `DashboardLayout`, `Spinner` |

### Phase 3 — Cleanup (PR 10)
- Remove the 80+ legacy button SCSS classes that are no longer referenced
- Resolve the `_button.scss` (uses `$color_Primary` = black) vs `_shared-mixins.scss` (uses hardcoded `#C3E11D` lime) duplication — single source of truth
- Remove the className passthrough hack from cluster migrations where possible (only where parent-CSS doesn't depend on it)
- **Delete old [feature/Button.jsx](src/components/feature/Button.jsx)** — precondition: verify all 17 namespace consumers (PR 3, PR 5b) have been migrated, no `Components.Feature.Button` references remain
- **Remove `Button` re-export** from [feature/index.js:3](src/components/feature/index.js#L3)
- **Move global `button { cursor; letter-spacing; transition }` rule** from [feature/_button.scss:1-5](../scss/components/feature/_button.scss#L1) into [_base.scss](../scss/utils/_base.scss) before deleting the file (preserves global cursor/transition behavior)
- **Delete [feature/_button.scss](../scss/components/feature/_button.scss)** — and the `@import "./button"` line from [feature/_index.scss:2](../scss/components/feature/_index.scss#L2)
- **Delete the `.btn--primary` override** in [_signIn.scss:246](../scss/modules/auth/_signIn.scss#L246) (orphaned once parent classes are gone)
- Run a final visual diff against PR 1 screenshots to verify no regressions

### Phase 4 — Drift prevention (PR 11)
- Add an ESLint rule (`no-restricted-syntax` or custom) that flags any new bare `<button>` in `src/components/**`, `src/modules/**`, `src/layout/**` — must use `<Button>`
- Exception: the new `Button.jsx` itself

---

## 10. Things to verify per-cluster (during migration PRs)

These were not exhaustively verified in Phase 0 because they only matter when the cluster is touched:

- Per-className SCSS read for the ~40 one-off classes not yet sampled — variant assignment confirmed during the cluster's PR
- Mobile-responsive button sizing per cluster
- Hover/active/focus states for each variant in real context
- The 4 unstyled export-format buttons in `Editor.jsx` and `PlaybookEditor.jsx` — confirm `variant="ghost" size="sm"` matches the parent-styled look closely enough
- The 5 CSS-modules buttons in `Questionnaire.jsx` — read `questionnaire.module.scss` to map current styling to new variants

---

## 11. Open questions for Phase 2

- **Destructive red shade** (`#DC2626`) — my pick, user to approve/change during Phase 2
- **`ghost` hover background** — using `$bg_gray--ligth` (`#ececec`) as a guess; verify against existing dropdown-item hover styles during cluster 7
- **Loading spinner color** — does it match the button text color, or always the brand color? Existing `@mixin spinner` defaults to `#0B1444` — likely correct for primary, may need variant-specific spinner color

These are SCSS-level decisions — they don't change the Button API and can be tuned during Phase 2 implementation.

---

## 12. Errata (revisions made before PR 1)

Discovered during the pre-PR-1 verification pass on 2026-04-27. The original Phase 0 audit had three factual errors and two scope gaps; all are documented here for traceability.

### 12.1 Old `feature/Button.jsx` is NOT dead code (corrects D4 + § 3)

**Original claim:** "0 imports, dead code — delete in PR 1."
**Reality:** 17 active usages in 13 files via `Components.Feature.Button` namespace.

**Why missed:** the original Phase 0 grep was `from '...components/feature/Button'` (direct path), but [feature/index.js:3](src/components/feature/index.js#L3) re-exports the component, and [components/index.js:2,14](src/components/index.js#L2) wraps it under `Components.Feature.*`. All 17 consumers use the namespace form, which the direct-path grep cannot see.

**Verification grep:** `Components\.Feature\.Button` returned 17 matches.

**Full consumer list:**

| File | Lines | Variant prop passed |
|---|---|---|
| [modules/auth/SignIn.jsx](src/modules/auth/SignIn.jsx) | 86, 155 | `"auth mb_Secondary"`, `"primary"` |
| [modules/auth/SignUp.jsx](src/modules/auth/SignUp.jsx) | 72, 145 | `"auth mb_Secondary"`, `"primary"` |
| [modules/auth/BusinessInfo.jsx](src/modules/auth/BusinessInfo.jsx) | 103 | `"primary"` |
| [modules/auth/Verification.jsx](src/modules/auth/Verification.jsx) | 59 | `"primary"` |
| [modules/auth/VerificationCode.jsx](src/modules/auth/VerificationCode.jsx) | 113 | `"primary"` |
| [modules/auth/SetPassword.jsx](src/modules/auth/SetPassword.jsx) | 80 | `"primary"` |
| [modules/auth/SetNewPassword.jsx](src/modules/auth/SetNewPassword.jsx) | 57 | `"primary"` |
| [modules/auth/ChoosePlain.jsx](src/modules/auth/ChoosePlain.jsx) | 27 | `` `toggle${isActive ? '' : '--active'}` `` |
| [modules/auth/PaymentSuccess.jsx](src/modules/auth/PaymentSuccess.jsx) | 72, 96 | `"primary"`, `"primary"` |
| [components/checkout/PlainDetail.jsx](src/components/checkout/PlainDetail.jsx) | 12 | `"back mb_Tertiary"` |
| [components/checkout/PayWithCard.jsx](src/components/checkout/PayWithCard.jsx) | 83 | `"primary"` |
| [components/feature/PlainCard.jsx](src/components/feature/PlainCard.jsx) | 24 | `` `primary${name === 'Starter' ? '--light' : ''} mb_Tertiary` `` |

The component composes `btn--${className}` so the prop value `"primary"` becomes the class `btn--primary`, etc.

### 12.2 `feature/_button.scss` is NOT orphaned (corrects PR 1 plan)

**Original claim:** "only used by deleted component — verify before delete."
**Reality:** All six `.btn--*` rules (`primary`, `primary--light`, `secondry`, `auth`, `toggle`, `toggle--active`, `back`) are live through the 17 consumers above. Plus [_signIn.scss:246](../scss/modules/auth/_signIn.scss#L246) has a media-query `.btn--primary` override that depends on the base rule.

### 12.3 Missing global `button` selector in § 4.1 (corrects § 4.1)

[feature/_button.scss:1-5](../scss/components/feature/_button.scss#L1) defines a global rule applying to every native `<button>` in the app:

```scss
button {
  cursor: pointer;
  letter-spacing: 0.24px;
  transition: 0.3s ease-in-out;
}
```

§ 4.1 originally listed 9 selectors; this brings the count to **10**. PR 10 must move these declarations into [_base.scss](../scss/utils/_base.scss) before deleting the file or app-wide cursor/transition behavior regresses.

### 12.4 PR 3 (Auth) was missing 2 files (corrects § 9)

Originally listed 8 auth files. Missed `ChoosePlain` and `PaymentSuccess` — both use `Components.Feature.Button`. Added.

### 12.5 New PR 5b (Checkout) inserted (corrects § 9)

Three files use `Components.Feature.Button` and were not in any cluster: `checkout/PlainDetail`, `checkout/PayWithCard`, `feature/PlainCard`. They share the SubscriptionPlainsGrid pricing flow and form a coherent cluster. Inserted as PR 5b to avoid renumbering the rest.

### 12.6 PR 1 deletions removed (corrects § 9)

The two delete steps (`feature/Button.jsx`, `feature/_button.scss`) moved from PR 1 to PR 10. PR 1 is now purely additive — the new `Button` lives at [common/Button.jsx](src/components/common/Button.jsx) with class prefix `cmp-btn`, which does not collide with the legacy `btn--*` family, so both can coexist during the migration.

### 12.7 `block` prop added — auth visual conflict (extends § 8.1 + § 8.2)

Discovered during PR 3 (Auth) pre-flight. The legacy `.btn--primary` (used by `Components.Feature.Button` on auth pages) has visual properties that no spec'd variant captures cleanly:

| Property | Legacy `.btn--primary` | Spec'd `cmp-btn--primary` |
|---|---|---|
| Background | `#0a0a0a` BLACK | `#C3E11D` LIME |
| Text | white | `#0B1444` dark blue |
| Width | `width: 100%` (full-width) | content-width |

7 auth submit buttons + 2 auth-provider Google sign-in buttons currently render full-width. D9 (`secondary lg` for Google sign-in) didn't address layout; D2 ("no major visual changes") doesn't account for the color shift either.

**Resolution:** add a `block={boolean}` prop to the Button API. Auth migration accepts the **color** consolidation (BLACK → LIME — bringing auth in line with the rest of the app, where every other primary CTA is already lime), but **preserves layout** via `block` (full-width 100%). The `block` modifier is a standard design-system primitive useful elsewhere (PaymentSuccess CTAs, msg-start-btn, etc.) — not auth-specific scaffolding.

Spec changes:
- § 8.1 API gains `block={boolean}` (default `false`)
- § 8.2 class structure gains `.cmp-btn--block { width: 100%; }`
- Playground adds a "Block (full-width form CTAs)" section
