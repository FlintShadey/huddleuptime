// Time Tribe Configuration File
// Easy-to-modify settings for users, colors, and date ranges

export const config = {
  // App Information
  appName: 'Time Tribe Availability Calendar',
  appShortName: 'Time Tribe',
  logoPath: '/timetribe_logo.png',

  // Users/Couples Configuration
  // Add, remove, or modify users here
  // Each user needs: name, color (for date highlighting), and displayColor (for UI elements)
  users: [
    {
      name: 'Tamara & Rob',
      color: '#9C27B0',        // Purple - used for calendar date highlights
      displayColor: '#7B1FA2',  // Darker purple - used for UI elements
      textColor: '#FFFFFF'      // Text color for contrast
    },
    {
      name: 'Rachel',
      color: '#4CAF50',        // Green
      displayColor: '#388E3C',
      textColor: '#FFFFFF'
    },
    {
      name: 'Jessica',
      color: 'pink',        // Pink
      displayColor: 'pink',
      textColor: '#FFFFFF'
    },
    {
      name: 'Tim',
      color: '#2196F3',        // Blue
      displayColor: '#1976D2',
      textColor: '#FFFFFF'
    },
    {
      name: 'Joseph',
      color: '#FF9800',        // Orange
      displayColor: '#F57C00',
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
