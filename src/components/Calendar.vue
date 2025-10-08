<template>
  <v-card class="calendar-component" elevation="2">

    <v-card-text class="pa-4">
      <VCalendar
        :attributes="calendarAttributes"
        :min-date="minDate"
        :max-date="maxDate"
        :from-page="startPage"
        @dayclick="onDayClick"
        :rows="1"
        :columns="1"
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

// Single month view only; multi-month logic removed

// Calendar attributes for highlighting dates (all users with active emphasis)
function hexToRgba(hex, alpha=1) {
  const sanitized = hex.replace('#','')
  const bigint = parseInt(sanitized, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const calendarAttributes = computed(() => {
  const attributes = []

  users.forEach(user => {
    const datesForUser = props.userDates[user.name] || []
    const isActive = activeUser.value && activeUser.value.name === user.name
    const solidBg = user.color
    const lightBg = hexToRgba(user.color, 0.25)
    const borderColor = hexToRgba(user.color, 0.9)

    datesForUser.forEach(dateString => {
      const date = PureDate.fromString(dateString)
      attributes.push({
        key: `${user.name}-${dateString}`,
        dates: date,
        highlight: {
          // Use custom style instead of generic color to avoid override/uniform
          style: {
            backgroundColor: isActive ? solidBg : lightBg,
            border: `2px solid ${borderColor}`,
            color: '#fff'
          },
          class: isActive ? 'fc-active-highlight' : 'fc-inactive-highlight'
        },
        popover: { label: user.name }
      })
    })
  })

  // Today outline
  attributes.push({
    key: 'today',
    dates: new Date(),
    highlight: {
      style: {
        border: '2px dashed #9e9e9e',
        backgroundColor: 'transparent'
      },
      class: 'fc-today'
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

/* Remove prior generic opacity control; rely on inline styles */
.fc-active-highlight .vc-highlight { box-shadow: 0 0 0 2px rgba(0,0,0,0.15); }
.fc-inactive-highlight .vc-highlight { backdrop-filter: saturate(120%); }
.fc-today .vc-highlight { pointer-events: none; }

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
