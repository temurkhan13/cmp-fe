# Inline `<style>` vs External SCSS/CSS — Duplicate className Audit

Audit date: 2026-04-23
Scope: `cmp-fe/` (excluding `node_modules/`, `dist/`)

## Objective

Identify className selectors that are defined in **both** an inline `<style>` block of a JSX component **and** an external `.scss` / `.css` file in the project, and determine whether the actual CSS rule bodies are equivalent (redundant) or merely share a name (false positive).

## Methodology

1. **JSX inventory.** Starting from all `.jsx` files under `cmp-fe/`, identified 51 files that contain at least one `<style>` tag.
2. **External stylesheet inventory.** Walked the project tree (excluding `node_modules/`, `dist/`) and collected 65 `.scss` / `.css` files.
3. **Class extraction.** For each JSX file, parsed the content of every `<style>...</style>` block. When a block rendered a template-literal variable (e.g. `<style>{mediaStyles}</style>` referencing `const mediaStyles = ` ... ` `), followed the reference to include the real CSS. Extracted class selectors via the regex `\.[A-Za-z_][A-Za-z0-9_-]*`, then stripped the leading dot and de-duplicated. For external stylesheets, applied the same extraction.
4. **Strict exact-name intersection.** For each JSX file, the set of inline classes was intersected with the set of external classes. Only byte-equal string matches counted as duplicates.
5. **Rule-body comparison.** For each duplicate, parsed the class's rule body on both sides using a brace-aware parser. "Own declarations" were captured (top-level property/value pairs only — properties inside nested `{...}` selectors were excluded). Property sets were compared, and each pair was classified:
   - **IDENTICAL** — same property names and same values on both sides.
   - **SUPERSET/SUBSET** — all common properties have matching values; one side has extra properties, no conflicts.
   - **OVERLAP** — common properties exist but at least one property's value differs.
   - **DIFFERENT** — zero overlapping properties (name collision only, not duplicate styling).

When a class appeared in multiple external sheets, the strongest verdict across them was recorded.

## Summary

| Metric | Value |
|---|---|
| JSX files scanned | 51 |
| External `.scss` / `.css` files scanned | 65 |
| Unique class selectors indexed externally | 951 |
| JSX files with at least one exact-name duplicate | 33 |
| Total duplicate occurrences (by className) | 100 |

### Style-body verdicts (best per class)

| Verdict | Count | Meaning |
|---|---|---|
| IDENTICAL | 13 | Inline rule is fully redundant |
| SUPERSET/SUBSET | 24 | Common props match; one side has extras — safe to consolidate |
| OVERLAP | 44 | Common props exist but some values differ — manual merge required |
| DIFFERENT | 19 | Same name, zero overlapping properties — **not a real duplicate** |

**~37 of 100 matches are safe deduplication candidates (IDENTICAL + SUPERSET/SUBSET). 19 are false positives.**

## IDENTICAL matches (13)

Inline rule body matches the external rule byte-for-byte. Delete the inline rule; the external one already covers it.

| JSX file | className | External source |
|---|---|---|
| `src/components/dashboard/dashboardHomeComponents/Workspaces.jsx` | `dropdown-menuu` | `src/modules/dashboard/ai-assistant.scss` |
| `src/components/dashboard/dashboardHomeComponents/Workspaces.jsx` | `dropdown-itemm` | `src/modules/dashboard/ai-assistant.scss` |
| `src/components/dashboard/MyAssessmentComp.jsx` | `workspace-badge` | `scss/components/common/_header.scss` |
| `src/components/dashboard/MyAssessmentComp.jsx` | `section` | `src/components/dashboard/dashboardHomeComponents/styles/dashboard-home.scss` |
| `src/components/dashboard/MyAssessmentComp.jsx` | `dropdown-menuu` | `src/modules/dashboard/ai-assistant.scss` |
| `src/components/dashboard/MyAssessmentComp.jsx` | `dropdown-itemm` | `src/modules/dashboard/ai-assistant.scss` |
| `src/components/dashboard/MyAssessmentComp.jsx` | `icon-container` | `src/modules/dashboard/ai-assistant.scss` |
| `src/components/assistant/MessagesSection.jsx` | `message-action-icons` | `src/components/assessment/assessment.scss` |
| `src/components/assistant/MessagesSection.jsx` | `message-icon-wrapper` | `src/components/assessment/assessment.scss` |
| `src/components/assistant/MessagesSection.jsx` | `tooltip-assessment` | `src/components/assessment/assessment.scss` |
| `src/components/dashboard/TrashAssessment.jsx` | `three-dots` | `src/components/dashboard/dashboard-inline.scss` |
| `src/components/dashboard/dashboardHomeComponents/index.jsx` | `selected-workspace-name` | `scss/components/common/_header.scss` |
| `src/components/dashboard/dashboardHomeComponents/index.jsx` | `workspace-badge` | `scss/components/common/_header.scss` |

