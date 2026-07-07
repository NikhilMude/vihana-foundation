# Vihana Foundation Launch Guide

This guide is for finishing the website without needing to be a developer.

## 1. Replace Placeholder Details

Before sharing the website publicly, update these items:

- Email address: `hello@vihanafoundation.org`
- Phone number: `+91 98765 43210`
- UPI ID: `vihanafoundation@upi`
- Bank details in the Donate section
- Real photos in the Gallery section
- Real impact numbers once confirmed

## 2. Firebase Setup

Use Firebase to save messages from the website contact form.

1. Open Firebase.
2. Select your Vihana Foundation project.
3. Go to Project settings.
4. Copy the Project ID.
5. Copy the Web API Key.
6. Go to Firestore Database.
7. Create a database.
8. Start in production mode.
9. Add this rule while testing the website:

```txt
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /websiteMessages/{messageId} {
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
```

This lets visitors send messages but does not let them read private messages.

## 3. Local Environment File

Create a file named `.env.local` in the main project folder.

Add your Firebase details:

```txt
FIREBASE_PROJECT_ID=your-real-project-id
FIREBASE_WEB_API_KEY=your-real-web-api-key
```

Restart the website after saving this file.

## 4. Vercel Setup

1. Open Vercel.
2. Import this project from GitHub.
3. Open Project Settings.
4. Go to Environment Variables.
5. Add:

```txt
FIREBASE_PROJECT_ID
FIREBASE_WEB_API_KEY
```

6. Paste the same values from Firebase.
7. Deploy again.

## 5. Before Going Live

Check these items:

- Contact form sends a message to Firebase.
- Donate section has verified payment details.
- Phone and email are real.
- Gallery has real images.
- The domain is connected in Vercel.
- The website opens correctly on mobile.

## 6. Recommended Next Steps

- Buy or connect a domain such as `vihanafoundation.org`.
- Create a foundation email address.
- Add the charity registration details when available.
- Add privacy policy and donation terms before accepting public donations.
