<template>
  <v-card class="calendar-component" elevation="2">

    <v-card-text class="pa-4">
      <VCalendar
        :attributes="calendarAttributes"
        :min-date="minDate"
        :max-date="maxDate"
        :from-page="startPage"
        @dayclick="onDayClick"
        :rows="multiMonthRows"
        :columns="multiMonthColumns"
        expanded
        borderless
        transparent
        class="custom-calendar"
      />
    </v-card-text>

    <!-- Legend -->
    <v-card-text class="pt-0 pb-4">
      <v-divider class="mb-4"></v-divider>
      <div class="d-flex flex-wrap gap-3 justify-center">
        <div
          v-for="user in users"
          :key="user.name"
          class="d-flex align-center"
        >
          <v-avatar
            :color="user.color"
            size="20"
            class="mr-2"
          ></v-avatar>
          <span class="text-caption">{{ user.name }}</span>
        </div>
      </div>
    </v-card-text>

    <!-- Sync indicator -->
    <v-snackbar
      v-model="syncingSnackbar"
      :timeout="2000"
      color="info"
      location="bottom"
    >
      <v-icon icon="mdi-sync" class="mr-2"></v-icon>
      Syncing changes...
    </v-snackbar>
  </v-card>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useUsers } from '../composables/useUsers'
import { useDates } from '../composables/useDates'
import { dateRange } from '../../config.js'

const props = defineProps({
  userDates: {
    type: Object,
    required: true,
    default: () => ({})
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['date-toggled', 'month-changed'])

const { users, activeUser, getUserColor } = useUsers()
const { PureDate, getMonthName } = useDates()

// Starting page (first month in range) - navigation removed
const startPage = ref({
  month: dateRange.startMonth,
  year: dateRange.startYear
})

const syncingSnackbar = ref(false)

// Computed properties
const minDate = computed(() => dateRange.getStartDate())
const maxDate = computed(() => dateRange.getEndDate())

// Calculate how many months are in the configured range
const monthsInRange = computed(() => {
  const startIndex = (dateRange.startYear * 12) + (dateRange.startMonth - 1)
  const endIndex = (dateRange.endYear * 12) + (dateRange.endMonth - 1)
  return (endIndex - startIndex) + 1
})

// Layout: show up to 3 months per row (or whatever fits the total)
const multiMonthColumns = computed(() => Math.min(monthsInRange.value, 3))
const multiMonthRows = computed(() => Math.ceil(monthsInRange.value / multiMonthColumns.value))

// Calendar attributes for highlighting dates
const calendarAttributes = computed(() => {
  const attributes = []

  // Add attributes for each user's selected dates
  users.forEach(user => {
    const userDatesList = props.userDates[user.name] || []
    
    userDatesList.forEach(dateString => {
      const date = PureDate.fromString(dateString)
      
      attributes.push({
        key: `${user.name}-${dateString}`,
        dates: date,
        highlight: {
          color: user.color,
          fillMode: 'light',
          class: 'user-date-highlight'
        },
        popover: {
          label: user.name
        }
      })
    })
  })

  // Highlight today
  attributes.push({
    key: 'today',
    dates: new Date(),
    highlight: {
      color: 'gray',
      fillMode: 'outline'
    }
  })

  return attributes
})

// Methods (navigation removed)

const onDayClick = (day) => {
  if (props.loading) return

  const dateString = PureDate.toString(day.date)
  
  // Check if date is in range
  if (!PureDate.isInRange(dateString)) {
    return
  }

  // Check if active user already has this date selected
  const userDatesList = props.userDates[activeUser.value.name] || []
  const isSelected = userDatesList.includes(dateString)

  // Show syncing indicator
  syncingSnackbar.value = true

  // Emit toggle event
  emit('date-toggled', {
    userName: activeUser.value.name,
    date: dateString,
    shouldAdd: !isSelected
  })
}

// Watch for loading prop changes
watch(() => props.loading, (newLoading) => {
  if (!newLoading) {
    syncingSnackbar.value = false
  }
})

onMounted(() => {
  // No navigation setup required now
})
</script>

<style>
.calendar-component {
  max-width: 900px;
  margin: 0 auto;
}

.custom-calendar {
  width: 100%;
}

/* Customize V-Calendar styles for dark mode */
.custom-calendar .vc-day {
  min-height: 60px;
}

.custom-calendar .vc-day-content {
  font-size: 1rem;
  font-weight: 500;
}

.custom-calendar .vc-day-content:hover {
  background-color: rgba(255, 255, 255, 0.1);
  cursor: pointer;
}

.custom-calendar .vc-highlight {
  opacity: 0.6;
}

.user-date-highlight {
  opacity: 0.7 !important;
}

/* Multiple highlights on same day */
.custom-calendar .vc-highlights {
  z-index: 1;
}

.gap-3 {
  gap: 12px;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .custom-calendar .vc-day {
    min-height: 50px;
  }
  
  .custom-calendar .vc-day-content {
    font-size: 0.875rem;
  }
}
</style>
