# CMS Setup For Vihana Foundation

The CMS is available at:

```txt
/admin
```

After deployment, open:

```txt
https://your-vercel-link.vercel.app/admin
```

## What The CMS Can Do

- Edit homepage text.
- Change hero image.
- Change hero button text and links.
- Edit donation details.
- Edit top navigation links.
- Add links to custom pages or page sections.
- Edit homepage cards, stats and action blocks.
- Add new website pages.
- Publish or unpublish pages.
- Add gallery items.
- Upload small gallery images.
- Delete gallery items.
- View volunteer/contact submissions.

## Vercel Environment Variables Needed

Add these in Vercel Project Settings:

```txt
ADMIN_PASSWORD
FIREBASE_CLIENT_EMAIL
FIREBASE_PRIVATE_KEY
```

You already added:

```txt
FIREBASE_PROJECT_ID
FIREBASE_WEB_API_KEY
```

## Firebase Service Account

To get the Firebase values:

1. Open Firebase Console.
2. Open the Vihana Foundation project.
3. Click the gear icon.
4. Click Project settings.
5. Click Service accounts.
6. Click Generate new private key.
7. Download the JSON file.
8. Copy these values:

```txt
client_email
private_key
```

Use them in Vercel:

```txt
FIREBASE_CLIENT_EMAIL = client_email value
FIREBASE_PRIVATE_KEY = private_key value
```

Keep the private key secret.
