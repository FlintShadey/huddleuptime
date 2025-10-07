# FlintCal Deployment Guide

This guide will help you deploy FlintCal to various hosting platforms.

## 🌐 Deployment Options

- **GitHub Pages** - Free, easy setup, works well for static sites
- **Netlify** - Free tier, automatic deployments, great for Vue apps
- **Vercel** - Free tier, excellent performance, serverless functions
- **Other** - Any static hosting provider (Firebase, Cloudflare Pages, etc.)

---

## 📦 Pre-Deployment Checklist

Before deploying, make sure:

- ✅ App works correctly locally (`npm run dev`)
- ✅ Supabase database is set up and working
- ✅ `.env` file has correct Supabase credentials
- ✅ `config.js` has your desired users and date range
- ✅ Logo file exists at `public/FlintCal_Logo.png`
- ✅ All tests pass (click dates, switch users, check real-time)

---

## 1️⃣ GitHub Pages Deployment

### Prerequisites
- GitHub account
- Git installed
- Your project in a GitHub repository

### Steps

#### A. Update Vite Config

Edit `vite.config.js` and uncomment the base path:

```javascript
export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: '/flintcal/',  // ⚠️ CHANGE THIS to your repo name
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
```

**Important:** Replace `/flintcal/` with `/your-repo-name/`

#### B. Build and Deploy

```bash
# Build the production version
npm run build

# Deploy to GitHub Pages
npm run deploy
```

#### C. Enable GitHub Pages

1. Go to your GitHub repository
2. Click **Settings** → **Pages**
3. Under "Source", select **gh-pages** branch
4. Click **Save**
5. Wait 1-2 minutes for deployment

Your app will be available at: `https://yourusername.github.io/flintcal/`

### Troubleshooting GitHub Pages

**Issue: Blank page after deployment**
- Make sure `base` in `vite.config.js` matches your repo name
- Check browser console for 404 errors on assets

**Issue: 404 errors**
- Verify the `base` path starts and ends with `/`
- Example: `base: '/my-repo/'` ✅
- Not: `base: 'my-repo'` ❌

---

## 2️⃣ Netlify Deployment

### Option A: Deploy via Git (Recommended)

#### 1. Push to GitHub/GitLab
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_REPO_URL
git push -u origin main
```

#### 2. Connect to Netlify
1. Go to [netlify.com](https://netlify.com) and sign up
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect your Git provider (GitHub/GitLab)
4. Select your repository

#### 3. Configure Build Settings
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- Click **"Deploy site"**

#### 4. Add Environment Variables
1. In Netlify dashboard, go to **Site settings** → **Environment variables**
2. Add:
   - `VITE_SUPABASE_URL` = your Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = your anon key
3. Redeploy if needed

### Option B: Manual Deploy

```bash
# Build the app
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

Your site will be at: `https://random-name.netlify.app`

You can customize the domain in Netlify settings.

---

## 3️⃣ Vercel Deployment

### Option A: Deploy via Git (Recommended)

#### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_REPO_URL
git push -u origin main
```

#### 2. Import to Vercel
1. Go to [vercel.com](https://vercel.com) and sign up
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository

#### 3. Configure Project
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- Click **"Deploy"**

#### 4. Add Environment Variables
1. Go to **Settings** → **Environment Variables**
2. Add:
   - `VITE_SUPABASE_URL` = your Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = your anon key
3. Redeploy

### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts
# Select "Continue with Git" for auto-deployments
```

Your site will be at: `https://flintcal.vercel.app`

---

## 4️⃣ Other Platforms

### Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Build
npm run build

# Deploy
firebase deploy
```

### Cloudflare Pages

1. Push your code to GitHub
2. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
3. Click **"Create a project"**
4. Connect repository
5. Build settings:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
6. Add environment variables
7. Deploy

---

## 🔐 Environment Variables

All platforms need these environment variables:

| Variable | Value | Where to Get It |
|----------|-------|-----------------|
| `VITE_SUPABASE_URL` | `https://xxx.supabase.co` | Supabase Project Settings → API |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGc...` | Supabase Project Settings → API → anon public |