## Per-file breakdown (best verdict per class)

Counts: `I` = IDENTICAL, `SUB` = SUPERSET/SUBSET, `OVL` = OVERLAP, `DIFF` = DIFFERENT.

### `src/components/dashboard/dashboardHomeComponents/Workspaces.jsx` — 10 dup classes (I:2 SUB:5 OVL:3 DIFF:0)
- `dropdown-menuu` → IDENTICAL
- `dropdown-itemm` → IDENTICAL
- `icon-container` → SUPERSET/SUBSET
- `modal-wrapper` → SUPERSET/SUBSET
- `modal-heading` → SUPERSET/SUBSET
- `modal-closebtn` → SUPERSET/SUBSET
- `workspace-input` → SUPERSET/SUBSET
- `workspace-btn` → OVERLAP
- `workspace-description` → OVERLAP
- `create-workspace-btn` → OVERLAP

### `src/components/dashboard/MyAssessmentComp.jsx` — 9 dup classes (I:5 SUB:1 OVL:3 DIFF:0)
- `workspace-badge` → IDENTICAL
- `section` → IDENTICAL
- `dropdown-menuu` → IDENTICAL
- `dropdown-itemm` → IDENTICAL
- `icon-container` → IDENTICAL
- `fileDetails` → SUPERSET/SUBSET
- `selected-workspace-name` → OVERLAP
- `grid` → OVERLAP
- `footer` → OVERLAP

### `src/components/assistant/MessagesSection.jsx` — 7 dup classes (I:3 SUB:3 OVL:0 DIFF:1)
- `message-action-icons` → IDENTICAL
- `message-icon-wrapper` → IDENTICAL
- `tooltip-assessment` → IDENTICAL
- `msg` → SUPERSET/SUBSET
- `chat-message` → SUPERSET/SUBSET
- `ai-card` → SUPERSET/SUBSET
- `user-card` → DIFFERENT

### `src/components/dashboard/NotificationDropdown.jsx` — 6 dup classes (I:0 SUB:1 OVL:5 DIFF:0)
- `tabs` → SUPERSET/SUBSET
- `dropdown` → OVERLAP
- `open` → OVERLAP
- `header` → OVERLAP
- `tooltip` → OVERLAP
- `tab` → OVERLAP

### `src/components/assessment/AssessmentComponent/AssessmentComments.jsx` — 6 dup classes (I:0 SUB:1 OVL:3 DIFF:2)
- `send-icon` → SUPERSET/SUBSET
- `dropdown` → OVERLAP
- `dropdown-item` → OVERLAP
- `dropdown-menu` → OVERLAP
- `avatar` → DIFFERENT
- `filter-input` → DIFFERENT

### `src/components/dashboard/TrashAssistant.jsx` — 4 dup classes (I:0 SUB:1 OVL:3 DIFF:0)
- `dropdown-item` → SUPERSET/SUBSET
- `trash-card` → OVERLAP
- `three-dots` → OVERLAP
- `dropdown-menu` → OVERLAP

### `src/components/dashboard/TrashAssessment.jsx` — 4 dup classes (I:1 SUB:1 OVL:2 DIFF:0)
- `three-dots` → IDENTICAL
- `dropdown-item` → SUPERSET/SUBSET
- `trash-card` → OVERLAP
- `dropdown-menu` → OVERLAP

### `src/components/dashboard/TrashFolderTab.jsx` — 4 dup classes (I:0 SUB:2 OVL:2 DIFF:0)
- `three-dots` → SUPERSET/SUBSET
- `dropdown-item` → SUPERSET/SUBSET
- `folder-card` → OVERLAP
- `dropdown-menu` → OVERLAP

### `src/components/assessment/AssessmentComponent/AssessmentBookMark.jsx` — 4 dup classes (I:0 SUB:2 OVL:0 DIFF:2)
- `date` → SUPERSET/SUBSET
- `header` → SUPERSET/SUBSET
- `avatar` → DIFFERENT
- `content` → DIFFERENT

### `src/components/dashboard/DashboardSettings/PaymentModal.jsx` — 3 dup classes (I:0 SUB:0 OVL:2 DIFF:1)
- `modal-content` → OVERLAP
- `error` → OVERLAP
- `modal-overlay` → DIFFERENT

### `src/components/common/Modal.jsx` — 3 dup classes (I:0 SUB:1 OVL:1 DIFF:1)
- `modal-content` → SUPERSET/SUBSET
- `close-icon` → OVERLAP
- `modal-overlay` → DIFFERENT

