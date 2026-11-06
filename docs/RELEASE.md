# Release process

## Path to production
1. Create a branch and make the change.
2. Open a pull request into `main`. Cloudflare builds a preview URL for the branch.
3. **QA gate** (someone other than the author): run the checklist below on the preview URL.
4. If QA fails, the release does not go to production until the issue is fixed, or the owner has read the impact and approved the exception in writing in the pull request.
5. Merge to `main`. Cloudflare Pages deploys to production.
6. **Post-release validation:** run `scripts/post-release-check.sh https://mtpapasadvisory.com` and the manual checks below.

## QA checklist (preview URL)
- Page loads; no console errors; no blocked requests (CSP).
- Hero video plays on desktop, pauses with the button, and is replaced by the still image on a phone and with reduced motion on.
- Keyboard only: skip link appears, every control is reachable and shows a focus outline.
- Text and links are legible; nothing overlaps at 390 px and 1440 px wide.
- All links work; the booking link opens the Microsoft Bookings page.
- Copy check: no employer name, no phone number, no claim that isn't in the resume.

## Post-release checks
- Security headers present (script above).
- Email authentication still passes (SPF, DKIM, DMARC) by sending a test message to an outside address.
- Booking page works from an iPhone in Safari.

## Rollback
Fast path: in the Cloudflare dashboard, open Workers & Pages, choose the project, open Deployments, pick the last good production deployment and roll back to it. Then fix forward in Git: `git revert <commit>` on `main` through a pull request so the repository matches production again.

Roll back first, investigate second.
