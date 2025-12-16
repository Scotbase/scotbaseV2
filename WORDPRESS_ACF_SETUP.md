# WordPress ACF Configuration Guide

## ⚠️ Current Issue: 401 Unauthorized on Media Endpoint

The WordPress REST API is returning **401 Unauthorized** when trying to fetch media (images) by ID. This happens because ACF is returning image field IDs (like `icon_image: 37`) instead of full image objects.

## 🔧 Solution: Configure ACF to Return Image Objects

You need to configure your ACF fields in WordPress to return **Image Objects** instead of **Image IDs**.

### Steps to Fix:

1. **Log into WordPress Admin** at `scotbase.net/wp-admin`

2. **Navigate to ACF Field Groups**:
   - Go to **Custom Fields** > **Field Groups**
   - Find the field group for your "Act" post type

3. **Edit Image Fields**:
   - Click on each image field (`icon_image`, `detail_image`, etc.)
   - Find the setting **"Return Format"** or **"Return Value"**
   - Change it from **"Image ID"** to **"Image Array"** or **"Image Object"**
   - Save the field group

4. **Test the API**:
   Visit: `https://scotbase.net/wp-json/wp/v2/act?per_page=1`
   
   Check if `acf.icon_image` now returns an object like:
   ```json
   {
     "icon_image": {
       "id": 37,
       "url": "https://scotbase.net/wp-content/uploads/image.jpg",
       "sizes": {...}
     }
   }
   ```
   
   Instead of just:
   ```json
   {
     "icon_image": 37
   }
   ```

## 📋 Fields That Need Updating

Make sure these ACF image fields are set to return **Image Object**:
- ✅ `icon_image`
- ✅ `detail_image`
- ✅ `main_image`
- ✅ Any other image fields you're using

## 🔄 Alternative Solution: Enable Public Media Access

If you can't change the ACF return format, you could make the WordPress media endpoint publicly accessible:

### Option A: Install a Plugin
Install **"WP REST API Authentication"** or similar plugin that allows public media access.

### Option B: Add to functions.php
Add this code to your theme's `functions.php`:

```php
// Allow public access to media endpoint
add_filter('rest_prepare_attachment', function($response, $post, $request) {
    return $response;
}, 10, 3);

// Remove authentication requirement for media
add_filter('rest_authentication_errors', function($result) {
    if (!empty($result)) {
        return $result;
    }
    if (!is_user_logged_in() && $_SERVER['REQUEST_URI'] && strpos($_SERVER['REQUEST_URI'], '/wp-json/wp/v2/media/') !== false) {
        return true;
    }
    return $result;
});
```

⚠️ **Note**: This is less secure and not recommended. Better to fix the ACF return format.

## ✅ Recommended Solution

**Change ACF fields to return Image Objects** - this is the cleanest, most secure approach and will make your API responses more useful overall.

## 🧪 Testing

After making changes, test by visiting:
```
https://scotbase.net/wp-json/wp/v2/act?per_page=1&_embed
```

Look for `acf.icon_image` - it should now be an object with a `url` property, not just a number.

## 📞 Need Help?

If you're unsure about making these changes, you can:
1. Access WordPress admin
2. Contact your WordPress hosting support
3. Ask a WordPress developer to update the ACF field settings

---

**Current Status**: Code is ready to handle both formats (Image ID and Image Object), but Image Object is preferred for better performance and to avoid 401 errors.

