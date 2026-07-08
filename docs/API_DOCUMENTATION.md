# Vihana Foundation API Documentation

This document describes the website API routes used by the Vihana Foundation website, donor portal, CMS and admin dashboard.

## Base URL

Local:

```txt
http://localhost:3000
```

Production:

```txt
https://vihana-foundation-cgy6.vercel.app
```

Final domain after launch:

```txt
https://www.vihanafoundation.org
```

## Authentication

The app uses secure browser cookies.

### Visitor APIs

Visitor APIs do not require login:

- Contact form
- Newsletter signup
- Donation intent
- Visit tracking

### Donor APIs

Donor APIs require donor login cookie:

- Donor profile update
- Receipt download for donor-owned donations
- Donor logout/session checks

### Admin APIs

Admin APIs require admin login cookie and permission checks.

Admin login can happen through:

- Unified login: `/api/session/login`
- CMS login: `/api/admin/login`

Permissions are enforced per module.

## Response Format

Most JSON responses use:

```json
{
  "ok": true
}
```

Error responses use:

```json
{
  "ok": false,
  "message": "Readable error message"
}
```

## Public APIs

### Submit Contact Message

```txt
POST /api/contact
```

Body:

```json
{
  "name": "Nikhil Mude",
  "email": "nikhil@example.com",
  "phone": "9876543210",
  "interest": "Volunteer",
  "message": "I would like to help with weekend activities.",
  "company": ""
}
```

Allowed interest values:

- Birthday Campaign
- Volunteer
- Donation
- Partnership
- General

Notes:

- `company` is a hidden spam-protection field and should stay empty.
- Message is saved in Firestore.
- Admin and visitor emails are sent when email is configured.

### Newsletter Signup

```txt
POST /api/newsletter
```

Body:

```json
{
  "email": "supporter@example.com"
}
```

Notes:

- Saves subscriber in Firestore.
- Sends welcome email when email is configured.

### Record Donation Intent

```txt
POST /api/donation
```

Body:

```json
{
  "name": "Nikhil Mude",
  "email": "nikhil@example.com",
  "phone": "9876543210",
  "amount": "5000",
  "method": "UPI",
  "transactionId": "UPI123456",
  "message": "For education support",
  "donorType": "Indian Citizen",
  "frequency": "One Time",
  "purpose": "Child Education",
  "pan": "ABCDE1234F",
  "address": "Pune, Maharashtra",
  "receiptRequired": "Yes"
}
```

Notes:

- Foreign Citizen / OCI donations are blocked.
- Creates donation record.
- Generates provisional receipt number.
- Sends donor and admin email when email is configured.

### Track Visit

```txt
POST /api/visit
```

Used internally by the website analytics tracker.

## Unified Login APIs

### Unified Login

```txt
POST /api/session/login
```

Body:

```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

Result:

```json
{
  "ok": true,
  "accountType": "admin",
  "redirectTo": "/admin/operations"
}
```

or:

```json
{
  "ok": true,
  "accountType": "donor",
  "redirectTo": "/donor"
}
```

Notes:

- Admin accounts are sent to the Admin Operations Dashboard.
- Donor accounts are sent to the donor portal.
- The owner password can also login as admin if `ADMIN_PASSWORD` is configured.

## Donor APIs

### Register Donor

```txt
POST /api/donor/register
```

Body:

```json
{
  "name": "Asha Sharma",
  "email": "asha@example.com",
  "phone": "9876543210",
  "password": "password123",
  "donorType": "Indian Citizen",
  "pan": "ABCDE1234F",
  "address": "Mumbai, Maharashtra"
}
```

Notes:

- Password must be at least 8 characters.
- Foreign Citizen / OCI donor account creation is blocked.
- Creates donor cookie after successful registration.

### Donor Login

```txt
POST /api/donor/login
```

Body:

```json
{
  "email": "asha@example.com",
  "password": "password123"
}
```

### Donor Logout

```txt
POST /api/donor/logout
```

### Donor Session

```txt
GET /api/donor/session
```

Returns current donor session status.

### Update Donor Profile

```txt
PATCH /api/donor/profile
```

Body:

```json
{
  "name": "Asha Sharma",
  "phone": "9876543210",
  "pan": "ABCDE1234F",
  "address": "Mumbai, Maharashtra",
  "currentPassword": "password123",
  "newPassword": "newpassword123"
}
```

Notes:

- Donor must be logged in.
- `currentPassword` is required only when changing password.

### Download Receipt PDF

```txt
GET /api/donor/receipt?id={{donationId}}
```

Notes:

- Donor can download only their own receipt.
- Admin with receipt permission can download any receipt.
- Response is a PDF file.

## CMS APIs

### Admin CMS Login

```txt
POST /api/admin/login
```

Body:

```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

For owner password login, email may be blank when using `ADMIN_PASSWORD`.

### Admin Logout

```txt
POST /api/admin/logout
```

### Get CMS Content

```txt
GET /api/admin/content
```

Permission:

```txt
cms:view
```

### Update CMS Content

```txt
PUT /api/admin/content
```

Permission:

```txt
cms:edit
```

Body:

```json
{
  "content": {
    "brandName": "Vihana Foundation",
    "brandTagline": "Small Steps. Lifelong Impact."
  }
}
```

### Get Gallery Items

```txt
GET /api/admin/gallery
```

Permission:

```txt
cms:view
```

### Add Gallery Item

```txt
POST /api/admin/gallery
```

Permission:

```txt
cms:edit
```

Body:

```json
{
  "title": "Meal Drive",
  "description": "Fresh meals served with local volunteers.",
  "tag": "Nutrition",
  "imageUrl": "data:image/jpeg;base64,..."
}
```

