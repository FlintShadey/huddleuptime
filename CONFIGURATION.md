# FlintCal Configuration Guide

This guide explains how to customize FlintCal by editing the `config.js` file.

## 📍 Location

The main configuration file is: **`config.js`** (in the project root)

## 🎨 Customization Options

### 1. Change App Name and Logo

```javascript
appName: 'Your Calendar Name',
appShortName: 'YourCal',
logoPath: '/your-logo.png',  // Place logo in public/ folder
```

### 2. Add, Remove, or Modify Users

The `users` array controls who can select dates. Each user needs 4 properties:

```javascript
users: [
  {
    name: 'Flint & Maryam',      // Display name (shown in UI)
    color: '#2196F3',             // Calendar date highlight color
    displayColor: '#1976D2',      // UI buttons/chips color
    textColor: '#FFFFFF'          // Text color (usually white or black)
  },
  // Add more users here...
]
```

#### Color Examples:

| Color Name | Hex Code  | Good For          |
|------------|-----------|-------------------|
| Blue       | #2196F3   | Default           |
| Green      | #4CAF50   | Nature/Eco        |
| Orange     | #FF9800   | Warm/Friendly     |
| Purple     | #9C27B0   | Royal/Elegant     |
| Red        | #F44336   | Bold/Urgent       |
| Pink       | #E91E63   | Fun/Playful       |
| Teal       | #009688   | Professional      |
| Yellow     | #FFEB3B   | Bright (use dark text) |
| Indigo     | #3F51B5   | Deep/Trustworthy  |
| Brown      | #795548   | Earthy/Rustic     |

#### Example: Adding a 5th User

```javascript
users: [
  {
    name: 'Flint & Maryam',
    color: '#2196F3',
    displayColor: '#1976D2',
    textColor: '#FFFFFF'
  },
  {
    name: 'Bryan & Marlene',
    color: '#4CAF50',
    displayColor: '#388E3C',
    textColor: '#FFFFFF'
  },
  {
    name: 'Leslie & Manny',
    color: '#FF9800',
    displayColor: '#F57C00',
    textColor: '#FFFFFF'
  },
  {
    name: 'Molly & Jay',
    color: '#9C27B0',
    displayColor: '#7B1FA2',
    textColor: '#FFFFFF'
  },
  // NEW USER:
  {
    name: 'Sam & Alex',
    color: '#F44336',        // Red
    displayColor: '#D32F2F',  // Darker red
    textColor: '#FFFFFF'
  }
]
```

### 3. Change Date Range

Edit the `dateRange` object to change which months are available:

```javascript
dateRange: {
  startMonth: 10,    // October (1 = January, 12 = December)
  startYear: 2025,
  endMonth: 12,      // December
  endYear: 2025
}
```

#### Example: Show January - March 2026

```javascript
dateRange: {
  startMonth: 1,     // January
  startYear: 2026,
  endMonth: 3,       // March
  endYear: 2026
}
```

#### Example: Show Full Year 2026

```javascript
dateRange: {
  startMonth: 1,     // January
  startYear: 2026,
  endMonth: 12,      // December
  endYear: 2026
}
```

#### Example: Show June 2025 - August 2026

```javascript
dateRange: {
  startMonth: 6,     // June
  startYear: 2025,
  endMonth: 8,       // August
  endYear: 2026
}
```

### 4. Change Theme (Dark/Light Mode)

```javascript
ui: {
  theme: 'dark',  // Options: 'dark' or 'light'
  // ... other settings
}
```

### 5. Enable/Disable Features

```javascript
features: {
  realTimeSync: true,          // Real-time updates across browsers
  multiUserSelection: true,    // Multiple users can pick same date
  dateToggle: true,            // Click again to deselect dates
  monthNavigation: true        // Show prev/next month arrows
}
```

## 🎨 Advanced Customization

### Custom Color Schemes

#### Pastel Theme
```javascript
users: [
  { name: 'User 1', color: '#B3E5FC', displayColor: '#81D4FA', textColor: '#000000' },
  { name: 'User 2', color: '#C8E6C9', displayColor: '#A5D6A7', textColor: '#000000' },
  { name: 'User 3', color: '#FFE0B2', displayColor: '#FFCC80', textColor: '#000000' },
  { name: 'User 4', color: '#F8BBD0', displayColor: '#F48FB1', textColor: '#000000' }
]
```

