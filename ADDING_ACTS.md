# Adding New Acts to the CMS

## Quick Guide

When you create a new act in the CMS at `/admin/`, you need to add it to the code so it loads on the site.

### Step 1: Create Act in CMS

1. Go to `your-site.com/admin/`
2. Log in
3. Click "Tribute Acts" → "New Tribute Acts"
4. Fill in the form (all fields optional):
   - Act Name
   - Tribute To
   - Parent Category (Female Vocalists, Male Vocalists, Bands, etc.)
   - Genre
   - Location
   - Price Range
   - Description
   - Featured (checkbox)
   - Availability
   - Booking Count
   - Tags, Categories, Keywords
5. Click **"Publish"**

The CMS will create a file like: `public/content/acts/your-act-name.md`

### Step 2: Add to Code

Open `src/utils/cmsHelper.js` and add the filename to the `actFiles` array:

```javascript
const actFiles = [
  'abba-a-rival-quartet',
  'your-act-name',  // ← Add your new act slug here (without .md)
  // Add more acts here...
];
```

**The slug is the URL-friendly version of your act name:**
- Spaces become dashes
- Lowercase
- Special characters removed

Examples:
- "Queen Revival Band" → `queen-revival-band`
- "Amy Winehouse Tribute" → `amy-winehouse-tribute`
- "Take That Experience" → `take-that-experience`

### Step 3: Commit and Push

```bash
git add .
git commit -m "Added new act: Your Act Name"
git push
```

Netlify will automatically rebuild and your new act will appear!

## Alternative: Automatic Discovery (Future Enhancement)

Currently, you need to manually add each act to the `actFiles` array. In the future, this could be automated with:

1. **Build-time script** - Generate the list during `npm run build`
2. **API endpoint** - Fetch list of files from server
3. **Webpack loader** - Auto-import all markdown files

For now, the manual approach ensures you have control over which acts appear on the site.

## Tip: Viewing All Your Acts

Check the files in `public/content/acts/` to see all acts created through the CMS.

```bash
ls public/content/acts/
```

Each `.md` file is an act!