### How to Add Environment Variables

**Netlify:**
- Site settings → Environment variables → Add variable

**Vercel:**
- Settings → Environment Variables → Add

**GitHub Pages:**
- Not needed (use .env file, it's included in build)

**Other platforms:**
- Look for "Environment Variables" or "Build Environment" settings

---

## 🚀 Post-Deployment

### Verify Everything Works

1. ✅ Site loads without errors
2. ✅ Logo appears
3. ✅ User chips display
4. ✅ Calendar shows correct months
5. ✅ Can select dates
6. ✅ Changes save to database
7. ✅ Real-time sync works (test with 2 browsers)
8. ✅ Mobile responsive

### Test Real-Time Sync

1. Open your deployed site in 2 browser windows
2. Select different users in each
3. Click dates in one window
4. Verify they appear in the other window

### Common Issues

**Issue: Environment variables not working**
- Redeploy after adding variables
- Make sure variable names start with `VITE_`
- Check variable values are exactly correct (no extra spaces)

**Issue: Real-time not working**
- Check Supabase real-time is enabled
- Verify WebSocket connections aren't blocked
- Check browser console for errors

**Issue: Styles broken**
- Check that all CSS imports are present
- Verify Vuetify is properly configured
- Clear browser cache

---

## 🔄 Automatic Deployments

### GitHub Pages
Every time you run `npm run deploy`, it deploys automatically.

### Netlify & Vercel (Git-based)
Automatically deploy when you push to main branch:

```bash
# Make changes
git add .
git commit -m "Update users"
git push

# Deployment happens automatically! 🎉
```

### Trigger Manual Deploy

**Netlify:**
- Dashboard → Deploys → Trigger deploy → Deploy site

**Vercel:**
- Dashboard → Deployments → Redeploy

---

## 🌐 Custom Domain

### Netlify
1. Domain settings → Add custom domain
2. Follow DNS instructions
3. Enable HTTPS (automatic)

### Vercel
1. Settings → Domains → Add
2. Configure DNS
3. HTTPS is automatic

### GitHub Pages
1. Settings → Pages → Custom domain
2. Add CNAME file: `echo "yourdomain.com" > CNAME`
3. Configure DNS:
   - Type: A
   - Name: @
   - Value: GitHub IPs (see their docs)

---

## 📊 Performance Tips

### Optimize Build

1. **Enable sourcemaps only for debugging:**
   ```javascript
   // vite.config.js
   build: {
     sourcemap: false  // Smaller builds
   }
   ```

2. **Use compression:**
   Most platforms (Netlify, Vercel) auto-compress

3. **Enable caching:**
   Configured by default in Vite

### Monitor Performance

- Use Chrome DevTools Lighthouse
- Check bundle size: `npm run build` shows sizes
- Test on slow 3G connection

---

## 🔒 Security Best Practices

### Row Level Security (RLS)

For production with sensitive data, update Supabase policies:

```sql
-- Remove the public policy
DROP POLICY "Allow all operations on user_availability" ON user_availability;

-- Add authenticated-only policy
CREATE POLICY "Authenticated users can manage dates"
    ON user_availability
    FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');
```

Then add authentication to your app.

### Environment Variables

- ✅ Store credentials in environment variables
- ✅ Never commit `.env` to Git
- ✅ Use different Supabase projects for dev/prod

---

## 📝 Deployment Checklist

Before going live:

- [ ] Test all features locally
- [ ] Update `config.js` with production users
- [ ] Add real logo to `public/`
- [ ] Configure correct date range
- [ ] Set up Supabase database
- [ ] Add environment variables to platform
- [ ] Configure custom domain (optional)
- [ ] Test on multiple devices
- [ ] Test real-time sync
- [ ] Check mobile responsiveness
- [ ] Verify HTTPS is enabled
- [ ] Share link with users!

---

## 🎉 You're Live!

Congratulations! Your FlintCal app is now deployed and ready to use.

**Share your deployment:**
- Send the URL to your users
- Add it to your home screen on mobile
- Bookmark it for quick access

**Need help?** Check the main README.md troubleshooting section.

---

**Happy coordinating! 🗓️**
