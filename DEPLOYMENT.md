# Scotbase Deployment Guide

This guide explains how to deploy your Scotbase Entertainment website with Decap CMS integration to Netlify (or other hosting platforms).

## 🎯 What's Been Set Up

Your app now loads tribute acts from **both CMS and hardcoded data**:

- ✅ **CMS Data**: Acts created through Decap CMS (stored in `public/content/acts/`)
- ✅ **Hardcoded Data**: Acts from `src/data/artists.js` (fallback)
- ✅ **Hybrid System**: CMS acts take priority, hardcoded acts as backup
- ✅ **Smart Caching**: Data is cached for 5 minutes to reduce fetches

## 📦 Prerequisites

Before deploying, make sure you have:

1. A GitHub account
2. Your code pushed to a GitHub repository
3. A Netlify account (free tier works fine)

## 🚀 Deployment Steps

### Step 1: Push to GitHub

```bash
# Make sure all changes are committed
git add .
git commit -m "Set up CMS integration and deployment"
git push origin main
```

### Step 2: Deploy to Netlify

#### Option A: Deploy via Netlify UI (Recommended)

1. Go to [netlify.com](https://netlify.com) and sign in
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"GitHub"** and authorize Netlify
4. Select your `scotbaseV2` repository (in your Scotbase organization)
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
   - **Branch**: `main`
6. Click **"Deploy site"**

#### Option B: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

### Step 3: Enable Netlify Identity (for CMS Authentication)

1. In your Netlify dashboard, go to your site
2. Click **"Site configuration"** → **"Identity"**
3. Click **"Enable Identity"**
4. Under **"Registration preferences"**, select **"Invite only"** (recommended)
5. Under **"Services"** → **"Git Gateway"**, click **"Enable Git Gateway"**

### Step 4: Invite Yourself as CMS User

1. In Netlify dashboard, go to **"Identity"** tab
2. Click **"Invite users"**
3. Enter your email address
4. Check your email and accept the invitation
5. Set a password

### Step 5: Access Your CMS

1. Go to `https://your-site-name.netlify.app/admin/`
2. Log in with your Identity credentials
3. You can now create, edit, and delete tribute acts!

## 📝 Using the CMS

### Creating a New Act

1. Go to `/admin/` on your deployed site
2. Click **"Tribute Acts"** → **"New Tribute Acts"**
3. Fill in the form:
   - **Act Name**: Full name of the tribute act
   - **Tribute To**: Who they're paying tribute to
   - **Image**: Upload an image or leave blank for placeholder
   - **Genre**: Select from dropdown
   - **Location**: Where they're based
   - **Price Range**: e.g., "£800 - £1,500"
   - **Description**: Detailed description
   - **Featured**: Check if this should be a featured act
   - **Availability**: Available/Limited/Booked
   - **Booking Count**: Number of bookings (affects "Most Popular")
   - **Tags**: Add searchable tags
   - **Categories**: Add categories
   - **Keywords**: Add SEO keywords
4. Click **"Publish"**

### What Happens When You Publish

1. CMS creates a markdown file in `public/content/acts/`
2. Commits the file to your GitHub repository
3. Netlify detects the commit and rebuilds your site
4. New act appears on your website within 1-2 minutes!

## 🔄 How Data Loading Works

### Data Priority

1. **CMS Acts** (from `public/content/acts/*.md`) - loaded first
2. **Hardcoded Acts** (from `src/data/artists.js`) - loaded as backup
3. **Combined** - Both are merged and displayed together

### Caching

- Data is cached for **5 minutes** after first load
- Reduces unnecessary file fetches
- Can be cleared by refreshing the page

### Console Messages

Check your browser console to see what's loading:
- ✅ `Loaded X acts from CMS, Y hardcoded acts` - Success!
- ⚠️ `Failed to load from CMS, using hardcoded data` - CMS unavailable, using fallback
- 📦 `Using X hardcoded acts only` - No CMS data found

## 🎨 Customizing the CMS

### Adding New Fields

Edit `public/admin/config.yml`:

```yaml
fields:
  - { label: "New Field", name: "newField", widget: "string" }
```

### Changing the Backend

For different git providers:

```yaml
# GitHub (via Netlify)
backend:
  name: git-gateway
  branch: main

# Direct GitHub (requires GitHub OAuth app)
backend:
  name: github
  repo: Scotbase/scotbaseV2
  branch: main

# GitLab
backend:
  name: gitlab
  repo: your-username/scotbaseV2
```

## 🐛 Troubleshooting

### CMS Shows "Error: Failed to load"

- Check that Git Gateway is enabled in Netlify
- Make sure you're logged in to Netlify Identity
- Check browser console for specific errors

### Acts Not Appearing After Publishing

- Wait 1-2 minutes for Netlify to rebuild
- Check GitHub to confirm the file was committed
- Check the Network tab in DevTools to see if `/content/acts/*.md` is loading
- Check console for error messages

### "404 Not Found" for Act Files

- Make sure `public/content/acts/` folder exists
- Commit and push the folder to GitHub
- Make sure Netlify is deploying the `build` folder

### Images Not Loading

- Use the placeholder image (handled automatically)
- Or upload images through the CMS (stored in `public/images/`)
- Or use external image URLs

## 📊 Monitoring

### Check What's Loading

Add this to your browser console:

```javascript
// See all loaded acts
getAllArtists().then(acts => console.table(acts));

// See only CMS acts
getCMSActs().then(acts => console.table(acts));

// Force refresh data
clearCache();
getAllArtists().then(acts => console.log('Fresh data:', acts));
```

### Netlify Deploy Logs

- Go to Netlify dashboard → **"Deploys"**
- Click on a deploy to see build logs
- Check for any errors during build

## 🎯 Best Practices

1. **Start with CMS**: Add new acts through CMS rather than code
2. **Keep Hardcoded as Backup**: Keep `artists.js` for important acts
3. **Test Locally First**: Use test-repo mode before deploying
4. **Regular Backups**: Your acts are in GitHub, so they're backed up!
5. **Monitor Performance**: Check load times with lots of acts

## 🔐 Security

- **Invite only**: Keep registration set to "Invite only"
- **Role-based access**: Use Netlify Identity roles if needed
- **Git commits**: All changes are tracked in Git history
- **Revert changes**: You can revert bad commits in GitHub

## 📱 Next Steps

1. ✅ Deploy to Netlify
2. ✅ Enable Identity & Git Gateway
3. ✅ Create your first CMS act
4. ✅ Add all your tribute acts via CMS
5. ⏭️ Eventually remove `artists.js` once all acts are in CMS
6. ⏭️ Set up custom domain (optional)
7. ⏭️ Set up analytics (optional)

## 🆘 Need Help?

- Decap CMS docs: https://decapcms.org/docs/
- Netlify docs: https://docs.netlify.com/
- Check the browser console for detailed error messages
- Check GitHub commits to see what the CMS is doing

---

Happy deploying! 🎉 Your Scotbase site is ready for production.

