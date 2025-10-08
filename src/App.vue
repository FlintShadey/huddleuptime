<template>
  <v-app>
    <v-app-bar color="primary" elevation="4" class="app-bar-custom">
      <v-container class="d-flex align-center pa-2">
        <v-img
          :src="config.logoPath"
          class="app-logo mr-2 mr-sm-3"
          contain
          @error="onLogoError"
        ></v-img>
        <v-toolbar-title class="app-title font-weight-bold">
          {{ config.appName }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-chip
          class="hidden-xs"
          color="gray"
          variant="outlined"
        >
          {{ dateRange.getDisplayRange() }}
        </v-chip>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container class="py-8">
        <!-- User Selection Instructions -->
        <v-row>
          <v-col cols="12" class="text-center pb-2">
            <h2 class="text-h5 font-weight-medium text-grey-darken-2">
              Please Select Your Name
            </h2>
          </v-col>
        </v-row>

        <!-- User Selector -->
        <v-row>
          <v-col cols="12">
            <UserSelector />
          </v-col>
        </v-row>

        <!-- Loading State -->
        <v-row v-if="initialLoading">
          <v-col cols="12">
            <LoadingState
              :loading="true"
              message="Loading availability data..."
            />
          </v-col>
        </v-row>

        <!-- Calendar Instructions -->
        <v-row v-if="!initialLoading">
          <v-col cols="12" class="text-center pb-2 pt-6">
            <h2 class="text-h5 font-weight-medium text-grey-darken-2">
              Select All of the Dates That You Are Available
            </h2>
          </v-col>
        </v-row>

        <!-- Calendar -->
        <v-row v-if="!initialLoading">
          <v-col cols="12">
            <Calendar
              v-if="calendarReady"
              :user-dates="userDates"
              :loading="saving"
              @date-toggled="handleDateToggle"
              @month-changed="handleMonthChange"
            />
            <v-alert
              v-else
              type="info"
              variant="tonal"
              class="mt-4"
            >
              Calendar data not ready yet. (Users: {{ users.length }}, User date buckets: {{ Object.keys(userDates).length }})
            </v-alert>
            <div v-if="debugMode" class="mt-4 text-caption text-grey-darken-1">
              Debug: initialLoading={{ initialLoading }} saving={{ saving }} totalDates={{ totalDates }} timestamp={{ Date.now() }}
            </div>
          </v-col>
        </v-row>

        <!-- Error Display -->
        <v-row v-if="error">
          <v-col cols="12">
            <v-alert
              type="error"
              variant="tonal"
              closable
              @click:close="error = null"
            >
              <strong>Error:</strong> {{ error }}
            </v-alert>
          </v-col>
        </v-row>

        <!-- Real-time sync indicator -->
        <v-snackbar
          v-model="realtimeUpdateSnackbar"
          :timeout="2000"
          color="success"
          location="bottom right"
        >
          <v-icon icon="mdi-check-circle" class="mr-2"></v-icon>
          Calendar updated
        </v-snackbar>
      </v-container>
    </v-main>

    <v-footer app color="surface" class="text-center">
      <v-container>
        <div class="text-caption">
          {{ config.appName }} &copy; {{ new Date().getFullYear() }}
          <span class="mx-2">|</span>
          <v-icon
            :icon="realtimeConnected ? 'mdi-wifi' : 'mdi-wifi-off'"
            :color="realtimeConnected ? 'success' : 'error'"
            size="small"
            class="mr-1"
          ></v-icon>
          {{ realtimeConnected ? 'Connected' : 'Disconnected' }}
        </div>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed } from 'vue'
import UserSelector from './components/UserSelector.vue'
import Calendar from './components/Calendar.vue'
import LoadingState from './components/LoadingState.vue'
import { useSupabase } from './composables/useSupabase'
import { useUsers } from './composables/useUsers'
import { config, dateRange } from '../config.js'

// State
const initialLoading = ref(true)
const saving = ref(false)
const error = ref(null)
const realtimeUpdateSnackbar = ref(false)
const realtimeConnected = ref(false)
const debugMode = ref(true) // set to false to hide diagnostics

// User dates storage: { userName: [dateString, ...] }
const userDates = reactive({})

// Derived diagnostics
const totalDates = computed(() => Object.values(userDates).reduce((acc, arr) => acc + (arr?.length || 0), 0))
const calendarReady = computed(() => {
  // Calendar considered ready once we have created buckets for each configured user
  return users.every(u => Array.isArray(userDates[u.name]))
})

