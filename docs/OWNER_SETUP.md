# Vihana Foundation Owner Setup

This file is for you, not for developers. Follow it slowly. Do one section at a time.

## What I Can Do For You

I can build and change the website files on your computer.

I cannot log in to your Firebase, Vercel, Google, GitHub or bank accounts unless you are present and complete the login yourself.

When you reach a screen that has values I need, copy them here and I will put them into the website.

## Step 1: Firebase Contact Form Setup

The contact form needs Firebase so messages from visitors can be saved.

1. Open this website:

```txt
https://console.firebase.google.com
```

2. Sign in with your Google account.
3. Click your project for Vihana Foundation.
4. Click the gear icon near the top left.
5. Click Project settings.
6. Find Project ID.
7. Copy the Project ID and send it to me.
8. Scroll to Your apps.
9. If there is no web app, click the web icon. It looks like this:

```txt
</>
```

10. App nickname can be:

```txt
Vihana Foundation Website
```

11. Register the app.
12. Firebase will show a code box.
13. Copy only these two values and send them to me:

```txt
projectId
apiKey
```

## Step 2: Create Firestore Database

1. In Firebase, click Build.
2. Click Firestore Database.
3. Click Create database.
4. Choose Production mode.
5. Choose the location closest to your audience.
6. Click Enable.
7. Open the Rules tab.
8. Replace the rules with this:

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

9. Click Publish.

## Step 3: Vercel Website Publishing

Vercel is what puts the website on the internet.

1. Open this website:

```txt
https://vercel.com
```

2. Sign in.
3. Click Add New.
4. Click Project.
5. Import the Vihana Foundation project from GitHub.
6. Keep the default settings.
7. Before clicking Deploy, open Environment Variables.
8. Add these two names:

```txt
FIREBASE_PROJECT_ID
FIREBASE_WEB_API_KEY
```

9. Paste the Firebase values you sent me.
10. Click Deploy.

## Step 4: Donation Details

Before public launch, send me:

```txt
UPI ID:
Bank account name:
Account number:
IFSC:
Bank name:
Email:
Phone:
Address or city:
```

I will update the website with the correct details.

## Step 5: Final Launch Checklist

Do not publicly share the website until these are done:

- Contact form saves messages in Firebase.
- Donation details are real and verified.
- Phone and email are correct.
- Real photos are added.
- Domain is connected in Vercel.
- Website is checked on phone and laptop.

## Step 6: CMS Setup

The CMS lets you update website text, add gallery photos and view received messages from the website.

After the CMS code is deployed, open:

```txt
https://your-website-link.vercel.app/admin
```

Before it works on Vercel, add these Environment Variables in Vercel:

```txt
ADMIN_PASSWORD
FIREBASE_CLIENT_EMAIL
FIREBASE_PRIVATE_KEY
```

Use a strong private password for `ADMIN_PASSWORD`.

To get Firebase service account values:

1. Open Firebase Console.
2. Open your project.
3. Click the gear icon.
4. Click Project settings.
5. Click Service accounts.
6. Click Generate new private key.
7. Download the JSON file.
8. Send me these two values from that JSON file:

```txt
client_email
private_key
```

Do not post this JSON file publicly. It gives private access to your Firebase project.

After I add those values to Vercel, the CMS will be able to:

- Save homepage text.
- Add gallery photos.
- Delete gallery photos.
- Show volunteer/contact submissions.
