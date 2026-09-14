# Root Cause Analysis: Admin "Bricking" Incident

## What Happened?
The live website appeared to "brick" (go blank or 500) after clicking "GO LIVE". 

## The Root Cause: Partial Draft Injection
1.  **Vulnerability**: The `updateDraft` and `updateSiteSettings` actions fetch the current state, merge a *single* section, and then save the *entire* object back to Supabase.
2.  **Trigger**: If the "fetch" step fails (e.g., Supabase timeout) or if a previous save was partial (due to the now-fixed "hidden tabs" bug), the `draft_data` column in Supabase becomes a **partial object** (e.g., only containing the `banner` key, but missing `home`, `classes`, etc.).
3.  **The Brick**: Clicking **GO LIVE** (`publishContent`) copies this partial `draft_data` over to `live_data`.
4.  **The Crash**: The production website components (Hero, Tiles, Sections) expect a full object. When they find a partial one, they crash during Server-Side Rendering (SSR), causing a site-wide 500 error.

---

## The "Unbrickable" Solution

### 1. Mandatory Schema Validation (The Firewall)
Before `publishContent` moves data from Draft to Live, it must perform a **Structural Integrity Check**.
- **Constraint**: The `draft_data` MUST contain all top-level keys (`home`, `about`, `classesPage`, `classDetails`, `rentals`, `settings`).
- **Action**: If any key is missing, the publish is **ABORTED**, and the user is notified that the draft is corrupt and needs a sync.

### 2. Deep Merging for Updates
Refactor `updateDraft` to be even more resilient to partial state. Instead of assuming the fetched state is complete, it should handle missing keys gracefully and never overwrite a full record with a partial one if the fetch fails.

### 3. Production Telemetry
Add more robust try/catch blocks that return specific error IDs so we can track exactly which Supabase call is failing on Netlify (e.g. Auth vs Timeout vs Data integrity).

### 4. Background Revalidation
Ensure `revalidatePath` doesn't block the "Success" response, preventing Netlify from timing out the interaction.

---

## Action Plan
1. [ ] Update `src/app/actions/content.ts` with the `isDraftValid` safety guard.
2. [ ] Refactor `publishContent` to use this guard.
3. [ ] Harden `updateDraft` and `updateSiteSettings` fetch logic.
4. [ ] Sync Supabase to a healthy state one last time (already done).
