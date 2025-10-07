# FlintCal - File Structure Guide

This document explains every file and folder in the project.

## 📁 Project Root

```
flintcal/
├── 📄 Files you'll edit
├── 📁 Folders with code
└── 📄 Documentation
```

---

## 🎯 Files You'll Edit Most Often

### `config.js` ⭐ MOST IMPORTANT
**Purpose:** Main configuration file for users, colors, and dates  
**Edit frequency:** Often  
**What it controls:**
- User names and colors
- Date range (start/end months)
- Theme (dark/light mode)
- Feature toggles

**Quick edit:**
```javascript
users: [
  { name: 'Your Names', color: '#2196F3', ... }
]

dateRange: {
  startMonth: 10,
  startYear: 2025,
  endMonth: 12,
  endYear: 2025
}
```

### `.env` 🔐 CREDENTIALS
**Purpose:** Supabase database credentials  
**Edit frequency:** Once (already done)  
**Contains:**
- Supabase project URL
- Supabase anon key

**⚠️ Security:** Never commit to Git (already in .gitignore)

### `public/FlintCal_Logo.png` 🎨 LOGO
**Purpose:** App logo displayed in header  
**Edit frequency:** Once  
**Recommended:** 512x512px PNG with transparent background  
**Current:** SVG placeholder - replace with your logo

---

## 📦 Configuration Files

### `package.json`
**Purpose:** Project dependencies and scripts  
**Edit frequency:** Rarely  
**Contains:**
- Dependency list (Vue, Vuetify, Supabase, etc.)
- NPM scripts (dev, build, deploy)
- Project metadata

**You usually don't edit this unless adding new packages**

### `vite.config.js`
**Purpose:** Vite build tool configuration  
**Edit frequency:** Once (for deployment)  
**Edit for:**
- GitHub Pages: Uncomment `base` path
- Build optimizations

### `.gitignore`
**Purpose:** Files Git should ignore  
**Edit frequency:** Never  
**Ignores:** node_modules, .env, dist, etc.

---

## 🚀 Entry Points

### `index.html`
**Purpose:** HTML entry point  
**Edit frequency:** Rarely  
**Contains:**
- App container div
- Meta tags
- Link to main.js

### `src/main.js`
**Purpose:** JavaScript entry point  
**Edit frequency:** Rarely  
**Does:**
- Creates Vue app
- Configures Vuetify
- Registers components
- Mounts app to DOM

---

## 📱 Main Application

### `src/App.vue`
**Purpose:** Root Vue component  
**Edit frequency:** Occasionally  
**Contains:**
- App layout (header, main, footer)
- Global state management
- Real-time subscription setup
- Event handlers

**Structure:**
```vue
<template>
  <!-- UI Layout -->
</template>

<script setup>
  // Logic
</script>

<style>
  /* Global styles */
</style>
```

---

## 🧩 Components (`src/components/`)

### `UserSelector.vue`
**Purpose:** User selection UI (chips at top)  
**Edit frequency:** Rarely  
**Does:**
- Displays user chips
- Handles user selection
- Shows active user highlight

### `Calendar.vue`
**Purpose:** Main calendar display  
**Edit frequency:** Rarely  
**Does:**
- Renders monthly calendar
- Displays colored date highlights
- Handles date clicks
- Month navigation

### `LoadingState.vue`
**Purpose:** Loading indicators  
**Edit frequency:** Never  
**Shows:**
- Spinner during loading
- Error messages
- Status text

---

## 🔧 Composables (`src/composables/`)

Composables are reusable Vue composition functions.

### `useSupabase.js`
**Purpose:** Database operations  
**Edit frequency:** Rarely  
**Provides:**
- `loadAllAvailability()` - Get all dates
- `getUserDates()` - Get dates for one user
- `addUserDate()` - Add a date
- `removeUserDate()` - Remove a date
- `toggleUserDate()` - Add or remove
- `subscribeToChanges()` - Real-time updates

### `useUsers.js`
**Purpose:** User state management  
**Edit frequency:** Never  
**Provides:**
- `users` - List of all users from config
- `activeUser` - Currently selected user
- `setActiveUser()` - Change active user
- `getUserColor()` - Get user's color

### `useDates.js`
**Purpose:** Date utilities (timezone-safe)  
**Edit frequency:** Never  
**Provides:**
- `PureDate` class - Timezone-safe date handling
- `dateToString()` - Date to YYYY-MM-DD
- `stringToDate()` - YYYY-MM-DD to Date
- `getToday()` - Today's date
- `formatDate()` - Format for display
- `getMonthName()` - Month name

**Why PureDate?** Prevents timezone bugs that cause date shifts

---

## 📚 Documentation Files

### `README.md` 📖
**Purpose:** Complete project documentation  
**When to read:** Understanding the full project  
**Contains:**
- Full feature list
- Setup instructions
- Troubleshooting
- Tech stack details

### `QUICKSTART.md` ⚡
**Purpose:** 5-minute setup guide  
**When to read:** First time setup  
**Contains:**
- Step-by-step setup
- Quick commands
- Common issues