#### Neon Theme
```javascript
users: [
  { name: 'User 1', color: '#00E5FF', displayColor: '#00B8D4', textColor: '#000000' },
  { name: 'User 2', color: '#76FF03', displayColor: '#64DD17', textColor: '#000000' },
  { name: 'User 3', color: '#FFEA00', displayColor: '#FFD600', textColor: '#000000' },
  { name: 'User 4', color: '#FF1744', displayColor: '#D50000', textColor: '#FFFFFF' }
]
```

#### Professional Theme
```javascript
users: [
  { name: 'User 1', color: '#1565C0', displayColor: '#0D47A1', textColor: '#FFFFFF' },
  { name: 'User 2', color: '#2E7D32', displayColor: '#1B5E20', textColor: '#FFFFFF' },
  { name: 'User 3', color: '#F57C00', displayColor: '#E65100', textColor: '#FFFFFF' },
  { name: 'User 4', color: '#6A1B9A', displayColor: '#4A148C', textColor: '#FFFFFF' }
]
```

## 🔄 Applying Changes

After editing `config.js`:

1. **Save the file**
2. The dev server should auto-reload
3. If not, restart it:
   ```bash
   # Stop the server (Ctrl+C)
   # Start again:
   npm run dev
   ```

## 💡 Tips

### Finding Good Colors
- Use [Coolors.co](https://coolors.co) to generate color palettes
- Use [Material Design Colors](https://materialui.co/colors) for consistent shades
- Test contrast at [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Color Guidelines
- **Bright colors** (yellow, cyan) - use `textColor: '#000000'` (black)
- **Dark colors** (blue, purple, red) - use `textColor: '#FFFFFF'` (white)
- **displayColor** should be ~20% darker than `color`

### User Names
- Keep names short for mobile display
- Use `&` or `+` to separate couple names
- Max ~20 characters recommended

### Date Ranges
- Maximum recommended: 12 months
- Longer ranges work but may slow down initial load
- Can span multiple years

## ✅ Testing Your Changes

After making changes, test:

1. ✓ All user chips display correctly
2. ✓ Colors are distinct and readable
3. ✓ Active user highlights work
4. ✓ Calendar displays correct month range
5. ✓ Date selection and toggling works
6. ✓ Changes sync to database

## 🚨 Common Mistakes

### ❌ Wrong Format
```javascript
// WRONG - Missing quotes
name: John & Jane,

// CORRECT
name: 'John & Jane',
```

### ❌ Invalid Colors
```javascript
// WRONG - Not a hex code
color: 'blue',

// CORRECT
color: '#2196F3',
```

### ❌ Invalid Month
```javascript
// WRONG - Months are 1-12, not 0-11
startMonth: 0,

// CORRECT
startMonth: 1,  // January
```

### ❌ Missing Comma
```javascript
// WRONG - Missing comma between objects
users: [
  { name: 'User 1', color: '#2196F3' }
  { name: 'User 2', color: '#4CAF50' }
]

// CORRECT
users: [
  { name: 'User 1', color: '#2196F3' },  // Note the comma
  { name: 'User 2', color: '#4CAF50' }
]
```

## 📝 Example Complete Config

Here's a complete example with 3 users for a summer vacation calendar:

```javascript
export const config = {
  appName: 'Summer Vacation Planner',
  appShortName: 'SummerCal',
  logoPath: '/summer-logo.png',

  users: [
    {
      name: 'Smith Family',
      color: '#FF6B6B',
      displayColor: '#EE5A6F',
      textColor: '#FFFFFF'
    },
    {
      name: 'Johnson Family',
      color: '#4ECDC4',
      displayColor: '#45B7AF',
      textColor: '#FFFFFF'
    },
    {
      name: 'Williams Family',
      color: '#FFE66D',
      displayColor: '#FFD93D',
      textColor: '#000000'
    }
  ],

  dateRange: {
    startMonth: 6,     // June
    startYear: 2026,
    endMonth: 8,       // August
    endYear: 2026,
    
    getStartDate() {
      return new Date(this.startYear, this.startMonth - 1, 1);
    },
    
    getEndDate() {
      return new Date(this.endYear, this.endMonth, 0);
    },
    
    getDisplayRange() {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${months[this.startMonth - 1]} ${this.startYear} - ${months[this.endMonth - 1]} ${this.endYear}`;
    }
  },

  ui: {
    theme: 'dark',
    enableMobileOptimizations: true,
    showLoadingIndicators: true,
    animateTransitions: true
  },

  features: {
    realTimeSync: true,
    multiUserSelection: true,
    dateToggle: true,
    monthNavigation: true
  }
};

export const { users, dateRange, ui, features } = config;
export default config;
```

---

**Remember:** Always test your changes locally before deploying to production!