// Composables
const { 
  loadAllAvailability, 
  toggleUserDate, 
  subscribeToChanges 
} = useSupabase()
const { users } = useUsers()

// Realtime subscription
let realtimeSubscription = null

/**
 * Load all availability data from database
 */
const loadAvailability = async () => {
  try {
    const data = await loadAllAvailability()
    
    // Clear existing data
    Object.keys(userDates).forEach(key => {
      delete userDates[key]
    })

    // Group dates by user
    data.forEach(record => {
      if (!userDates[record.user_name]) {
        userDates[record.user_name] = []
      }
      userDates[record.user_name].push(record.selected_date)
    })

    // Initialize empty arrays for users with no dates
    users.forEach(user => {
      if (!userDates[user.name]) {
        userDates[user.name] = []
      }
    })

    if (debugMode.value) {
      console.log('[FlintCal][loadAvailability] Loaded records:', data.length, 'Buckets:', Object.keys(userDates).length, 'Total dates:', totalDates.value)
    }

    error.value = null
  } catch (err) {
    error.value = `Failed to load availability: ${err.message}`
    console.error('Error loading availability:', err)
  } finally {
    initialLoading.value = false
  }
}

/**
 * Handle date toggle event from calendar
 */
const handleDateToggle = async ({ userName, date, shouldAdd }) => {
  saving.value = true
  error.value = null

  try {
    const success = await toggleUserDate(userName, date, shouldAdd)
    
    if (success) {
      // Update local state optimistically
      if (!userDates[userName]) {
        userDates[userName] = []
      }

      if (shouldAdd) {
        if (!userDates[userName].includes(date)) {
          userDates[userName].push(date)
        }
      } else {
        const index = userDates[userName].indexOf(date)
        if (index > -1) {
          userDates[userName].splice(index, 1)
        }
      }
    } else {
      error.value = 'Failed to update date. Please try again.'
    }
  } catch (err) {
    error.value = `Error updating date: ${err.message}`
    console.error('Error toggling date:', err)
  } finally {
    saving.value = false
  }
}

/**
 * Handle month change event
 */
const handleMonthChange = ({ month, year }) => {
  // Could be used for analytics or other purposes
  console.log(`Navigated to ${month}/${year}`)
}

/**
 * Handle realtime updates from Supabase
 */
const handleRealtimeUpdate = (payload) => {
  console.log('Realtime update received:', payload)
  
  // Reload data to stay in sync
  loadAvailability()
  
  // Show notification
  realtimeUpdateSnackbar.value = true
}

/**
 * Handle logo loading error
 */
const onLogoError = () => {
  console.warn('Logo failed to load. Make sure FlintCal_Logo.png exists in the public folder.')
}

/**
 * Setup realtime subscription
 */
const setupRealtime = () => {
  if (config.features.realTimeSync) {
    try {
      realtimeSubscription = subscribeToChanges(handleRealtimeUpdate)
      realtimeConnected.value = true
      console.log('Realtime subscription active')
    } catch (err) {
      console.error('Failed to setup realtime subscription:', err)
      realtimeConnected.value = false
    }
  }
}

// Lifecycle hooks
onMounted(async () => {
  // Load initial data
  await loadAvailability()
  
  // Setup realtime subscription
  setupRealtime()
})

onUnmounted(() => {
  // Cleanup realtime subscription
  if (realtimeSubscription) {
    realtimeSubscription.unsubscribe()
    realtimeConnected.value = false
  }
})
</script>

<style>
/* Global app styles */
#app {
  font-family: 'Roboto', sans-serif;
}

.v-container {
  max-width: 1200px;
}

/* App bar customization */
.app-bar-custom {
  height: 64px !important;
}

.app-logo {
  max-height: 40px;
  max-width: 40px;
}

.app-title {
  font-size: 1.25rem;
  line-height: 1.2;
}

/* Mobile optimization */
@media (max-width: 600px) {
  .hidden-xs {
    display: none !important;
  }
  
  .app-bar-custom {
    height: 56px !important;
  }
  
  .app-logo {
    max-height: 32px;
    max-width: 32px;
  }
  
  .app-title {
    font-size: 1rem;
    line-height: 1.2;
  }
}

/* Tablet optimization */
@media (min-width: 601px) and (max-width: 960px) {
  .app-bar-custom {
    height: 60px !important;
  }
  
  .app-logo {
    max-height: 36px;
    max-width: 36px;
  }
  
  .app-title {
    font-size: 1.125rem;
  }
}

/* Smooth transitions */
* {
  transition: background-color 0.2s ease, color 0.2s ease;
}
</style>