### `src/components/dashboard/TrashWorkspaceTab.jsx` — 3 dup classes (I:0 SUB:1 OVL:1 DIFF:1)
- `dropdown` → SUPERSET/SUBSET
- `dropdown-menu` → OVERLAP
- `workspace-description` → DIFFERENT

### `src/components/dashboard/UnreadNotifications.jsx` — 3 dup classes (I:0 SUB:1 OVL:1 DIFF:1)
- `notification-item` → SUPERSET/SUBSET
- `avatar` → OVERLAP
- `notification-list` → DIFFERENT

### `src/components/dashboard/RequestsNotifications.jsx` — 3 dup classes (I:0 SUB:1 OVL:1 DIFF:1)
- `notification-item` → SUPERSET/SUBSET
- `avatar` → OVERLAP
- `notification-list` → DIFFERENT

### `src/components/dashboard/AssistantBar.jsx` — 3 dup classes (I:0 SUB:1 OVL:1 DIFF:1)
- `container` → SUPERSET/SUBSET
- `assistant-heading` → OVERLAP
- `generate` → DIFFERENT

### `src/components/dashboard/dashboardHomeComponents/index.jsx` — 2 dup classes (I:2 SUB:0 OVL:0 DIFF:0)
- `selected-workspace-name` → IDENTICAL
- `workspace-badge` → IDENTICAL

### `src/components/dashboard/DashboardSettings/PersonalInfo.jsx` — 2 dup classes (I:0 SUB:0 OVL:2 DIFF:0)
- `avatar` → OVERLAP
- `error` → OVERLAP

### `src/components/assistant/assistantModal/VersionHistory.jsx` — 2 dup classes (I:0 SUB:0 OVL:2 DIFF:0)
- `date` → OVERLAP
- `icon` → OVERLAP

### `src/components/assessment/AssessmentComponent/AssessmentModal.jsx` — 2 dup classes (I:0 SUB:0 OVL:1 DIFF:1)
- `closeButton` → OVERLAP
- `content` → DIFFERENT

### `src/components/LandingPage/components/ui/home/HeroSection.jsx` — 2 dup classes (I:0 SUB:1 OVL:1 DIFF:0)
- `content` → SUPERSET/SUBSET
- `container` → OVERLAP

### `src/components/dashboard/PlanAndBillingmodal.jsx` — 2 dup classes (I:0 SUB:0 OVL:2 DIFF:0)
- `modal-content` → OVERLAP
- `upgrade-button` → OVERLAP

### `src/components/dashboard/DeleteModal.jsx` — 2 dup classes (I:0 SUB:0 OVL:1 DIFF:1)
- `close-icon` → OVERLAP
- `modal-overlay` → DIFFERENT

### `src/components/common/Logout.jsx` — 2 dup classes (I:0 SUB:1 OVL:1 DIFF:0)
- `icon` → SUPERSET/SUBSET
- `dropdown-item` → OVERLAP

### `src/components/LandingPage/components/ui/home/Main.jsx` — 2 dup classes (I:0 SUB:0 OVL:1 DIFF:1)
- `card` → OVERLAP
- `image-container` → DIFFERENT

### `src/components/LandingPage/components/common/Navbar.jsx` — 2 dup classes (I:0 SUB:0 OVL:2 DIFF:0)
- `navbar` → OVERLAP
- `dropdown-menu` → OVERLAP

### `src/components/dashboard/dashboardHomeComponents/CountingCards.jsx` — 1 dup class (I:0 SUB:0 OVL:0 DIFF:1)
- `counts` → DIFFERENT

### `src/components/common/SideBarModal.jsx` — 1 dup class (I:0 SUB:0 OVL:0 DIFF:1)
- `modal-overlay` → DIFFERENT

### `src/components/common/NotificationBar.jsx` — 1 dup class (I:0 SUB:0 OVL:1 DIFF:0)
- `close-icon` → OVERLAP

### `src/components/dashboard/DashboardSettings/index.jsx` — 1 dup class (I:0 SUB:0 OVL:1 DIFF:0)
- `tabs` → OVERLAP

### `src/components/dashboard/DashboardSettings/Notifications.jsx` — 1 dup class (I:0 SUB:0 OVL:0 DIFF:1)
- `section` → DIFFERENT

### `src/components/common/index.jsx` — 1 dup class (I:0 SUB:0 OVL:0 DIFF:1)
- `modal-overlay` → DIFFERENT

### `src/components/common/NoDataAvailable.jsx` — 1 dup class (I:0 SUB:0 OVL:1 DIFF:0)
- `icon` → OVERLAP

