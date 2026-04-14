# CMP Frontend — Manual E2E Test Cases

**App URL:** `http://localhost:5173`  
**Scope:** All features, happy path + negative cases  
**Starting state:** No existing account — begin from scratch

---

## Table of Contents

1. [Authentication](#1-authentication)
   - 1.1 User Registration
   - 1.2 Email Verification
   - 1.3 User Login
   - 1.4 Forgot Password
   - 1.5 Change Password
   - 1.6 Delete Account
2. [Subscription Plans](#2-subscription-plans)
3. [Workspace Management](#3-workspace-management)
4. [Folder / Project Management](#4-folder--project-management)
5. [Chat Management](#5-chat-management)
6. [Messages](#6-messages)
7. [Comments & Replies](#7-comments--replies)
8. [Bookmarks](#8-bookmarks)
9. [Media](#9-media)
10. [Tasks](#10-tasks)
11. [Versions](#11-versions)
12. [Shared Users (Collaboration)](#12-shared-users-collaboration)
13. [Assessments](#13-assessments)
14. [AI Chat](#14-ai-chat)
15. [AI Writing Tools](#15-ai-writing-tools)
16. [Subscriptions & Billing](#16-subscriptions--billing)
17. [Trash](#17-trash)
18. [Document Upload & RAG](#18-document-upload--rag)
19. [Survey](#19-survey)
20. [Feedback](#20-feedback)
21. [Digital Playbooks](#21-digital-playbooks)
22. [Settings & Personal Info](#22-settings--personal-info)

---

## 1. Authentication

---

### TC-001 — User Registration (Happy Path)

**Precondition:** No existing account. App is open at `http://localhost:5173`.

**Steps:**

1. Navigate to `http://localhost:5173/sign-up`.
2. Observe the page heading **"Create Your Account"**.
3. Enter a valid email in the **Email** field (e.g., `testuser@example.com`).
4. Enter a first name in the **First Name** field (e.g., `Test`).
5. Enter a last name in the **Last Name** field (e.g., `User`).
6. Enter a company name in the **Company Name** field (e.g., `Test Corp`).
7. Enter a strong password in the **Password** field (e.g., `Test@1234`).
8. Re-enter the same password in the **Confirm Password** field.
9. Click the **"Create Account"** button.
10. Observe the button text changes to **"Creating account..."** while loading.
11. After success, observe you are redirected to `/business-info`.
12. On the Business Information page, fill in:
    - **First Name**: `Test`
    - **Last Name**: `User`
    - **What is your role?**: Select any option (e.g., `Developer`)
    - **What industry are you in?**: Select any option (e.g., `Design`)
    - **What size is your company?**: Select any option
    - **What is your company name?**: `Test Corp`
    - **What is your website URL?**: `https://testcorp.com`
    - **What is your job title?**: `QA Engineer`
13. Click **"Continue"**.
14. On the Set Password page, enter password in **Password** field and **Confirm Password** field.
15. Click **"Continue"**.
16. Observe redirect to `/verify-email`.

**Expected Result:**
- Registration succeeds and redirects through `/business-info` → `/set-password` → `/verify-email`.
- No errors are shown when all fields are valid.
- The button shows a loading state while the request is in progress.

---

### TC-002 — User Registration (Negative Cases)

**Precondition:** On the `/sign-up` page.

#### TC-002a — Empty form submission

**Steps:**
1. Leave all fields empty.
2. Click **"Create Account"**.

**Expected Result:**
- Form does not submit.
- Validation error messages appear below each required field.

---

#### TC-002b — Invalid email format

**Steps:**
1. Enter `invalidemail` in the **Email** field.
2. Fill all other fields with valid values.
3. Click **"Create Account"**.

**Expected Result:**
- An error message appears indicating the email format is invalid.
- Form does not submit.

---

#### TC-002c — Password mismatch

**Steps:**
1. Fill all fields with valid values.
2. Enter `Test@1234` in **Password**.
3. Enter `Different@5678` in **Confirm Password**.
4. Click **"Create Account"**.

**Expected Result:**
- An error message appears indicating passwords do not match.
- Form does not submit.

---

#### TC-002d — Already registered email

**Steps:**
1. Enter an email that already has an existing account.
2. Fill all other fields with valid values.
3. Click **"Create Account"**.

**Expected Result:**
- An error message is displayed stating the email is already registered (e.g., "Email already exists" or similar).

---

### TC-003 — Email Verification (Happy Path)

**Precondition:** Completed registration. Now on `/verify-email`. A 6-digit code was sent to the registered email.

**Steps:**

1. Observe the page heading **"Verify your Email"**.
2. Observe the message: *"We sent you a six-digit confirmation code to [your email]. Please enter it below to confirm your email address."*
3. Open your email inbox and copy the 6-digit verification code.
4. Enter the 6-digit code in the code input field.
5. Observe the app processes the code.
6. Upon success, observe automatic redirect to `/choose-plan`.

**Expected Result:**
- Correct code is accepted.
- User is redirected to the plan selection page.

---

### TC-004 — Email Verification (Negative Cases)

**Precondition:** On `/verify-email`.

#### TC-004a — Wrong OTP code

**Steps:**
1. Enter an incorrect 6-digit code (e.g., `000000`).
2. Submit.

**Expected Result:**
- An error message is displayed (e.g., "Invalid verification code" or similar).
- User stays on `/verify-email`.

---

#### TC-004b — Resend verification code

**Steps:**
1. Observe the **"Resend"** link is initially disabled with a countdown timer (e.g., *"Resend in 60s"*).
2. Wait for the countdown to reach 0.
3. Click **"Resend"** once it becomes active.

**Expected Result:**
- A new 6-digit code is sent to the email.
- The countdown timer resets to 60 seconds.
- A success message is briefly shown.

---

### TC-005 — User Login (Happy Path)

**Precondition:** Verified account exists.

**Steps:**

1. Navigate to `http://localhost:5173/log-in`.
2. Observe the heading **"Welcome to Change AI"**.
3. Enter the registered email in the **Email** field.
4. Enter the correct password in the **Password** field.
5. Optionally click the **eye icon** on the password field to toggle visibility.
6. Click **"Log In"**.
7. Observe the button text changes to **"Logging in..."** while loading.
8. Upon success, observe redirect to `/dashboard`.

**Expected Result:**
- Login succeeds.
- User lands on the dashboard at `/dashboard`.
- The sidebar navigation is visible with menu items: Dashboard, AI Assistant, My Assessments, etc.

---

### TC-006 — User Login (Negative Cases)

**Precondition:** On `/log-in`.

#### TC-006a — Wrong password

**Steps:**
1. Enter a registered email.
2. Enter an incorrect password.
3. Click **"Log In"**.

**Expected Result:**
- An error message is displayed (e.g., "Invalid credentials" or "Incorrect password").
- User stays on `/log-in`.

---

#### TC-006b — Unregistered email

**Steps:**
1. Enter an email that does not exist in the system.
2. Enter any password.
3. Click **"Log In"**.

**Expected Result:**
- An error message is displayed (e.g., "User not found" or similar).

---

#### TC-006c — Empty fields

**Steps:**
1. Leave both Email and Password fields empty.
2. Click **"Log In"**.

**Expected Result:**
- Form does not submit.
- Validation errors appear below required fields.

---

### TC-007 — Forgot Password (Happy Path)

**Precondition:** On `/log-in`. You have access to the registered email inbox.

**Steps:**

1. Click **"Forgot Password?"** link below the password field.
2. Observe redirect to `/forgot-password/verification`.
3. Observe the heading **"Enter Your Email"**.
4. Enter the registered email in the **Email** field.
5. Click **"Continue"**.
6. Observe redirect to `/forgot-password/Code`.
7. Observe the heading **"Verify your Email"**.
8. Open the email inbox and copy the 6-digit OTP.
9. Enter the OTP in the **OTP** field.
10. Enter a new password in the **New Password** field (e.g., `NewPass@5678`).
11. Click **"Reset Password"**.
12. Observe redirect to `/log-in`.
13. Log in using the new password to confirm it works.

**Expected Result:**
- Password reset email is received.
- OTP is accepted and password is changed.
- User can log in with the new password.

---

### TC-008 — Forgot Password (Negative Cases)

#### TC-008a — Unregistered email on forgot password

**Steps:**
1. On `/forgot-password/verification`, enter an email not in the system.
2. Click **"Continue"**.

**Expected Result:**
- An error message is displayed (e.g., "Email not found" or similar).

---

#### TC-008b — Wrong OTP on password reset

**Steps:**
1. Complete the forgot password email step.
2. On `/forgot-password/Code`, enter an incorrect OTP (e.g., `999999`).
3. Enter a new password.
4. Click **"Reset Password"**.

**Expected Result:**
- An error message is displayed (e.g., "Invalid OTP").
- Password is not changed.

---

#### TC-008c — Resend OTP on forgot password

**Steps:**
1. On `/forgot-password/Code`, wait for the countdown to expire.
2. Click **"Resend"**.

**Expected Result:**
- A new OTP is sent to the email.
- Countdown resets.

---

### TC-009 — Change Password (Happy Path)

**Precondition:** Logged in. On any dashboard page.

**Steps:**

1. Click the **profile icon/avatar** in the top-right of the header.
2. In the dropdown, click **"Change Password"**.
3. Observe a modal opens with the title **"Change Password"**.
4. Enter the current password in the **Old Password** field.
5. Enter a new password in the **New Password** field.
6. Enter the same new password in the **Confirm New Password** field.
7. Click **"Change Password"**.

**Expected Result:**
- Modal closes on success.
- A success message is shown.
- Logging out and back in with the new password works.

---

### TC-010 — Change Password (Negative Cases)

#### TC-010a — Wrong old password

**Steps:**
1. Open the Change Password modal.
2. Enter an incorrect old password.
3. Enter valid new password fields.
4. Click **"Change Password"**.

**Expected Result:**
- Error message is displayed (e.g., "Old password is incorrect").

---

#### TC-010b — New password mismatch

**Steps:**
1. Open the Change Password modal.
2. Enter the correct old password.
3. Enter `NewPass@1` in **New Password**.
4. Enter `NewPass@2` in **Confirm New Password**.
5. Click **"Change Password"**.

**Expected Result:**
- Error message is displayed (e.g., "Passwords do not match").

---

### TC-011 — Delete Account (Happy Path)

**Precondition:** Logged in. Navigate to `/dashboard/settings`.

> **Warning:** This is a destructive action. Use a throwaway test account.

**Steps:**

1. In the sidebar, click **"Settings"**.
2. On the Settings page, locate the **Personal Information** tab (active by default).
3. Find the option to **delete the account** (button or link labeled "Delete Account").
4. Click it and confirm in any confirmation dialog.

**Expected Result:**
- Account is deleted.
- User is redirected to `/log-in`.
- Attempting to log in with the deleted account credentials fails.

---

## 2. Subscription Plans

---

### TC-012 — Choose Plan After Registration (Happy Path)

**Precondition:** Just completed email verification. Redirected to `/choose-plan`.

**Steps:**

1. Observe the heading **"Compare our plans and find yours"**.
2. Observe three plan cards: **Starter** (Free), **Professional** (£49/month), **Enterprise** (£199/month).
3. Observe the **"Monthly"** toggle is active; **"Yearly"** is disabled.
4. Review the features listed under each plan.
5. Click **"Upgrade"** on the **Professional** plan.
6. Observe redirect to Stripe checkout (`/check-out` or external Stripe URL).
7. Alternatively, select the **Starter** (Free) plan to proceed without payment.

**Expected Result:**
- Plan cards display correctly with features and pricing.
- Selecting a paid plan redirects to a checkout/payment page.
- Selecting the free plan proceeds to the dashboard.

---

## 3. Workspace Management

---

### TC-013 — Create Workspace (Happy Path)

**Precondition:** Logged in. On `/dashboard`.

**Steps:**

1. In the **Workspaces** section on the dashboard, click the **"New Workspace"** button (with + icon).
2. Observe a modal opens with the title **"Create New Workspace"**.
3. Enter a workspace name (e.g., `My Workspace`) in the **Enter workspace name** field.
4. Enter a description (e.g., `Test workspace`) in the **Enter workspace description** field.
5. Click **"Create"**.

**Expected Result:**
- Modal closes.
- The new workspace appears in the Workspaces section on the dashboard.
- A success notification may be shown.

---

### TC-014 — Create Workspace (Negative Cases)

#### TC-014a — Empty workspace name

**Steps:**
1. Open the Create New Workspace modal.
2. Leave the workspace name field empty.
3. Click **"Create"**.

**Expected Result:**
- Validation error shown (e.g., name is required or must be at least 3 characters).
- Modal does not close.

---

#### TC-014b — Workspace name too short

**Steps:**
1. Open the Create New Workspace modal.
2. Enter only 2 characters (e.g., `AB`) in the workspace name field.
3. Click **"Create"**.

**Expected Result:**
- Validation error shown (minimum 3 characters required).

---

### TC-015 — Rename Workspace (Happy Path)

**Precondition:** At least one workspace exists. On `/dashboard`.

**Steps:**

1. Hover over a workspace icon in the Workspaces section.
2. Click the **three-dots menu** that appears.
3. Observe a modal/dropdown appears with options including **"Switch Workspace"** and **"Move to Trash"**, and a rename input.
4. Click or activate the rename option (look for an input field within the modal).
5. Clear the existing name and enter a new name (e.g., `Renamed Workspace`).
6. Click **"Save"**.

**Expected Result:**
- Workspace name is updated in the Workspaces section.
- No page reload is required.

---

### TC-016 — Switch Workspace (Happy Path)

**Precondition:** Two or more workspaces exist. On `/dashboard`.

**Steps:**

1. Hover over a workspace icon that is not currently active.
2. Click the **three-dots menu**.
3. Click **"Switch Workspace"**.

**Expected Result:**
- The active workspace changes to the selected one.
- The dashboard content updates to reflect the new workspace's data.

---

### TC-017 — Move Workspace to Trash (Happy Path)

**Precondition:** At least one workspace exists. On `/dashboard`.

**Steps:**

1. Hover over a workspace icon.
2. Click the **three-dots menu**.
3. Click **"Move to Trash"** (red button).
4. Confirm any confirmation dialog.

**Expected Result:**
- A success message is shown: *"Workspace moved to trash successfully!"*
- The workspace is removed from the Workspaces section.
- The workspace appears under **Trash → Workspaces** tab.

---

## 4. Folder / Project Management

---

### TC-018 — Create Folder / Project (Happy Path)

**Precondition:** Logged in. A workspace is active. On `/dashboard` or `/dashboard/aiAssistant`.

**Steps:**

1. In the **Projects** section, click the **"New Project"** button (with + icon).
2. Observe a modal with the title **"Create New Project"**.
3. Fill in all required fields:
   - **Project Name**: `Test Project` (at least 3 characters)
   - **Company Name**: `Test Corp`
   - **Company Size**: `50` (positive number)
   - **Job Title**: `QA Engineer`
   - **Industry**: `Design`
4. Click **"Create"**.

**Expected Result:**
- Modal closes.
- The new project/folder appears in the Projects section.

---

### TC-019 — Create Folder (Negative Cases)

#### TC-019a — Empty required fields

**Steps:**
1. Open the Create New Project modal.
2. Leave all fields empty.
3. Click **"Create"**.

**Expected Result:**
- Validation error messages appear below each required field.
- Modal does not close.

---

#### TC-019b — Project name too short

**Steps:**
1. Open the Create New Project modal.
2. Enter `AB` in the **Project Name** field.
3. Fill other fields with valid values.
4. Click **"Create"**.

**Expected Result:**
- Validation error shown for the project name (minimum 3 characters).

---

#### TC-019c — Non-numeric company size

**Steps:**
1. Open the Create New Project modal.
2. Enter `abc` in the **Company Size** field.
3. Fill other fields with valid values.
4. Click **"Create"**.

**Expected Result:**
- Validation error shown for Company Size (must be a positive number).

---

### TC-020 — Rename Folder (Happy Path)

**Precondition:** At least one folder exists.

**Steps:**

1. Locate a folder in the Projects section.
2. Right-click or hover to find the rename/edit option.
3. Click to enter rename mode.
4. Enter a new name (e.g., `Renamed Project`).
5. Press **Enter** or click **Save**.

**Expected Result:**
- The folder name is updated immediately in the UI.

---

### TC-021 — Delete Folder (Happy Path)

**Precondition:** At least one folder exists.

**Steps:**

1. Locate a folder in the Projects section.
2. Find and click the **Delete** option from the folder's context menu.
3. Confirm the deletion if a dialog appears.

**Expected Result:**
- The folder is removed from the Projects section.
- It may appear in the Trash under the **Projects** tab.

---

## 5. Chat Management

---

### TC-022 — Create AI Assistant Chat (Happy Path)

**Precondition:** Logged in. A workspace and at least one project/folder exist. On `/dashboard/aiAssistant`.

**Steps:**

1. In the sidebar, click **"AI Assistant"**.
2. Observe the AI Assistant page.
3. Click **"Create Assistant"** button (with + icon, green).
4. If prompted, select a folder/project.
5. Observe the chat is created and you are redirected to `/assistant/chat/:id`.

**Expected Result:**
- A new chat is created.
- The chat interface opens with a message input field.

---

### TC-023 — Open Existing Chat (Happy Path)

**Precondition:** At least one AI Assistant chat exists.

**Steps:**

1. On `/dashboard/aiAssistant`, observe the grid of existing chat cards.
2. Click on a chat card.

**Expected Result:**
- The selected chat opens at `/assistant/chat/:id`.
- Previous messages (if any) are displayed.

---

### TC-024 — Delete Chat (Happy Path)

**Precondition:** At least one AI Assistant chat exists.

**Steps:**

1. On `/dashboard/aiAssistant`, hover over a chat card.
2. Find and click the **delete icon** on the card.
3. Confirm deletion if a dialog appears.

**Expected Result:**
- The chat is removed from the grid.
- It may appear in the Trash under the **Assistant** tab.

---

### TC-025 — Rename Chat (Happy Path)

**Precondition:** A chat is open at `/assistant/chat/:id`.

**Steps:**

1. Locate the chat title in the interface.
2. Click on it or find the rename/edit option.
3. Enter a new name.
4. Press **Enter** or click **Save**.

**Expected Result:**
- The chat title is updated in the UI.

---

## 6. Messages

---

### TC-026 — Send a Message (Happy Path)

**Precondition:** An AI Assistant chat is open at `/assistant/chat/:id`.

**Steps:**

1. Locate the message input field at the bottom of the chat.
2. Type a message (e.g., `Hello, what can you help me with?`).
3. Press **Enter** or click the **Send** button.
4. Observe the message appears in the chat window as a user message.
5. Observe the AI streaming its response (loading indicator should appear).
6. Wait for the AI response to complete.

**Expected Result:**
- The user message is displayed in the chat.
- The AI response appears below the user message.
- Streaming indicator appears while the AI is generating a response.

---

### TC-027 — Like a Message (Happy Path)

**Precondition:** At least one AI response message exists in the chat.

**Steps:**

1. Hover over an AI response message.
2. Find the **thumbs up (like)** icon.
3. Click it.

**Expected Result:**
- The like icon changes state (filled/highlighted) to indicate the message is liked.

---

### TC-028 — Dislike a Message (Happy Path)

**Precondition:** At least one AI response message exists in the chat.

**Steps:**

1. Hover over an AI response message.
2. Find the **thumbs down (dislike)** icon.
3. Click it.

**Expected Result:**
- The dislike icon changes state to indicate the message is disliked.

---

### TC-029 — Edit a Message (Happy Path)

**Precondition:** At least one user message exists in the chat.

**Steps:**

1. Hover over a user message.
2. Find the **pencil (edit)** icon.
3. Click it.
4. Modify the message text.
5. Save the changes.

**Expected Result:**
- The message text is updated in the chat.

---

### TC-030 — Delete a Message (Happy Path)

**Precondition:** At least one message exists in the chat.

**Steps:**

1. Hover over a message.
2. Find the **delete** option.
3. Click it and confirm deletion if prompted.

**Expected Result:**
- The message is removed from the chat.

---

## 7. Comments & Replies

---

### TC-031 — Add a Comment (Happy Path)

**Precondition:** Inside an assessment chat. The **Comments** tab is accessible.

**Steps:**

1. Open an assessment at `/assessment/chat/:id`.
2. Click the **"Comments"** tab.
3. Observe the comments section (heading, search bar, filter icon).
4. Find the comment input area.
5. Type a comment (e.g., `This is a test comment`).
6. Click the **send icon** (paper plane) or press **Enter** to submit.

**Expected Result:**
- The comment appears in the comments list.
- Comment shows author name, timestamp, and text.

---

### TC-032 — Edit a Comment (Happy Path)

**Precondition:** At least one comment exists in the Comments tab.

**Steps:**

1. Locate the comment in the list.
2. Click the **three-dots menu (ellipsis)** on the comment.
3. Click **"Edit Comment"**.
4. An inline input field appears with the existing text.
5. Modify the text (e.g., `Updated comment text`).
6. Press **Enter** or click away (blur) to save.

**Expected Result:**
- The comment text is updated in the list.

---

### TC-033 — Delete a Comment (Happy Path)

**Precondition:** At least one comment exists.

**Steps:**

1. Locate a comment in the Comments tab.
2. Click the **three-dots menu (ellipsis)**.
3. Click **"Delete Comment"**.
4. Confirm deletion if prompted.

**Expected Result:**
- The comment is removed from the list.
- If it was the only comment, the **"No comments available."** state is shown.

---

### TC-034 — Add a Reply to a Comment (Happy Path)

**Precondition:** At least one comment exists.

**Steps:**

1. Locate a comment in the Comments tab.
2. Find the **"Show X replies"** toggle or click the reply area.
3. In the reply input box (with avatar, **"Reply"** placeholder), type a reply (e.g., `This is a reply`).
4. Click the **send icon**.

**Expected Result:**
- The reply appears nested under the parent comment.
- Reply shows author name and timestamp.
- The toggle updates to **"Show X replies"** or **"Hide replies"**.

---

### TC-035 — Edit a Reply (Happy Path)

**Precondition:** At least one reply exists under a comment.

**Steps:**

1. Expand replies under a comment.
2. Click the **three-dots menu** on the reply.
3. Click **"Edit Reply"**.
4. Modify the reply text.
5. Press **Enter** or blur to save.

**Expected Result:**
- The reply text is updated.

---

### TC-036 — Delete a Reply (Happy Path)

**Precondition:** At least one reply exists under a comment.

**Steps:**

1. Expand replies under a comment.
2. Click the **three-dots menu** on the reply.
3. Click **"Delete Reply"**.
4. Confirm if prompted.

**Expected Result:**
- The reply is removed from the thread.

---

### TC-037 — Comments Filter / Sort (Happy Path)

**Precondition:** At least two comments exist.

**Steps:**

1. Click the **filter icon** in the Comments section.
2. Observe dropdown options: **"Sort by date"**, **"Sort by unread"**, **"Sort by resolved"**.
3. Click **"Sort by date"**.

**Expected Result:**
- Comments are re-ordered by date.

---

## 8. Bookmarks

---

### TC-038 — Add a Bookmark (Happy Path)

**Precondition:** Inside an assessment chat. The **Bookmarks** tab is visible.

**Steps:**

1. Open an assessment at `/assessment/chat/:id`.
2. Locate a message in the chat.
3. Hover over the message and find the **bookmark icon** (outline).
4. Click the outline bookmark icon.

**Expected Result:**
- The bookmark icon changes to a filled state.
- The message appears in the **Bookmarks** tab under the bookmarks list.
- Attribution shows **"Saved by [username]"**.

---

### TC-039 — Remove a Bookmark (Happy Path)

**Precondition:** At least one message is bookmarked.

**Steps:**

1. Click the **"Bookmarks"** tab in the assessment chat.
2. Locate a bookmarked message.
3. Click the **filled bookmark icon** on the message.

**Expected Result:**
- The bookmark icon returns to the outline (unfilled) state.
- The message is removed from the Bookmarks tab list.

---

### TC-040 — No Bookmarks State

**Precondition:** No bookmarks exist.

**Steps:**

1. Click the **"Bookmarks"** tab.

**Expected Result:**
- The message **"No messages available."** is displayed.

---

## 9. Media

---

### TC-041 — View Media Tabs (Happy Path)

**Precondition:** Inside an assessment chat.

**Steps:**

1. Click the **"Media"** (or **Gallery**) tab in the assessment chat.
2. Observe three sub-tabs at the top: **Images**, **Documents**, **Links**.

**Expected Result:**
- The three tabs are visible.
- The default tab shows its empty state or existing media.

---

### TC-042 — Upload/View Images (Happy Path)

**Precondition:** Inside the Media tab on an assessment chat. At least one image has been shared in the chat.

**Steps:**

1. Click the **"Images"** tab.
2. Observe thumbnail images displayed in a 3-column grid.
3. Click on a thumbnail.

**Expected Result:**
- A popup viewer opens with the full-size image.
- Navigation arrows (Previous / Next) are visible if multiple images exist.
- A close button (X) is visible to dismiss the viewer.

---

### TC-043 — View Documents Tab (Happy Path)

**Precondition:** At least one document has been added to the assessment chat.

**Steps:**

1. Click the **"Media"** tab, then **"Documents"** sub-tab.
2. Observe document entries (document icon, name, size, date).

**Expected Result:**
- Documents are listed with their name, size, and upload date.

---

### TC-044 — View Links Tab (Happy Path)

**Precondition:** At least one link has been added to the assessment chat.

**Steps:**

1. Click the **"Media"** tab, then **"Links"** sub-tab.
2. Observe link entries (link icon, name, truncated URL).

**Expected Result:**
- Links are listed with their name and URL.

---

### TC-045 — Empty Media States

**Precondition:** No media of a given type exists.

**Steps:**

1. Open the **Images** tab with no images.

**Expected Result:** **"No images available"** is displayed.

2. Open the **Documents** tab with no documents.

**Expected Result:** **"No documents available"** is displayed.

3. Open the **Links** tab with no links.

**Expected Result:** **"No links available"** is displayed.

---

## 10. Tasks

---

### TC-046 — View Tasks / Reports (Happy Path)

**Precondition:** Inside an assessment chat. At least one report/task exists.

**Steps:**

1. Click the **"Tasks"** (or **Reports**) tab in the assessment chat.
2. Observe the **circular progress ring** showing overall completion percentage (e.g., *"60% In Progress"*, *"X/Total Completed"*).
3. Observe the task list below with items showing name and status badge (**Pending**, **In Progress**, **Completed**).

**Expected Result:**
- Progress ring displays correctly.
- Task list items are shown with correct status colors:
  - **Pending**: Orange background
  - **In Progress**: Blue background
  - **Completed**: Green background

---

### TC-047 — No Reports State

**Precondition:** No reports exist for the assessment.

**Steps:**

1. Click the **"Tasks"** tab.

**Expected Result:**
- **"No reports available"** message is shown.
- A **"Select a Report"** (green) button may be visible.

---

### TC-048 — Edit a Completed Report

**Precondition:** At least one task/report has a **Completed** status.

**Steps:**

1. Open the **"Tasks"** tab.
2. Locate a completed report item.
3. Hover over it to reveal the **edit icon (CiEdit)**.
4. Click the edit icon.

**Expected Result:**
- The report editor opens.
- The user can modify the report content.

---

## 11. Versions

---

### TC-049 — Save a Version (Happy Path)

**Precondition:** Inside an assessment chat. A report is currently open or available.

**Steps:**

1. Click the **"Version History"** tab in the assessment chat.
2. If no versions exist, observe the **"No version history available"** message and the **"Save Current as Version"** button.
3. Click **"Save Current as Version"** (green button).

**Expected Result:**
- A new version entry appears in the version list.
- The entry shows creation date (formatted: `D MMM YYYY, HH:mm`), version number (v1), and a preview of the content.

---

### TC-050 — Restore a Version (Happy Path)

**Precondition:** At least two versions exist in the Version History tab.

**Steps:**

1. Open the **"Version History"** tab.
2. Click on an older version entry in the list.
3. Observe the selected version becomes highlighted (yellow background and border).
4. Click the **"Restore Version"** button.
5. Observe the button text changes to **"Restoring..."** while processing.

**Expected Result:**
- The current report content is replaced with the restored version's content.
- A success message may be shown.

---

### TC-051 — Cancel Version Restore

**Precondition:** A version is selected in Version History.

**Steps:**

1. Select a version.
2. Click the **"Cancel"** button (white, bordered).

**Expected Result:**
- No changes are made to the current report.
- The selection is deselected or the panel closes.

---

### TC-052 — No Version History State

**Precondition:** No versions saved yet.

**Steps:**

1. Click the **"Version History"** tab.

**Expected Result:**
- **"No version history available"** text is shown.
- The **"Save Current as Version"** button is visible.

---

## 12. Shared Users (Collaboration)

---

### TC-053 — Add a Shared User (Happy Path)

**Precondition:** Inside an assessment or AI Assistant chat.

**Steps:**

1. Locate the **Shared Users** section within the chat interface (may be in a tab or sidebar).
2. Find the option to invite/add a user (e.g., an input for email or username).
3. Enter the email of another registered user.
4. Click **Add** or **Invite**.

**Expected Result:**
- The invited user appears in the Shared Users list.
- The invited user (when logged in) should have access to the chat.

---

### TC-054 — Remove a Shared User (Happy Path)

**Precondition:** At least one shared user exists in the chat.

**Steps:**

1. Open the Shared Users section.
2. Locate the user to remove.
3. Click the **remove/delete** option next to that user.
4. Confirm if prompted.

**Expected Result:**
- The user is removed from the Shared Users list.
- The removed user loses access to the chat.

---

## 13. Assessments

---

### TC-055 — Create an Assessment (Happy Path)

**Precondition:** Logged in. A workspace and folder exist. On `/dashboard/myAssessments`.

**Steps:**

1. In the sidebar, click **"My Assessments"**.
2. Click the **"Create Assessment"** button (or equivalent option for creating a new assessment).
3. Select the target workspace and folder if prompted.
4. Observe the assessment is created and you are redirected to `/assessment/chat/:id`.

**Expected Result:**
- A new assessment is created.
- The assessment chat interface opens.

---

### TC-056 — Start / Fill an Assessment (Happy Path)

**Precondition:** An assessment exists and is open at `/assessment/chat/:id`.

**Steps:**

1. Observe the assessment chat interface.
2. Click **"Survey Info"** button in the header (if applicable) to open the questionnaire modal.
3. Fill in the required questionnaire fields.
4. Submit the questionnaire.

**Expected Result:**
- The questionnaire is submitted.
- The AI generates an initial assessment report.

---

### TC-057 — Submit an Assessment Answer (Happy Path)

**Precondition:** An assessment is in progress. The Tasks tab has pending questions.

**Steps:**

1. Go to the **"Tasks"** tab within the assessment.
2. Select a pending report/task.
3. Provide an answer or response as prompted.
4. Submit the answer.

**Expected Result:**
- The task status updates (e.g., from **Pending** to **In Progress** or **Completed**).
- The progress ring percentage updates.

---

### TC-058 — Generate a Report (Happy Path)

**Precondition:** An assessment with completed tasks exists.

**Steps:**

1. Within the assessment, find the **"Generate Report"** option (may be a button in the Tasks tab or assessment header).
2. Click it.
3. Wait for the report to be generated.

**Expected Result:**
- A report is generated.
- A **"View Report"** button or link appears.

---

### TC-059 — View & Edit a Report (Happy Path)

**Precondition:** A report has been generated for the assessment.

**Steps:**

1. Click the **"View Report"** button.
2. Observe the full report content in the editor/modal.
3. Make a modification to the report text.
4. Save the changes.

**Expected Result:**
- Report content is editable.
- Changes are saved.

---

### TC-060 — Download a Report (Happy Path)

**Precondition:** A report exists for the assessment.

**Steps:**

1. Within the report view/editor, click the **"Download Report"** button.

**Expected Result:**
- The report opens or downloads in a new browser tab.
- The file is in the expected format (PDF or similar).

---

### TC-061 — Get Assessments by Folder

**Precondition:** A folder with assessments exists.

**Steps:**

1. Navigate to a folder.
2. Observe the assessments listed under the folder (may be on the dashboard or in the My Assessments section).

**Expected Result:**
- Only assessments belonging to the selected folder are displayed.

---

## 14. AI Chat

---

### TC-062 — Chat with a Document (Happy Path)

**Precondition:** Logged in. An AI Assistant chat is open at `/assistant/chat/:id`.

**Steps:**

1. In the chat interface, find the **file upload** option (drag & drop area or a paperclip/upload icon).
2. Upload a document (PDF, DOCX, TXT, etc., max 10MB).
3. Wait for the document to be processed.
4. Type a question about the uploaded document in the message input (e.g., `Summarize this document`).
5. Send the message.
6. Wait for the AI response.

**Expected Result:**
- The document is uploaded and acknowledged in the chat.
- The AI responds with content related to the uploaded document.

---

### TC-063 — Streaming Chat (Happy Path)

**Precondition:** An AI Assistant chat is open.

**Steps:**

1. Type any message in the input field (e.g., `Tell me about project management best practices`).
2. Send the message.
3. Observe the AI response appearing character by character / token by token (streaming).

**Expected Result:**
- A loading/streaming indicator is shown while the AI generates its response.
- The response text appears progressively (streaming effect).
- The full response is displayed once streaming completes.

---

### TC-064 — Support Chat (Happy Path)

**Precondition:** Logged in. On any dashboard page.

**Steps:**

1. Locate the **Support Chat** widget or button (typically a floating chat icon in a corner).
2. Click it to open the support chat.
3. Type a support message (e.g., `I need help with the AI Assistant feature`).
4. Send the message.

**Expected Result:**
- The support chat opens.
- The message is sent.
- A response or acknowledgment is received.

---

### TC-065 — Ingest Documents into RAG (Happy Path)

**Precondition:** Logged in. Navigate to `/dashboard/knowledge-base`.

**Steps:**

1. In the sidebar, click **"Knowledge Base"**.
2. Observe the heading **"Document Knowledge Base"**.
3. Drag and drop a supported file (PDF, DOCX, TXT, CSV, XLSX, PPTX — max 10MB) into the dashed drop zone, OR click the zone to browse and select a file.
4. Observe the file appears in the file list with its name and size.
5. Click the **"Upload [N] file(s)"** button (green).
6. Observe the button text changes to **"Processing..."**.

**Expected Result:**
- After processing, the file shows a green checkmark with **"Processed & indexed"**.
- The file is now available as knowledge for the AI Assistant.

---

### TC-066 — RAG Ingest (Negative Cases)

#### TC-066a — File exceeds 10MB

**Steps:**
1. Navigate to `/dashboard/knowledge-base`.
2. Try to upload a file larger than 10MB.

**Expected Result:**
- An error message is shown (e.g., "File exceeds the 10MB limit").
- The file is not uploaded.

---

#### TC-066b — Unsupported file type

**Steps:**
1. Navigate to `/dashboard/knowledge-base`.
2. Try to upload a file with an unsupported extension (e.g., `.exe` or `.jpg`).

**Expected Result:**
- The file is rejected.
- An error message is displayed (e.g., "Unsupported file type").

---

### TC-067 — Search Ingested Documents (Happy Path)

**Precondition:** At least one document has been successfully ingested into the Knowledge Base.

**Steps:**

1. In an AI Assistant chat, type a question that relates to content in the uploaded document.
2. Send the message.
3. Observe the AI's response references or uses the document content.

**Expected Result:**
- The AI uses the ingested document knowledge to answer the query (RAG retrieval working).

---

## 15. AI Writing Tools

---

> **Note:** Writing tools are triggered by **selecting text** within the chat messages or report editor. A popup toolbar appears on text selection.

---

### TC-068 — Summarize Text (Happy Path)

**Precondition:** A message with substantial text exists in an AI chat or report editor.

**Steps:**

1. In the chat or editor, **click and drag** to select a block of text.
2. Observe a popup toolbar appears above/below the selection.
3. Click the **"Summarize"** option in the toolbar (or navigate to the AI Writing Tools menu).
4. Wait for the AI to process.

**Expected Result:**
- The selected text is replaced with or accompanied by a summarized version.

---

### TC-069 — Translate Text (Happy Path)

**Steps:**

1. Select a block of text in the chat or editor.
2. From the popup toolbar, click **"Translate"**.
3. Choose a target language if prompted.
4. Wait for the AI to process.

**Expected Result:**
- The text is translated into the chosen language.

---

### TC-070 — Explain Text (Happy Path)

**Steps:**

1. Select a block of text.
2. From the popup toolbar, click **"Explain"**.

**Expected Result:**
- The AI provides an explanation of the selected text.

---

### TC-071 — Fix Grammar (Happy Path)

**Steps:**

1. Select text with grammatical errors.
2. From the popup toolbar, click **"Fix Grammar"**.

**Expected Result:**
- The text is corrected and grammar errors are fixed.

---

### TC-072 — Change Tone (Happy Path)

**Steps:**

1. Select a block of text.
2. From the popup toolbar, click **"Change Tone"**.
3. Select a tone option if a sub-menu appears.

**Expected Result:**
- The tone of the selected text is adjusted (e.g., more formal, casual, etc.).

---

### TC-073 — Improve Writing (Happy Path)

**Steps:**

1. Select a block of text.
2. From the popup toolbar, click **"Improve Writing"**.

**Expected Result:**
- The writing quality of the selected text is improved.
- *(Note: The API endpoint has a typo `/chat/imporve-writing` — verify the feature works despite the typo.)*

---

### TC-074 — Make Text Shorter (Happy Path)

**Steps:**

1. Select a long block of text.
2. From the popup toolbar, click **"Make Shorter"** (or "Short Text").

**Expected Result:**
- The selected text is condensed into a shorter version.

---

### TC-075 — Make Text Longer (Happy Path)

**Steps:**

1. Select a short block of text.
2. From the popup toolbar, click **"Make Longer"** (or "Long Text").

**Expected Result:**
- The selected text is expanded into a longer version.

---

### TC-076 — Make Text Comprehensive (Happy Path)

**Steps:**

1. Select a block of text.
2. From the popup toolbar, click **"Comprehensive"**.

**Expected Result:**
- The text is expanded with more detail and depth.

---

### TC-077 — Inspire Me (Happy Path)

**Steps:**

1. Select a block of text or place cursor in the editor.
2. From the popup toolbar, click **"Inspire Me"**.

**Expected Result:**
- The AI returns an inspired or creative variation of the selected text.

---

### TC-078 — Auto-Write (Happy Path)

**Steps:**

1. Place the cursor in the message input or editor.
2. Locate the **"Auto"** writing tool option.
3. Click it.

**Expected Result:**
- The AI auto-generates or continues writing based on context.

---

## 16. Subscriptions & Billing

---

### TC-079 — View Subscription Plans (Happy Path)

**Precondition:** Logged in. Navigate to `/dashboard/PlanBilling`.

**Steps:**

1. In the sidebar, click **"Plan & Billing"**.
2. Observe the current plan displayed prominently with a **green "Active" badge** and **"Current Plan"** label.
3. Observe the three plan cards: **Starter** (Free), **Professional** (£49/month), **Enterprise** (£199/month).
4. Check each plan's features list.

**Expected Result:**
- Current plan is clearly marked with **"Current Plan"** (disabled gray button).
- Other plans show either **"Upgrade"** (green) or **"Downgrade"** (gray) buttons.

---

### TC-080 — Upgrade Subscription (Happy Path)

**Precondition:** Currently on the Starter (Free) plan.

**Steps:**

1. On `/dashboard/PlanBilling`, click **"Upgrade"** on the **Professional** plan.
2. Observe the button text changes to **"Redirecting..."**.
3. Observe redirect to Stripe checkout.
4. Complete the payment on Stripe (use Stripe test card `4242 4242 4242 4242`, any future expiry, any CVC).

**Expected Result:**
- After successful payment, return to the app.
- The Professional plan is now shown as **"Current Plan"**.

---

### TC-081 — Get Current User Subscription (Happy Path)

**Precondition:** Logged in.

**Steps:**

1. Navigate to `/dashboard/PlanBilling`.
2. Observe the current plan section.

**Expected Result:**
- The user's active subscription plan is displayed correctly with pricing and features.

---

## 17. Trash

---

### TC-082 — View Trash (Happy Path)

**Precondition:** At least one item has been moved to trash. Logged in.

**Steps:**

1. In the sidebar, click **"Trash"**.
2. Observe the heading **"Trash"**.
3. Observe the tabs: **Workspaces**, **Projects**, **Assistant**, **Assessment**, **Sitemap**.
4. Click through each tab.

**Expected Result:**
- Each tab shows items of that type that were moved to trash.
- Active tab has a highlighted underline (**#C3E11D**).

---

### TC-083 — Restore Item from Trash (Happy Path)

**Precondition:** At least one item is in the Trash.

**Steps:**

1. Navigate to `/dashboard/trash`.
2. Click the relevant tab (e.g., **Workspaces**).
3. Locate the trashed item.
4. Click the **"Restore"** button/icon next to the item.

**Expected Result:**
- The item is removed from the Trash list.
- The item reappears in its original location (e.g., Workspaces section on the dashboard).

---

### TC-084 — Permanently Delete Item from Trash (Happy Path)

**Precondition:** At least one item is in the Trash.

> **Warning:** Permanent deletion cannot be undone.

**Steps:**

1. Navigate to `/dashboard/trash`.
2. Click the relevant tab.
3. Locate the trashed item.
4. Click the **permanent delete** button/icon (trash icon) next to the item.
5. Confirm the deletion in the confirmation dialog.

**Expected Result:**
- The item is permanently removed.
- It no longer appears in Trash or anywhere else in the app.

---

### TC-085 — Empty Trash State

**Precondition:** Nothing has been moved to trash.

**Steps:**

1. Navigate to `/dashboard/trash`.
2. Click through each tab (Workspaces, Projects, Assistant, Assessment, Sitemap).

**Expected Result:**
- Each tab shows an empty state message (e.g., "No trashed items").

---

## 18. Document Upload & RAG

> Covered in TC-065 through TC-067 (AI Chat section). Below are additional specific tests.

---

### TC-086 — Remove a File Before Uploading

**Precondition:** On `/dashboard/knowledge-base`. A file has been selected but not yet uploaded.

**Steps:**

1. Select a file (drag & drop or browse).
2. Observe the file appears in the file list with a **trash icon**.
3. Click the **trash icon** next to the file.

**Expected Result:**
- The file is removed from the upload list.
- The **"Upload"** button count decreases or disappears.

---

### TC-087 — Upload Multiple Files

**Precondition:** On `/dashboard/knowledge-base`.

**Steps:**

1. Select three supported files (e.g., a PDF, a DOCX, and a TXT).
2. Observe all three files appear in the file list.
3. Observe the button shows **"Upload 3 file(s)"**.
4. Click **"Upload 3 file(s)"**.

**Expected Result:**
- All three files are processed.
- Each file shows its individual result: green checkmark + **"Processed & indexed"** for success, or red exclamation + error message for failure.

---

## 19. Survey

---

### TC-088 — Submit Survey / Project Info (Happy Path)

**Precondition:** An AI Assistant chat is open at `/assistant/chat/:id`.

**Steps:**

1. In the chat header, click the **"Survey Info"** button.
2. Observe the **"User Questionnaire"** modal opens.
3. Fill in the required fields in the questionnaire form.
4. Submit the form.

**Expected Result:**
- The questionnaire is submitted successfully.
- The modal closes.
- The survey data is associated with the project/folder.

---

### TC-089 — Survey (Negative Case) — Empty Submission

**Steps:**

1. Open the **"Survey Info"** modal.
2. Leave required fields empty.
3. Click Submit.

**Expected Result:**
- Validation errors appear for required fields.
- The form does not submit.

---

## 20. Feedback

---

### TC-090 — Submit Feedback (Happy Path)

**Precondition:** Logged in. Navigate to `/dashboard/feedback`.

**Steps:**

1. In the sidebar, click **"Feedback"**.
2. Observe the heading **"Feedback Form"** and the welcome note.
3. Select a feature radio button, e.g., **"AI Assistant"**.
4. Check one or more checkboxes (e.g., **Version History**, **Gallery**).
5. Click the **Submit** button.

**Expected Result:**
- Feedback is submitted successfully.
- A success notification is displayed.

---

### TC-091 — Submit Feedback (Negative Case) — No Selection

**Steps:**

1. Navigate to `/dashboard/feedback`.
2. Do not select any radio button or checkbox.
3. Click Submit.

**Expected Result:**
- Validation error shown (at least one option must be selected).
- Feedback is not submitted.

---

## 21. Digital Playbooks

---

### TC-092 — View Digital Playbook List (Happy Path)

**Precondition:** Logged in. Navigate to `/dashboard/DigitalPlaybook` or click **"Digital Playbook"** in the sidebar.

**Steps:**

1. In the sidebar, click **"Digital Playbook"**.
2. Observe the Digital Playbook page loads.
3. Observe the list of available digital playbooks (if any) fetched from `/dpb/sitemap`.

**Expected Result:**
- The page loads without errors.
- Existing playbooks are listed.
- If none exist, an empty state is shown.

---

### TC-093 — Navigate to Playbook Editor (Happy Path)

**Precondition:** At least one digital playbook exists in the list.

**Steps:**

1. On the Digital Playbook list page, click on a playbook card.
2. Observe redirect to `/playbook/:id`.
3. Observe the playbook content loads and is displayed in the editor view.

**Expected Result:**
- The playbook editor opens with the selected playbook's content.
- Content is read from the data returned by `GET /dpb/sitemap`.

> **Note:** Only viewing/reading is testable here. There is no backend API endpoint for creating, updating, or saving playbooks — those interactions are not integrated.

---

## 22. Settings & Personal Info

---

### TC-095 — View & Update Personal Information (Happy Path)

**Precondition:** Logged in. Navigate to `/dashboard/settings`.

**Steps:**

1. In the sidebar, click **"Settings"**.
2. Observe the heading **"Settings"** and the **Personal Information** tab (active by default).
3. Observe the current profile fields (First Name, Last Name, Email, profile photo, etc.).
4. Edit the **First Name** field (e.g., change it to `UpdatedName`).
5. Save the changes (click **Save** or equivalent button).

**Expected Result:**
- The profile information is updated.
- The updated name reflects in the header avatar/initials.

---

### TC-096 — Upload Profile Photo (Happy Path)

**Precondition:** On `/dashboard/settings` in the Personal Information tab.

**Steps:**

1. Locate the profile photo area.
2. Click to upload a new photo (or drag & drop a valid image file).
3. Confirm/save the upload.

**Expected Result:**
- The profile photo is updated.
- The new photo appears in the header and settings page.

---

### TC-097 — Logout (Happy Path)

**Precondition:** Logged in on any dashboard page.

**Steps:**

1. Click the **profile icon/avatar** in the top-right of the header.
2. In the dropdown, click **"Logout"** (with the logout icon).

**Expected Result:**
- The user is logged out.
- LocalStorage is cleared.
- User is redirected to `/log-in`.
- Navigating to `/dashboard` redirects back to `/log-in` (protected route).

---

### TC-098 — Access Protected Route While Logged Out (Negative Case)

**Precondition:** Not logged in (or after logging out).

**Steps:**

1. Directly navigate to `http://localhost:5173/dashboard` in the browser.

**Expected Result:**
- The user is redirected to `/log-in`.
- The dashboard is not accessible without authentication.

---

## Appendix A: Known Issues to Watch For

| Issue | What to check during testing |
|-------|------------------------------|
| Typo in endpoint `/chat/imporve-writing` | TC-073: Verify **Improve Writing** feature works correctly despite the endpoint typo |
| Streaming chat uses a hardcoded external fallback URL | TC-063: If streaming fails, the app may fall back to `https://cmp-ai-check.onrender.com` — check network tab |
| `useManagerUser.js` / `useManagerChat.js` legacy patterns | These may be used in collaboration and chat management — if certain actions fail, check for legacy endpoint mismatches |

---

## Appendix B: Removed Test Cases — Features Confirmed Not Integrated

The following test cases were removed after a full source code audit. Each was verified by reading the actual component and hook files. They are **not connected to a working backend API** and cannot be meaningfully tested against the frontend.

---

### REMOVED: TC-099 — Notification Bell

**Why removed:**
The notification bell icon (`CiBellOn`) renders in the header via `Header.jsx` and the `NotificationDropdown` component exists in the codebase — but the dropdown is hardwired to an **empty array**. There is no API call to fetch notifications, no endpoint defined in `workspaceApi.js` or any slice, and the "mark all as read" handler is a no-op. The red dot indicator has no data source.

**What exists in code:** UI shell only — bell icon, dropdown component, empty list rendering.  
**What is missing:** Any API call, any notification endpoint, any real data.

---

### REMOVED: TC-094 — Create a New Playbook

**Why removed:**
The entire Digital Playbooks backend API surface consists of a single endpoint: `GET /dpb/sitemap` (listing). There is **no `POST`, `PUT`, or `DELETE` endpoint** for playbooks anywhere in `workspaceApi.js`, any slice, or any hook file. The "Create Playbook" button in the UI, if present, has no backend call behind it. Saving or creating a playbook produces no persisted result.

**What exists in code:** `GET /dpb/sitemap` call in `Playbook-List.jsx` to list existing playbooks. Playbook editor UI (`/playbook/:id`).  
**What is missing:** Create, update, delete, and save API endpoints and their UI wiring.

---

*End of Manual E2E Test Cases*
