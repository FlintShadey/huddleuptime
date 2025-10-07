// FlintCal Configuration File
// Easy-to-modify settings for users, colors, and date ranges

export const config = {
  // App Information
  appName: 'Flint Availability Calendar',
  appShortName: 'FlintCal',
  logoPath: '/FlintCal_Logo.png',

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
      name: 'Bryan & Marlene',
      color: '#4CAF50',        // Green
      displayColor: '#388E3C',
      textColor: '#FFFFFF'
    },
    {
      name: 'Leslie & Manny',
      color: '#FF9800',        // Orange
      displayColor: '#F57C00',
      textColor: '#FFFFFF'
    },
    {
      name: 'Molly & Jay',
      color: '#9C27B0',        // Purple
      displayColor: '#7B1FA2',
      textColor: '#FFFFFF'
    }
  ],

  // Date Range Configuration
  // Modify these to change the available date range
  dateRange: {
    startMonth: 10,           // October (1-12)
    startYear: 2025,
    endMonth: 12,             // December (1-12)
    endYear: 2025,
    
    // Helper method to get start date
    getStartDate() {
      return new Date(this.startYear, this.startMonth - 1, 1);
    },
    
    // Helper method to get end date
    getEndDate() {
      return new Date(this.endYear, this.endMonth, 0); // Last day of end month
    },
    
    // Get formatted display string
    getDisplayRange() {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${months[this.startMonth - 1]} ${this.startYear} - ${months[this.endMonth - 1]} ${this.endYear}`;
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