### `CONFIGURATION.md` ⚙️
**Purpose:** Customization guide  
**When to read:** Changing users or dates  
**Contains:**
- How to edit config.js
- Color examples
- Configuration examples
- Tips and tricks

### `DEPLOYMENT.md` 🚀
**Purpose:** Production deployment guide  
**When to read:** Ready to go live  
**Contains:**
- GitHub Pages setup
- Netlify deployment
- Vercel deployment
- Environment variables

### `PROJECT_SUMMARY.md` 📋
**Purpose:** Project overview and quick reference  
**When to read:** Quick refresher  
**Contains:**
- File structure summary
- Quick commands
- Common tasks
- Checklists

### `config.examples.js` 💡
**Purpose:** Configuration examples  
**When to read:** Looking for setup ideas  
**Contains:**
- 10 different config examples
- Various color schemes
- Different user counts
- Theme variations

---

## 🗄️ Database Setup

### `supabase-setup.sql`
**Purpose:** Database schema and setup  
**Edit frequency:** Once  
**Usage:**
1. Copy contents
2. Paste in Supabase SQL Editor
3. Run once
4. Done!

**Creates:**
- `user_availability` table
- Indexes for performance
- RLS policies
- Real-time subscription

---

## 📁 Folders

### `public/`
**Purpose:** Static assets (served as-is)  
**Contains:**
- Logo image
- Favicon (icon in browser tab)
- Any other static files

**Files here are accessible at `/filename`**

### `src/`
**Purpose:** Source code (processed by Vite)  
**Contains:**
- Vue components
- JavaScript files
- Composables
- Main app logic

### `src/components/`
**Purpose:** Reusable Vue components  
**Contains:** UserSelector, Calendar, LoadingState

### `src/composables/`
**Purpose:** Reusable composition functions  
**Contains:** Database, user, and date utilities

### `node_modules/`
**Purpose:** Installed dependencies  
**Note:** Generated by `npm install`, not in Git

### `dist/`
**Purpose:** Production build output  
**Note:** Generated by `npm run build`, not in Git

---

## 🎯 Common File Editing Scenarios

### Scenario 1: Change Users
**Edit:** `config.js`
```javascript
users: [
  { name: 'New Name', color: '#FF0000', ... }
]
```

### Scenario 2: Change Date Range
**Edit:** `config.js`
```javascript
dateRange: {
  startMonth: 1,
  startYear: 2026,
  endMonth: 3,
  endYear: 2026
}
```

### Scenario 3: Replace Logo
**Edit:** `public/FlintCal_Logo.png`  
Replace with your 512x512px PNG

### Scenario 4: Change App Name
**Edit:** `config.js`
```javascript
appName: 'Your New Name'
```

### Scenario 5: Switch to Light Mode
**Edit:** `config.js`
```javascript
ui: {
  theme: 'light'
}
```

### Scenario 6: Deploy to GitHub Pages
**Edit:** `vite.config.js`
```javascript
base: '/your-repo-name/'
```

---

## 🔍 File Relationships

```
index.html
  └── src/main.js
        └── App.vue
              ├── UserSelector.vue
              │     └── useUsers.js
              ├── Calendar.vue
              │     ├── useUsers.js
              │     ├── useDates.js
              │     └── config.js
              └── LoadingState.vue

config.js ──> Used by multiple components
  ├── useUsers.js
  ├── useDates.js
  └── Calendar.vue

useSupabase.js ──> Database operations
  └── App.vue (main user)

.env ──> Credentials
  └── useSupabase.js
```

---

## 📊 File Size Guide

| File | Typical Size | Notes |
|------|--------------|-------|
| `config.js` | ~2 KB | Small, easy to edit |
| `.env` | <1 KB | Just credentials |
| `App.vue` | ~6 KB | Main logic |
| `Calendar.vue` | ~5 KB | Calendar display |
| `UserSelector.vue` | ~2 KB | Simple component |
| `useSupabase.js` | ~5 KB | Database functions |
| `useDates.js` | ~4 KB | Date utilities |

---

## 🚫 Files You Should Never Edit

- `node_modules/*` - Managed by npm
- `dist/*` - Generated by build
- `.git/*` - Git internals
- `package-lock.json` - Managed by npm

---

## ✅ Edit Frequency Summary

| Frequency | Files |
|-----------|-------|
| **Often** | `config.js` |
| **Once** | `.env`, `public/FlintCal_Logo.png` |
| **Rarely** | `vite.config.js`, `src/components/*` |
| **Never** | `node_modules/*`, `dist/*`, `.gitignore` |

---

## 💡 Pro Tips

1. **Always edit `config.js` first** - Most changes happen here
2. **Keep backups** - Copy config.js before major changes
3. **Test locally** - Use `npm run dev` before deploying
4. **Read comments** - Files have helpful inline comments
5. **Check examples** - See `config.examples.js` for ideas

---

## 🎓 Learning Path

### Beginner
1. Edit `config.js` only
2. Replace logo
3. Don't touch other files yet

### Intermediate
1. Understand `App.vue` structure
2. Modify component styles
3. Adjust `vite.config.js` for deployment

### Advanced
1. Add new composables
2. Create new components
3. Extend database schema
4. Add new features

---

**Start with `config.js` - it controls almost everything!**
