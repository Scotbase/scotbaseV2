# Decap CMS Setup Guide

## What's Been Set Up

✅ **Decap CMS Configuration** (`public/admin/config.yml`)
- Configured to manage tribute acts
- Points to `public/content/acts` folder for storing act data

✅ **Sample Act Created** (`public/content/acts/abba-a-rival-quartet.md`)
- Example ABBA tribute act with all fields

✅ **CMS Helper Functions** (`src/utils/cmsHelper.js`)
- `fetchActFromCMS(id)` - Fetch a single act
- `parseMarkdownAct()` - Parse markdown frontmatter
- `fetchActsFromCMS()` - Fetch all acts

✅ **Test Component** (`src/components/CMSTestAct.js`)
- Displays on home page to show CMS is working
- Loads the ABBA act from CMS

## Next Steps

### 1. Install Required Package

```bash
npm install gray-matter
```

### 2. Start Your App

```bash
npm start
```

### 3. View the CMS Test

Open your browser and you should see:
- A section titled "🚀 CMS Demo - Act Loaded from Decap CMS"
- The ABBA Rival Quartet act loaded from the CMS
- A green badge saying "✅ Loaded from Decap CMS"

### 4. Access the CMS Admin (Optional)

To edit acts through the CMS interface:

1. Navigate to `http://localhost:3000/admin/`
2. You'll need to set up authentication (Git Gateway + Netlify Identity)
3. For now, you can manually edit the markdown files in `public/content/acts/`

## How It Works

1. Acts are stored as markdown files with YAML frontmatter in `public/content/acts/`
2. The app fetches these files at runtime
3. The `cmsHelper` parses the markdown and converts it to act objects
4. Acts can be displayed just like the hardcoded ones in `artists.js`

## Adding More Acts

### Option A: Through the CMS (requires auth setup)
1. Go to `/admin/`
2. Click "Tribute Acts"
3. Click "New Tribute Acts"
4. Fill in the form
5. Click "Publish"

### Option B: Manually (works now)
1. Create a new `.md` file in `public/content/acts/`
2. Copy the format from `abba-a-rival-quartet.md`
3. Update the frontmatter fields
4. Add the filename (without .md) to the `actFiles` array in `cmsHelper.js`

## Example Act Format

```markdown
---
title: Act Name
tribute: Who They Tribute
image: /images/act-photo.jpg
genre: Rock
location: Glasgow
price: £800 - £1,500
description: Description of the act
featured: true
availability: Available
bookingCount: 50
tags:
  - rock
  - classic
categories:
  - Rock Acts
keywords:
  - keyword1
  - keyword2
---
```

## Migrating from artists.js

Eventually, you can:
1. Create markdown files for all acts in `artists.js`
2. Update your components to use `fetchActsFromCMS()` instead of importing `artists`
3. Remove or archive `artists.js`

## Troubleshooting

**"CMS Act Not Found" error:**
- Make sure you ran `npm install gray-matter`
- Check that `/public/content/acts/abba-a-rival-quartet.md` exists
- Check browser console for specific errors

**Acts not loading:**
- Open browser DevTools > Network tab
- Look for failed requests to `/content/acts/*.md`
- Make sure markdown files have proper frontmatter between `---` markers

