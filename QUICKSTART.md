# FlintCal - Quick Start Guide

Follow these steps to get FlintCal running in under 5 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

Wait for all packages to install (this may take a minute).

## Step 2: Set Up Supabase (2 minutes)

### A. Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign up (free)
2. Click "New Project"
3. Choose a name, database password, and region
4. Wait for project to be ready (~2 minutes)

### B. Create Database Table
1. In your Supabase project, click "SQL Editor" in the sidebar
2. Click "New Query"
3. Copy and paste the contents of `supabase-setup.sql`
4. Click "Run" or press Cmd+Enter (Mac) / Ctrl+Enter (Windows)
5. You should see "Success" message

### C. Get Your Credentials
1. Click "Project Settings" (gear icon in sidebar)
2. Click "API" in the left menu
3. Copy two values:
   - **Project URL** (looks like: https://xxxxx.supabase.co)
   - **anon public key** (long string starting with eyJ...)

**Note:** Your credentials are already in the `.env` file! Just verify they're correct.

## Step 3: Customize (Optional)

### Change Users
Edit `config.js`, find the `users` array:

```javascript
users: [
  {
    name: 'Your Names Here',
    color: '#2196F3',
    displayColor: '#1976D2',
    textColor: '#FFFFFF'
  },
  // Add more users...
]
```

### Change Date Range
Edit `config.js`, find the `dateRange` object:

```javascript
dateRange: {
  startMonth: 10,    // 1-12
  startYear: 2025,
  endMonth: 12,      // 1-12
  endYear: 2025
}
```

## Step 4: Run the App

```bash
npm run dev
```

Open your browser to: **http://localhost:3000**

## Step 5: Test It Out

1. **Select a user** - Click on any user chip at the top
2. **Pick dates** - Click on calendar dates to select them
3. **Toggle dates** - Click again to deselect
4. **Test real-time** - Open a second browser window and watch changes sync!

## 🎉 You're Done!

The app is now running locally. Here's what you can do next:

### Share with Others
- Anyone on your local network can access it at `http://YOUR_IP:3000`
- Find your IP: Run `ipconfig` (Windows) or `ifconfig` (Mac/Linux)

### Deploy to Production
See the main README.md for deployment instructions to:
- GitHub Pages
- Netlify
- Vercel

## Common First-Time Issues

### "Module not found" error
```bash
npm install
```

### "Cannot connect to Supabase" error
- Check your `.env` file has correct credentials
- Make sure you ran the SQL setup script
- Verify your project is active in Supabase dashboard

### Dates don't save
- Verify the SQL setup script ran successfully
- Check browser console (F12) for errors
- Make sure RLS policy was created

### Real-time not working
- In Supabase dashboard, go to Database > Replication
- Make sure `user_availability` table is enabled
- If not, run: `ALTER PUBLICATION supabase_realtime ADD TABLE user_availability;`

## Tips for Success

✅ **Start simple** - Use the default config first, customize later  
✅ **Test locally** - Make sure everything works before deploying  
✅ **Check console** - Browser dev tools (F12) show helpful errors  
✅ **Read docs** - The main README has detailed troubleshooting  

## Need Help?

1. Check the browser console (F12) for error messages
2. Review the main README.md troubleshooting section
3. Verify your Supabase setup in the dashboard

---

**Happy scheduling! 🎉**