### Delete Gallery Item

```txt
DELETE /api/admin/gallery?id={{galleryItemId}}
```

Permission:

```txt
cms:edit
```

### View Website Messages

```txt
GET /api/admin/messages
```

Permission:

```txt
messages:view
```

### Send Newsletter

```txt
POST /api/admin/newsletter/send
```

Used by the CMS newsletter composer.

## Admin Operations APIs

### Create Dashboard User

```txt
POST /api/admin/users
```

Permission:

```txt
users:create
```

Body:

```json
{
  "name": "Operations User",
  "email": "ops@example.com",
  "password": "password123",
  "role": "Operations",
  "permissions": ["donations:view", "donations:create", "receipts:view", "reports:view"]
}
```

### Update Dashboard User

```txt
PATCH /api/admin/users
```

Permission:

```txt
users:edit
```

Body:

```json
{
  "id": "adminUserDocumentId",
  "name": "Operations User",
  "email": "ops@example.com",
  "password": "newpassword123",
  "role": "Operations",
  "status": "Active",
  "permissions": ["donations:view", "reports:view"]
}
```

### Delete Dashboard User

```txt
DELETE /api/admin/users?id={{adminUserId}}
```

Permission:

```txt
users:delete
```

### Get Available Permissions

```txt
GET /api/admin/users
```

Permission:

```txt
users:view
```

### Create Donor Account As Admin

```txt
POST /api/admin/donors
```

Permission:

```txt
donors:create
```

Body:

```json
{
  "name": "Asha Sharma",
  "email": "asha@example.com",
  "phone": "9876543210",
  "password": "password123",
  "pan": "ABCDE1234F",
  "address": "Mumbai, Maharashtra"
}
```

### Update Donor Account As Admin

```txt
PATCH /api/admin/donors
```

Permission:

```txt
donors:edit
```

Body:

```json
{
  "id": "donorDocumentId",
  "name": "Asha Sharma",
  "email": "asha@example.com",
  "phone": "9876543210",
  "password": "newpassword123",
  "pan": "ABCDE1234F",
  "address": "Mumbai, Maharashtra"
}
```

### Record Donation As Admin

```txt
POST /api/admin/donations
```

Permission:

```txt
donations:create
```

Body:

```json
{
  "name": "Cash Donor",
  "email": "cash@example.com",
  "phone": "9876543210",
  "amount": "2500",
  "method": "Cash",
  "transactionId": "CASH-001",
  "purpose": "General Fund",
  "pan": "",
  "address": "Pune",
  "message": "Collected at event",
  "receiptRequired": "Yes"
}
```

Creates:

- Donation record
- Accounting receipt record
- Receipt number

### Bulk Import Donations

```txt
POST /api/admin/donations/bulk
```

Permission:

```txt
donations:create
```

Body:

```json
{
  "createMissingDonors": true,
  "rows": [
    {
      "name": "Asha Sharma",
      "email": "asha@example.com",
      "phone": "9876543210",
      "amount": "5000",
      "date": "2026-07-09",
      "method": "Cash",
      "purpose": "Child Education",
      "pan": "ABCDE1234F",
      "address": "Mumbai"
    }
  ]
}
```

Notes:

- Maximum 250 rows per request.
- Existing donors are matched by email, then name.
- Generates receipt and accounting record per valid row.
- When `createMissingDonors` is true, rows with valid email create donor accounts if no donor exists.
- Auto-created donor accounts use temporary password `Vihana@123`.

### Seed Test Donation Data

```txt
POST /api/admin/donations/seed-test
```

Permission:

```txt
dashboard:test
```

Use only for testing dashboard reports.

CMS must also have:

```txt
dashboardTestingEnabled = true
```

Body:

```json
{
  "rows": [
    {
      "name": "Vihana Test Donor",
      "email": "vihana.test@example.com",
      "phone": "9876500000",
      "amount": "5000",
      "date": "2026-07-09",
      "method": "Cash",
      "purpose": "Child Education",
      "pan": "",
      "address": "Test donor address"
    }
  ]
}
```

Notes:

- This endpoint creates or updates test donor accounts.
- It creates donation, receipt and accounting test records.
- Temporary password for created test donors is `Vihana@123`.
- Disable Dashboard Testing from CMS before public launch if you do not want test seeding available.

### Create Accounting Record

```txt
POST /api/admin/accounting
```

Permission:

```txt
accounting:create
```

Body:

```json
{
  "type": "Expense",
  "title": "School kit purchase",
  "amount": "12000",
  "category": "Education support",
  "date": "2026-07-09",
  "party": "Stationery vendor",
  "reference": "BILL-001",
  "status": "Paid",
  "notes": "Notebooks and pencils",
  "documentUrl": ""
}
```

### Delete Accounting Record

```txt
DELETE /api/admin/accounting?id={{accountingRecordId}}
```

Permission:

```txt
accounting:delete
```

## Environment Variables

Required for production:

```txt
ADMIN_PASSWORD
FIREBASE_PROJECT_ID
FIREBASE_WEB_API_KEY
FIREBASE_CLIENT_EMAIL
FIREBASE_PRIVATE_KEY
RESEND_API_KEY
EMAIL_FROM
```

Optional:

```txt
CONTACT_EMAIL_TO
```

Important:

- Never commit private keys to GitHub.
- Rotate any Firebase private key that was pasted into chat or shared publicly.
- Use verified sender domain for reliable email delivery.

## API Collection

An importable API collection is available at:

```txt
docs/api/vihana-foundation.postman_collection.json
```
