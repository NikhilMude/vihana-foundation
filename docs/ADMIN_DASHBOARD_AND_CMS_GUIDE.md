# Admin Dashboard And CMS Guide

Vihana Foundation has two private management areas:

- CMS: controls website content.
- Admin Operations Dashboard: controls donations, donors, accounting, receipts, reports and dashboard users.

Both use admin access, but they should be treated as separate responsibilities.

## Login Flow

Use the Donor Login button on the website.

The system identifies the account type automatically:

- Donor user goes to the donor portal.
- Admin or dashboard user goes to the Admin Operations Dashboard.

The old CMS login page still exists at `/admin`, but daily admin work should start from the normal login flow.

## CMS

CMS URL:

```txt
/admin/dashboard
```

Use the CMS for website content only.

### What You Can Manage In CMS

- Website logo
- Favicon
- Brand name
- Tagline
- Color palette
- Hero image
- Hero headline, subtitle and buttons
- Navigation links
- Homepage page-builder sections
- About, Mission, Programs, Impact, Gallery and Contact content
- Team members
- Gallery images
- Events and activities
- FAQ content
- Testimonials
- Newsletter text and templates
- Legal page content
- Donation display text
- Receipt design text and receipt number settings
- Email templates
- Social media icons and links
- Visitor list
- Website messages

### CMS Search

Use the global CMS search to quickly find content.

Examples:

- Search `logo` to update the website logo.
- Search `FAQ` to update questions and answers.
- Search `receipt` to update receipt wording and numbering.
- Search `newsletter` to update newsletter text and email templates.

Clicking a search result opens the matching CMS section.

### CMS Content Safety Guide

Use these limits to avoid breaking the website layout:

- Hero headline: 3 to 8 words.
- Hero subtitle: 1 to 2 short sentences.
- Button text: 2 to 4 words.
- FAQ question: under 120 characters.
- FAQ answer: under 500 characters.
- Event title: under 80 characters.
- Event summary: under 250 characters.
- Team member name: under 50 characters.
- Team member role: under 50 characters.
- Gallery title: under 70 characters.
- Gallery description: under 200 characters.

### Image Upload Guide

Recommended image sizes:

- Website logo: transparent PNG or SVG, around 512 x 512 or wider horizontal logo.
- Favicon: square PNG/SVG, 512 x 512.
- Hero image: 1600 x 1000 or larger, landscape.
- Gallery image: 1200 x 900 or larger.
- Team photo: 800 x 800 square or 1000 x 750 landscape.
- Event image: 1200 x 800 landscape.
- Story image: 1200 x 900.
- Receipt logo: transparent PNG/SVG, square or horizontal, avoid very tall artwork.

Avoid:

- Blurry screenshots.
- Very small images.
- Images with text embedded.
- Heavy files above 1 MB where possible.
- Photos without consent.

### CMS Save Rule

After changing CMS content, click Save.

If the website does not update immediately:

- Refresh the website.
- Wait a few seconds.
- Confirm the section is visible/enabled in CMS.

## Admin Operations Dashboard

Dashboard URL:

```txt
/admin/operations
```

Use this area for operations, accounting and donation management.

### Dashboard Overview

The dashboard shows:

- Total received
- This month received
- Expenses
- Net balance
- Donation charts
- Financial year summaries
- Donor-specific totals
- Saved custom reports

### Donations And Receipts

Admins can:

- Record cash donations.
- Record UPI/bank/offline donations.
- Generate receipts.
- Download receipt PDFs.
- Search donations.
- Filter by donor, month and financial year.
- Import donations in bulk.
- Download sample donation Excel sheet.
- Create test donation data for dashboard testing.

Bulk donation fields:

```txt
Donor full name, email, phone, Amount, Date, Payment Method, Purpose, PAN, Address
```

If donor email or name matches an existing donor, the donation is marked as:

```txt
Account Holder Donor
```

If no match is found, the donation is marked as:

```txt
Non Account Holder Donor
```

When the uploaded sheet contains a valid email address and the donor does not already exist, the system can create a donor account automatically. The temporary password is:

```txt
Vihana@123
```

Ask the donor to reset the password after first login.

### Donor Management

Admins can:

- Create donor accounts.
- Update donor profiles.
- Reset donor passwords.
- View donor donation history.
- Search donors.
- Use donor data for receipts and reports.

### Accounting

Admins can record:

- Donations
- Expenses
- Receipts
- Bills
- Annual statement entries
- References and notes

Use accounting records for transparency and internal review. Final statutory reports should be reviewed by an accountant.

### Reports

Reports can show:

- Donation totals by donor.
- Donation totals by purpose.
- Donation totals by month.
- Donation totals by financial year.
- Payment method split.
- Account holder vs non-account holder donor split.
- Expense summaries.

Admins can build and save custom dashboard widgets similar to a Jira-style dashboard.

### Dashboard Users And Permissions

Admins can create users with module-level access.

Common permission examples:

- CMS view/edit
- Donations view/create/edit/delete
- Receipts view/export
- Accounting view/create/delete
- Reports view/export
- Donor create/edit/view
- Dashboard user create/edit/delete
- Messages view

Use least access:

- Volunteers should not get accounting permissions.
- Data-entry users should not get delete permissions unless needed.
- CMS editors should not automatically get donation/accounting access.

### Logout

Use the Logout button in the dashboard or CMS header.

If logout does not appear to work:

- Refresh the page.
- Close and reopen the browser.
- Clear site cookies if needed.

## Operational Checklist

Before public launch:

- Create at least one owner admin.
- Create one dashboard user for testing.
- Create one donor test account.
- Add one cash donation and download receipt.
- Add one bulk donation CSV and confirm receipts.
- Test donor login and receipt download.
- Test CMS edit and save.
- Test contact form.
- Test newsletter form.
- Confirm emails arrive.
- Confirm dummy payment details are replaced.
- Confirm legal text is reviewed.
