# 🚀 START HERE - FlintCal Setup

Welcome to FlintCal! This guide will get you up and running in **under 5 minutes**.

---

## ⚡ Super Quick Start (3 Steps)

### Step 1: Install Dependencies (2 minutes)

Open Terminal and run:

```bash
cd "/Users/flint/Library/Mobile Documents/com~apple~CloudDocs/Developer Cloud/flintcal"
npm install
```

Wait for installation to complete...

### Step 2: Set Up Database (1 minute)

1. Go to [supabase.com](https://supabase.com)
2. Log in (or create free account)
3. Your project is already configured with:
   - URL: `https://lyistsfbpqbqiwvbtjjr.supabase.co`
   - Key: (in .env file)
4. Click "SQL Editor" → "New Query"
5. Copy contents of `supabase-setup.sql`
6. Paste and click "Run"
7. See "Success" ✅

### Step 3: Start the App (30 seconds)

```bash
npm run dev
```

Open your browser to: **http://localhost:3000**

🎉 **Done!** Your calendar is now running!

---

## 🎨 Quick Customization (Optional - 5 minutes)

### Change Users

1. Open `config.js` in any text editor
2. Find the `users` array (around line 15)
3. Edit names and colors:

```javascript
users: [
  {
    name: 'Your Names Here',  // ← Change this
    color: '#2196F3',          // ← And this
    displayColor: '#1976D2',
    textColor: '#FFFFFF'
  },
  // Add more users...
]
```

4. Save file
5. App auto-reloads!

### Change Date Range

In the same `config.js` file, find `dateRange` (around line 40):

```javascript
dateRange: {
  startMonth: 1,     // ← January (1-12)
  startYear: 2026,   // ← Change year
  endMonth: 12,      // ← December
  endYear: 2026
}
```

Save and the calendar updates!

### Replace Logo

1. Create or find your logo (512x512px PNG works best)
2. Name it `FlintCal_Logo.png`
3. Replace the file in the `public/` folder
4. Refresh browser

---

## 📱 Test It Out

1. **Select a user** - Click any user chip at top
2. **Pick dates** - Click calendar dates to select
3. **Toggle dates** - Click again to deselect
4. **Test real-time** - Open 2 browser windows and watch changes sync!

---

## 📚 Need More Help?

### Quick Guides (In Order)
1. **PROJECT_SUMMARY.md** - Project overview
2. **QUICKSTART.md** - Detailed 5-min setup
3. **CONFIGURATION.md** - Full customization guide
4. **DEPLOYMENT.md** - Deploy to production

### Quick References
- **FILE_STRUCTURE.md** - What each file does
- **config.examples.js** - 10 example setups
- **README.md** - Complete documentation

### Already Configured
✅ Supabase credentials (.env file)  
✅ 4 default users  
✅ Oct-Dec 2025 date range  
✅ Dark mode theme  
✅ All features enabled  

---

## 🎯 Your Next Steps

### Just Testing?
- You're done! Start using the app at localhost:3000

### Want to Customize?
- Edit `config.js` (users, dates, colors)
- Replace logo in `public/` folder
- See `CONFIGURATION.md` for examples

### Ready to Deploy?
- Test everything locally first
- Open `DEPLOYMENT.md`
- Choose platform (Netlify recommended)
- Follow 3-step deployment guide

---

## ✅ Verify Everything Works

Try these to confirm setup:

- [ ] App loads at localhost:3000
- [ ] All 4 users display at top
- [ ] Calendar shows October 2025
- [ ] Can click dates to select
- [ ] Dates highlight in blue/green/orange/purple
- [ ] Can navigate to November/December
- [ ] Footer shows "Connected" status

---

## 🐛 Common Issues

### "Module not found"
```bash
npm install
```

### "Cannot connect to database"
- Verify you ran `supabase-setup.sql`
- Check `.env` file exists
- Confirm Supabase project is active

### "Port already in use"
- Stop other dev servers
- Or change port in `vite.config.js`

### Still stuck?
- Check browser console (F12)
- Read `README.md` troubleshooting section
- Verify all steps above completed

---

## 💡 Pro Tips

- **Always test locally** before deploying
- **Edit `config.js`** for most changes
- **Keep backups** of your config
- **Check examples** in `config.examples.js`
- **Read inline comments** - they're helpful!

---

## 🎉 You're All Set!

Your FlintCal is ready! Here's what you can do:

✅ **Track availability** for multiple users  
✅ **See changes instantly** across all devices  
✅ **Easy customization** via config.js  
✅ **Beautiful UI** with Material Design  
✅ **Mobile friendly** - use on any device  

---

## 📞 Quick Reference Card

| What | Where | How |
|------|-------|-----|
| Start app | Terminal | `npm run dev` |
| Change users | config.js | Edit `users` array |
| Change dates | config.js | Edit `dateRange` |
| Replace logo | public/ | Replace PNG file |
| Deploy | Terminal | See DEPLOYMENT.md |
| Docs | Root folder | Open README.md |

---

## 🚦 Status Check

Current status:
- ✅ All files created (24 files)
- ✅ Dependencies configured
- ✅ Database credentials set
- ✅ Default users configured
- ✅ Documentation complete
- ⏳ Waiting for: `npm install`

---

**Ready? Run these two commands:**

```bash
npm install
npm run dev
```

**Then open:** http://localhost:3000

---

**🎊 Enjoy your new availability calendar!**

*Questions? Check the other documentation files in this folder.*