### `src/components/LandingPage/components/feature/MainCard.jsx` — 1 dup class (I:0 SUB:0 OVL:0 DIFF:1)
- `card` → DIFFERENT

## Files with zero exact duplicates (18)

These JSX files contain inline `<style>` blocks whose class names do not collide with any external stylesheet class name. They may still duplicate *patterns* (e.g. modal layout) but under different class names.

- `src/components/dashboard/RAGUpload.jsx` (12 inline classes)
- `src/components/dashboard/DashboardSettings/PaymentMethod.jsx` (17)
- `src/components/common/PageHeader.jsx` (7)
- `src/components/assistant/assistantModal/Comments.jsx` (27)
- `src/components/assistant/assistantModal/Media.jsx` (26)
- `src/components/assistant/assistantModal/ChatBookmark.jsx` (16)
- `src/components/assistant/CommentPopup.jsx` (3)
- `src/components/assessment/AssessmentComponent/AssessmentTasks.jsx` (8)
- `src/components/assessment/AssessmentComponent/AssessmentMedia.jsx` (26)
- `src/components/LandingPage/components/ui/home/Pricing.jsx` (16)
- `src/components/LandingPage/components/ui/home/FAQs.jsx` (3)
- `src/components/assessment/AssessmentComponent/AssessmentVersionHistory.jsx` (26)
- `src/components/common/LoadingSpinner.jsx` (1)
- `src/components/common/Loader.jsx` (1)
- `src/components/LandingPage/components/ui/home/Team.jsx` (6)
- `src/components/LandingPage/components/ui/home/Features.jsx` (3)
- `src/components/LandingPage/components/feature/FeaturesCard.jsx` (3)
- `src/components/LandingPage/components/common/Footer.jsx` (11)

## Module classification of the 13 IDENTICAL duplicates

For each IDENTICAL duplicate, the table below shows every JSX file that consumes the class (not just the one with the inline `<style>`), the module each consumer belongs to, where the class is currently defined in scss/css, and the module of that scss file. This tells us whether a class is genuinely cross-module (needs a shared home) or purely intra-module (the inline rule is just redundant).

Module tags used: `common` = `src/components/common` or `scss/components/common`; `dashboard` = `src/components/dashboard` or `src/modules/dashboard`; `assistant` = `src/components/assistant`; `assessment` = `src/components/assessment`; `sitemap` = `src/components/sitemap`; `customModal` = `src/components/customModal`.

### Consumer map

