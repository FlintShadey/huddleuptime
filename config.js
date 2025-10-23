// Huddle Up Time Configuration File
// Easy-to-modify settings for users, colors, and date ranges

export const config = {
  // App Information
  appName: 'Huddle Up Time Availability Calendar',
  appShortName: 'Huddle Up Time',
  logoPath: '/huddleuptime_logo.png',

  // Users/Couples Configuration
  // Add, remove, or modify users here
  // Each user needs: name, color (for date highlighting), and displayColor (for UI elements)
  users: [
    {
      name: 'Flint',
      color: '#2196F3',        // Blue - used for calendar date highlights
      displayColor: '#1976D2',  // Darker blue - used for UI elements
      textColor: '#FFFFFF'      // Text color for contrast
    },
    {
      name: 'Maryam',
      color: '#9C27B0',        // Purple
      displayColor: '#7B1FA2',
      textColor: '#FFFFFF'
    },
    {
      name: 'Josh',
      color: '#4CAF50',        // Green
      displayColor: '#388E3C',
      textColor: '#FFFFFF'
    },
    {
      name: 'Karen',
      color: '#E91E63',        // Pink
      displayColor: '#C2185B',
      textColor: '#FFFFFF'
    }
  ],

  // Date Range Configuration
  // Dynamically shows current month plus next 3 months
  dateRange: {
    // Helper method to get start date (current month)
    getStartDate() {
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth(), 1);
    },
    
    // Helper method to get end date (3 months from now)
    getEndDate() {
      const now = new Date();
      const endDate = new Date(now.getFullYear(), now.getMonth() + 3, 0); // Last day of 3 months ahead
      return endDate;
    },
    
    // Get formatted display string
    getDisplayRange() {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const start = this.getStartDate();
      const end = this.getEndDate();
      return `${months[start.getMonth()]} ${start.getFullYear()} - ${months[end.getMonth()]} ${end.getFullYear()}`;
    }
  },

  // UI Configuration
  ui: {
    theme: 'light',                   // 'dark' or 'light'
    enableMobileOptimizations: true,
    showLoadingIndicators: true,
    animateTransitions: true
  },

  // Feature Flags
  features: {
    realTimeSync: true,              // Enable real-time updates across browsers
    multiUserSelection: true,        // Allow multiple users to select same date
    dateToggle: true,                // Allow clicking to deselect dates
    monthNavigation: true            // Enable prev/next month navigation
  }
};

// Export individual items for convenience
export const { users, dateRange, ui, features } = config;
export default config;
