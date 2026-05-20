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
      name: 'Flint & Maryam',
      color: '#2196F3',        // Blue - used for calendar date highlights
      displayColor: '#1976D2',  // Darker blue - used for UI elements
      textColor: '#FFFFFF'      // Text color for contrast
    },
    {
      name: 'Leslie & Manny',
      color: '#4CAF50',        // Green
      displayColor: '#388E3C',
      textColor: '#FFFFFF'
    },
    {
      name: 'Bryan & Marlene',
      color: '#9C27B0',        // Purple
      displayColor: '#7B1FA2',
      textColor: '#FFFFFF'
    },
    {
      name: 'Molly & Jay',
      color: '#FF9800',        // Orange
      displayColor: '#F57C00',
      textColor: '#FFFFFF'
    }
  ],

  // Date Range Configuration
  // Fixed to May–July 2026
  dateRange: {
    // Helper method to get start date (May 2026)
    getStartDate() {
      return new Date(2026, 4, 1); // May 1, 2026
    },
    
    // Helper method to get end date (July 31, 2026)
    getEndDate() {
      return new Date(2026, 6, 31); // July 31, 2026
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