| className | JSX consumers → modules | External scss → module | Cross-module? |
|---|---|---|---|
| `selected-workspace-name` | `common/Header.jsx` (common), `dashboardHomeComponents/index.jsx` (dashboard, inline), `MyAssessmentComp.jsx` (dashboard), `modules/dashboard/AiAssistant.jsx` (assistant), `sitemap/Playbook-List.jsx` (sitemap), `sitemap/List.jsx` (sitemap) | `scss/components/common/_header.scss` (common) + `scss/modules/sitemap/sitemap.module.scss` (sitemap) | Yes — already lives in common |
| `workspace-badge` | same 6 files as above | `_header.scss` (common) + `sitemap.module.scss` (sitemap) | Yes — already lives in common |
| `section` | `MyAssessmentComp.jsx` (dashboard, inline). Class name is generic — definition appears in dashboard scss only, so effective consumer scope = dashboard | `dashboard.module.scss` + `dashboard-home.scss` (dashboard) | No — same module |
| `three-dots` | `dashboardHomeComponents/Workspaces.jsx` (dashboard), `TrashSitemap.jsx` (dashboard), `TrashAssistant.jsx` (dashboard, inline), `TrashAssessment.jsx` (dashboard, inline), `TrashFolderTab.jsx` (dashboard) | `src/components/dashboard/dashboard-inline.scss` (dashboard) | No — same module |
| `dropdown-menuu` | `Workspaces.jsx` (dashboard, inline), `MyAssessmentComp.jsx` (dashboard, inline), `FileStructure.jsx` (dashboard) | `src/modules/dashboard/ai-assistant.scss` (filed under "assistant" but it's a dashboard scss) | No by usage — all dashboard; yes by naming (scss location is misleading) |
| `dropdown-itemm` | same 3 consumers as `dropdown-menuu` | same | same |
| `icon-container` | `Workspaces.jsx` (dashboard, inline), `MyAssessmentComp.jsx` (dashboard, inline), `customModal/MoveToModal.jsx` (customModal) | `ai-assistant.scss` | **Yes** — dashboard + customModal |
| `message-action-icons` | `assistant/MessagesSection.jsx` (assistant, inline), `assessment/MessagesSection.jsx` (assessment) | `src/components/assessment/chat-message.scss` + `assessment.scss` (both assessment) | **Yes** — assistant + assessment |
| `message-icon-wrapper` | same 2 consumers | same | **Yes** — assistant + assessment |
| `tooltip-assessment` | same 2 consumers | same | **Yes** — assistant + assessment (note: class name contains "assessment" but is also used from assistant) |

### Grouped by suggested fix

**Group A — Already in common, just delete inline (2 classes, 3 inline removals)**

Class already lives in a common scss; the inline block is pure redundancy.
- `selected-workspace-name` → inline in `dashboardHomeComponents/index.jsx`
- `workspace-badge` → inline in `dashboardHomeComponents/index.jsx` + `MyAssessmentComp.jsx`

No scss relocation needed. Just delete inline rules.

**Group B — Same-module dedup (2 classes, 4 inline removals)**

Class already lives in the consumer's module; inline block is pure redundancy.
- `section` → `dashboard-home.scss` already covers it; delete inline in `MyAssessmentComp.jsx`.
- `three-dots` → `dashboard-inline.scss` already covers it; delete inline in `TrashAssistant.jsx`, `TrashAssessment.jsx`, `TrashFolderTab.jsx`.

No scss relocation needed. Just delete inline rules.

**Group C — Dashboard classes living in a misleadingly-named scss file (3 classes, 5 inline removals)**

`dropdown-menuu`, `dropdown-itemm`, `icon-container` are defined in `src/modules/dashboard/ai-assistant.scss`, but:
- `dropdown-menuu` and `dropdown-itemm` are consumed only by dashboard components (`Workspaces`, `MyAssessmentComp`, `FileStructure`) — none of which is an "assistant" module.
- `icon-container` is consumed by dashboard and `customModal/MoveToModal.jsx`.

**Recommended home:** move these three rules out of `ai-assistant.scss` into a dashboard-shared file — either the existing `src/components/dashboard/dashboard-inline.scss` or a new `src/components/dashboard/dropdown.scss`. `icon-container` has a very generic name and is consumed from `customModal`, so it is a candidate to lift higher still — e.g., `scss/components/common/_icon.scss` or a utility file — but the minimum fix is to stop hiding it under `ai-assistant`.

Before relocating, confirm that every consumer file's entry-point imports the new home (or that the new file is imported from a globally-loaded scss index).

**Group D — Chat UI classes needed by both Assistant and Assessment (3 classes, 3 inline removals)**

`message-action-icons`, `message-icon-wrapper`, `tooltip-assessment` are defined in `src/components/assessment/chat-message.scss` and `assessment.scss` but consumed from both `assistant/MessagesSection.jsx` and `assessment/MessagesSection.jsx`. The `MessagesSection` component effectively exists twice (once per module), sharing the same CSS contract.

**Recommended home:** a shared chat-styles scss, e.g. `src/components/chat/chat-message.scss` (there is already a `src/components/chat/` folder). Options:
- (a) **Minimal move:** lift just these three classes from `assessment/chat-message.scss` into `src/components/chat/chat-message.scss`, and have both `MessagesSection.jsx` files import from there. This preserves the existing assessment bundle and only de-duplicates inline.
- (b) **Full chat module:** move all shared chat rules (`chat-message`, `msg`, `ai-card`, `user-card`, etc.) into the chat module. Larger scope — out of scope for this audit, but a reasonable follow-up.

Also: `tooltip-assessment` is misnamed once it becomes shared; consider renaming to `chat-tooltip` when relocating (coordinated rename across both consumer files).

### Summary — how many inline `<style>` rules can be removed without merging any SCSS

| Group | Classes | Inline rule deletions | SCSS work required |
|---|---|---|---|
| A — already in common | 2 | 3 | none |
| B — same module | 2 | 4 | none |
| C — dashboard classes under assistant.scss | 3 | 5 | relocate 3 rules to a dashboard-shared (or common) scss |
| D — cross-module chat UI | 3 | 3 | lift 3 rules into `components/chat/chat-message.scss` |
| **Total** | **10 of 13 IDENTICAL classes** | **15 inline rule deletions** | 2 small SCSS relocations |

(The 13 IDENTICAL rows in the previous table represent 13 inline rule deletions total. The 15-deletion count above is larger because several classes — `workspace-badge`, `three-dots`, `dropdown-menuu`, `dropdown-itemm` — are inline-duplicated in multiple JSX files.)

## Verification of the 4 groups (what's actually safe)

The fixes above were proposed without checking two critical preconditions:

1. **Does the external scss actually render on the page where the JSX consumer lives?** A rule can only cover an inline `<style>` if the stylesheet that defines it is loaded in the same bundle/page.
2. **Is the external rule's full selector path compatible with how the class is used in the JSX DOM?** My comparison script captured only the immediate selector and rule body, not the compiled nested path or surrounding media queries.

After reading the actual JSX files, scss sources, and import chains, each group needs correction.

### Global scss load chain

- `src/main.jsx` → `import '../scss/main.scss';`
- `scss/main.scss` → imports `./utils`, `./layout`, `./components/feature`, `./components/common` (among others).
- `scss/components/common/_index.scss` → `@import './header';`

**Therefore `_header.scss` IS globally loaded on every page.** All other scss files analysed here are loaded only via direct `import` in specific JSX files:

| scss file | Importers |
|---|---|
| `_header.scss` | global (main.scss chain) |
| `src/modules/dashboard/ai-assistant.scss` | `AiAssistant.jsx`, `sitemap/Playbook-List.jsx`, `sitemap/List.jsx` only |
| `src/components/dashboard/dashboard-inline.scss` | `TrashModal.jsx`, `FolderCard.jsx`, `PlanAndBilling.jsx`, `MoveToTrash.jsx`, `dashboard/Header.jsx`, `Account.jsx` |
| `src/components/assessment/chat-message.scss` | `assistant/MessagesSection.jsx`, `assessment/MessagesSection.jsx` |
| `src/components/assessment/assessment.scss` | many, including `assistant/MessagesSection.jsx`, `assessment/MessagesSection.jsx`, `modules/assistant/Chat.jsx`, `modules/assessment/Chat.jsx`, `modules/sitemap/Sitemap.jsx` |
| `src/components/dashboard/dashboardHomeComponents/styles/dashboard-home.scss` | `dashboardHomeComponents/index.jsx` only |

### Group A — `selected-workspace-name`, `workspace-badge`: PARTIALLY WRONG

Previous claim: "Just delete inline — class already lives in common."

**Findings after reading the files:**

- `_header.scss` is globally loaded — the external rules are always reachable. ✓
- In `_header.scss`, `.workspace-badge` is ONLY defined as a nested rule inside `.selected-workspace-name { ... }`, compiling to `.selected-workspace-name .workspace-badge`. Both inline styles write `.selected-workspace-name .workspace-badge { ... }` explicitly, so the compiled selectors match. ✓
- In `dashboardHomeComponents/index.jsx` the inline `<style>` contains two `@media` blocks that do **NOT exist in `_header.scss`**:
  - `@media (max-width: 1080px) { .selected-workspace-name { position: relative; top: 0; left: 0; padding: 0 2rem; } }` — no equivalent in `_header.scss`.
  - `@media (max-width: 600px) { .selected-workspace-name { padding: 0 1rem; } .selected-workspace-name p { font-size: 1.3rem; } .selected-workspace-name .workspace-badge { font-size: 1.1rem; } }` — `_header.scss` has `@media (max-width: $dashboard_tablet)` and `@media (max-width: $dashboard_mobile)` but with different rules (`.topbar .selected-workspace-name p` truncation; `display: none`).
- My script's "IDENTICAL" verdict compared only own-declarations of the base rule and ignored media-query contents (they are at a deeper brace depth).

**Corrected fix:**
- `MyAssessmentComp.jsx` — inline has only `.selected-workspace-name p` and `.selected-workspace-name .workspace-badge`, both of which match external exactly. ✅ Safe to delete these two rules.
- `dashboardHomeComponents/index.jsx` — the three base rules (`.selected-workspace-name`, `.selected-workspace-name p`, `.selected-workspace-name .workspace-badge`) match external and are safe to delete. **But the two `@media` blocks are not covered externally** and must either (a) be moved into `_header.scss`, or (b) stay inline. The entire `<style>` block cannot simply be deleted.

### Group B — `section`, `three-dots`: BOTH UNSAFE AS STATED

Previous claim: "Just delete inline — class in same module."

**`section` in `MyAssessmentComp.jsx`:**
- External `.section { margin-top: 2rem; }` lives in `src/components/dashboard/dashboardHomeComponents/styles/dashboard-home.scss` at line 17.
- That scss is imported **only** by `dashboardHomeComponents/index.jsx`.
- `MyAssessmentComp.jsx` does **not** import `dashboard-home.scss` directly, nor does any parent layout that wraps MyAssessmentComp.
- On a page where MyAssessmentComp renders without `dashboardHomeComponents/index.jsx` having loaded first (e.g., deep-linked assessment page), the external rule is not present — only inline provides it.
- ❌ **Cannot simply delete.** Fix requires either adding `import './dashboardHomeComponents/styles/dashboard-home.scss'` in MyAssessmentComp, or moving the rule to a globally-loaded file.

**`three-dots` in `TrashAssistant.jsx`, `TrashAssessment.jsx`, `TrashFolderTab.jsx`:**
- External `.three-dots` lives in `dashboard-inline.scss:929`.
- None of these three files imports `dashboard-inline.scss` directly.
- Their rendering parent chain typically includes a component that does (e.g., `TrashModal.jsx`, `Header.jsx`), but this relies on side-effect CSS injection from a sibling component rather than an explicit dependency in the Trash* files themselves.
- ⚠️ **Likely works in practice but fragile.** Fix requires either adding `import './dashboard-inline.scss'` at the top of each Trash* file before deleting the inline rule, or moving `.three-dots` to a globally-loaded file.

### Group C — `dropdown-menuu`, `dropdown-itemm`, `icon-container`: RECOMMENDATION DIRECTIONALLY CORRECT BUT UNSAFE TO SKIP

Previous claim: relocate from `ai-assistant.scss` to a dashboard-shared scss.

**Findings:**
- `ai-assistant.scss` is imported only by `modules/dashboard/AiAssistant.jsx`, `sitemap/Playbook-List.jsx`, `sitemap/List.jsx`.
- The consumer JSX files `Workspaces.jsx`, `MyAssessmentComp.jsx`, `FileStructure.jsx` (dashboard) and `customModal/MoveToModal.jsx` do **not** import `ai-assistant.scss`.
- On a dashboard home page (Workspaces / MyAssessmentComp), the external `.dropdown-menuu` / `.dropdown-itemm` / `.icon-container` rules are **not loaded**. The inline `<style>` is currently the only source of those styles.
- ❌ **Deleting the inline block without first relocating the rules would break the dropdown styling on dashboard pages.**

The proposed relocation is therefore not optional — it is required before any inline deletion. Recommended target: add the rules to `dashboard-inline.scss` (which is imported by common dashboard components) or to `scss/components/common/_header.scss` (globally loaded) if they qualify as shared UI. Then delete the 5 inline occurrences.

### Group D — `message-action-icons`, `message-icon-wrapper`, `tooltip-assessment`: FIX APPLIES IN PRACTICE, BUT DETAILS SHIFT

Previous claim: lift rules into `src/components/chat/chat-message.scss`; cross-module usage.

**Findings:**
- `assistant/MessagesSection.jsx` explicitly imports both `chat-message.scss` and `assessment.scss` at the top of the file. The external rules are present in its bundle. ✓
- The `.message-action-icons` rule has two *different* external definitions (chat-message.scss has 5 props; assessment.scss has 1 prop). Source-order gives `assessment.scss` the final say on conflicting props (`display`), but the other 4 props from `chat-message.scss` survive. Effective compiled styles cover more than inline has. ✓ Safe to delete inline.
- `.message-icon-wrapper`: inline is identical to `assessment.scss:328` (and superset-covered when combined with `chat-message.scss`). ✓ Safe to delete inline.
- `.tooltip-assessment`: inline matches `assessment.scss:340`. ✓ Safe to delete inline.

So for this group **the inline rules can be deleted today** without any scss relocation — because `assistant/MessagesSection.jsx` already imports the relevant external stylesheets. The earlier recommendation to "lift to `components/chat/chat-message.scss`" is an optional organisational move (reducing the assistant-module → assessment-module cross-dependency and renaming `tooltip-assessment`), not a correctness fix.

**Minor correction:** my script misreported `.message-action-icons` as IDENTICAL due to a `\ gap: 0.5rem;` line in the inline CSS (backslash-prefixed) that the parser mishandled. The true relationship is SUPERSET/SUBSET against `assessment.scss` and SUBSET against `chat-message.scss`. The practical conclusion (safe to delete) is unchanged.

### Revised summary: what is safe to do right now

| Class | JSX file(s) | Can inline be deleted today? | Why / prerequisite |
|---|---|---|---|
| `selected-workspace-name` — base rule + nested `p` | `MyAssessmentComp.jsx` | ✅ Yes (only nested `p` and `.workspace-badge` inline — both matched by globally-loaded `_header.scss`) | `_header.scss` is global |
| `selected-workspace-name` — base rule + nested `p` | `dashboardHomeComponents/index.jsx` | ⚠️ Base rules yes, but `@media` blocks must stay or be migrated into `_header.scss` first | Inline has responsive overrides not in external |
| `workspace-badge` | both above | ✅ Yes (same reasoning — selector path `.selected-workspace-name .workspace-badge` matches) | `_header.scss` is global |
| `section` | `MyAssessmentComp.jsx` | ❌ No — add import first or move rule | `dashboard-home.scss` not loaded on assessment page |
| `three-dots` | `TrashAssistant.jsx`, `TrashAssessment.jsx`, `TrashFolderTab.jsx` | ⚠️ No — add `import './dashboard-inline.scss'` in each first, or move rule to a globally-loaded file | fragile side-effect load only |
| `dropdown-menuu`, `dropdown-itemm`, `icon-container` | `Workspaces.jsx`, `MyAssessmentComp.jsx` | ❌ No — relocate rules to a dashboard-loaded scss first | `ai-assistant.scss` not loaded on dashboard pages |
| `message-action-icons`, `message-icon-wrapper`, `tooltip-assessment` | `assistant/MessagesSection.jsx` | ✅ Yes | file already imports both external sheets |

**Strictly safe inline deletions without any scss change: 6 rules** (MyAssessmentComp's `.selected-workspace-name p` and `.selected-workspace-name .workspace-badge`; assistant/MessagesSection's three chat rules; and the nested `.selected-workspace-name .workspace-badge` rule in dashboardHomeComponents/index.jsx once you confirm the `<span className="workspace-badge">` stays under a `.selected-workspace-name` parent, which it does).

Everything else requires first adding an `import` or moving a rule into a globally-loaded file — the "just delete the inline" framing in the earlier groups was inaccurate for those.

## Recommended cleanup order

Rank by highest ratio of safe (IDENTICAL + SUPERSET/SUBSET) duplicates to total inline classes. Start here — these files give the most reduction with the least manual merge work.

| File | Safe dupes | Total inline classes | Notes |
|---|---|---|---|
| `dashboardHomeComponents/index.jsx` | 2 / 2 inline classes | 2 | The entire inline `<style>` block is already covered by `_header.scss`. |
| `Workspaces.jsx` | 7 of 10 dupes | 27 | Remove the seven IDENTICAL/SUPERSET rules; review the three OVERLAP rules for intentional overrides. |
| `MyAssessmentComp.jsx` | 6 of 9 dupes | 14 | 5 IDENTICAL + 1 SUPERSET — large portion of inline block is redundant with `_header.scss`, `ai-assistant.scss`, and `dashboard-home.scss`. |
| `MessagesSection.jsx` | 6 of 7 dupes | 7 | Nearly the whole inline block duplicates `assessment.scss` and `chat-message.scss`. |
| `TrashAssessment.jsx` | 2 of 4 dupes | 7 | 1 IDENTICAL + 1 SUPERSET in `dashboard-inline.scss`. |
| `TrashFolderTab.jsx` | 2 of 4 dupes | 10 | Both SUPERSET in `dashboard-inline.scss`. |
| `AssessmentBookMark.jsx` | 2 of 4 dupes | 11 | SUPERSET candidates `date`, `header`. |

## Caveats / limitations

- **Own-declarations only.** The comparator captures only the class's direct property/value pairs. Nested SCSS rules inside the class (e.g. `.msg h5 { ... }`) are not included in the class's body comparison. For deeply-nested SCSS, real overlap may be larger than reported.
- **No specificity analysis.** Two identical rule bodies can still produce different rendered styling if one lives under a different ancestor selector. Before deleting an inline rule because it is "IDENTICAL" to an external one, verify the element is actually within a DOM ancestor matched by the external selector path.
- **OVERLAP != merge candidate.** Value differences may be deliberate component-level overrides. Treat OVERLAP as "inspect manually", not "auto-consolidate".
- **DIFFERENT verdicts are not actionable.** They indicate name reuse across unrelated styles. Renaming one side would help hygiene but is out of scope for dedup.
- **Regex-based selector extraction.** A class name inside a string literal in CSS (e.g. `content: ".foo";`) would be counted as a selector. This is rare and was not observed to cause false positives in the current dataset.
- **Reference-following is single-hop.** Template literals referenced from `<style>{varName}</style>` are followed to their `const varName = ` ... ` ` definition in the same file only. Cross-file imports of CSS strings are not followed.

## Reproducibility

The audit was produced by two throwaway Node scripts (now deleted) that:

1. Walked the repo for `.scss` / `.css` files (excluding `node_modules/`, `dist/`).
2. Indexed all external class selectors.
3. For each JSX file, extracted classes from `<style>` blocks (following single-hop template literal references).
4. Computed exact-name intersections.
5. For each duplicate, parsed rule bodies on both sides, extracted own-declarations, and diffed property sets.

All regex patterns used:
- Class token: `\.[A-Za-z_][A-Za-z0-9_-]*`
- Style block: `<style\b[^>]*>([\s\S]*?)<\/style>`
- Template literal ref: `<style>\{\s*IDENTIFIER\s*\}</style>` → `(const|let|var)\s+IDENTIFIER\s*=\s*` ... ` `
