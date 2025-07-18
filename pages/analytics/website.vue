<template>
  <div class="analytics-page">
    <!-- Time Period Selector -->
    <div class="time-selector">
      <UButton 
        v-for="period in timePeriods" 
        :key="period.value"
        :variant="selectedPeriod === period.value ? 'solid' : 'outline'"
        color="neutral"
        size="sm"
        @click="selectedPeriod = period.value"
      >
        {{ period.label }}
      </UButton>
    </div>

    <!-- Metrics Grid -->
    <div class="metrics-grid">
      <!-- Row 1 -->
      <div class="metric-item">
        <div class="metric-label">Browsing Sessions</div>
        <div class="metric-value">86,431</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">Unique Visitors</div>
        <div class="metric-value">53,043</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">Addressable Visitors</div>
        <div class="metric-value">53,043</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">Add to carts</div>
        <div class="metric-value">24,930</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">Orders</div>
        <div class="metric-value">1,784</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">Conversion Rate</div>
        <div class="metric-value">3.36%</div>
      </div>
      
      <!-- Row 2 -->
      <div class="metric-item">
        <div class="metric-label">Avg. Session Duration</div>
        <div class="metric-value">4m 37s</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">Pages per Session</div>
        <div class="metric-value">6.2</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">Bounce Rate</div>
        <div class="metric-value">31.4%</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">Return Visitor Rate</div>
        <div class="metric-value">22.8%</div>
      </div>
    </div>

    <!-- Tables Section -->
    <div class="tables-grid">
      <!-- Landing Pages -->
      <div class="table-card">
        <h3 class="table-title">Landing Pages</h3>
        <table class="data-table">
          <tbody>
            <tr v-for="item in landingPages" :key="item.path">
              <td class="table-label">{{ item.path }}</td>
              <td class="table-value">{{ item.value.toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Top Pages -->
      <div class="table-card">
        <h3 class="table-title">Top Pages</h3>
        <table class="data-table">
          <tbody>
            <tr v-for="item in topPages" :key="item.path">
              <td class="table-label">{{ item.path }}</td>
              <td class="table-value">{{ item.value.toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Traffic Sources -->
      <div class="table-card">
        <h3 class="table-title">Traffic Sources</h3>
        <table class="data-table">
          <tbody>
            <tr v-for="item in trafficSources" :key="item.source">
              <td class="table-label">{{ item.source }}</td>
              <td class="table-value">{{ item.value.toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Web Browser -->
      <div class="table-card">
        <h3 class="table-title">Web Browser</h3>
        <table class="data-table">
          <tbody>
            <tr v-for="item in webBrowsers" :key="item.browser">
              <td class="table-label">{{ item.browser }}</td>
              <td class="table-value">{{ item.value.toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Visitor Location -->
      <div class="table-card">
        <h3 class="table-title">Visitor Location</h3>
        <table class="data-table">
          <tbody>
            <tr v-for="item in visitorLocations" :key="item.location">
              <td class="table-label">{{ item.location }}</td>
              <td class="table-value">{{ item.value.toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: 'sidebar'
})

const selectedPeriod = ref('7d')

const timePeriods = [
  { label: '7d', value: '7d' },
  { label: '14d', value: '14d' },
  { label: '28d', value: '28d' }
]

const landingPages = ref([
  { path: '/category/womens', value: 2304 },
  { path: '/category/kids', value: 1392 },
  { path: '/category/home', value: 1029 },
  { path: '/category/mens', value: 839 },
  { path: '/pages/clearance', value: 593 }
])

const topPages = ref([
  { path: '/category/womens', value: 2304 },
  { path: '/category/kids', value: 1392 },
  { path: '/category/home', value: 1029 },
  { path: '/category/mens', value: 839 },
  { path: '/pages/clearance', value: 593 }
])

const trafficSources = ref([
  { source: 'Direct', value: 3127 },
  { source: 'Paid Search', value: 2951 },
  { source: 'Postcard', value: 1432 },
  { source: 'Social Media', value: 780 },
  { source: 'E-mail', value: 648 }
])

const webBrowsers = ref([
  { browser: 'Safari, iOS', value: 2304 },
  { browser: 'Google Chrome, Desktop', value: 1392 },
  { browser: 'Firefox, Desktop', value: 1029 },
  { browser: 'Google Chrome, Android', value: 839 },
  { browser: 'Safari, Desktop', value: 593 }
])

const visitorLocations = ref([
  { location: 'New York, New York', value: 2304 },
  { location: 'Los Angeles, California', value: 1392 },
  { location: 'Miami, Florida', value: 1029 },
  { location: 'Chicago, Illinois', value: 839 },
  { location: 'Washington, D.C.', value: 593 }
])
</script>

<style scoped>
.analytics-page {
  padding: 24px 32px;
  background: #FAFBFC;
  min-height: 100vh;
}

/* Time Selector */
.time-selector {
  margin-bottom: 32px;
  display: flex;
  gap: 0;
}

.time-selector button:first-child {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

.time-selector button:last-child {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}

.time-selector button:not(:first-child):not(:last-child) {
  border-radius: 0 !important;
}

/* Metrics Grid - 12 column layout */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
  margin-bottom: 40px;
}

.metric-item {
  grid-column: span 2;
}

.metric-label {
  font-size: 12px;
  font-weight: 400;
  color: #6B7280;
  margin-bottom: 8px;
  line-height: 1;
}

.metric-value {
  font-size: 32px;
  font-weight: 600;
  color: #111827;
  line-height: 1;
  letter-spacing: -0.02em;
}

/* Tables Grid - 12 column layout */
.tables-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}

.table-card {
  grid-column: span 4;
  background: #FFFFFF;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #F3F4F6;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

.table-title {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 8px 0;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table td {
  padding: 4px 0;
}

.table-label {
  font-size: 14px;
  color: #6B7280;
  font-weight: 400;
}

.table-value {
  font-size: 14px;
  color: #111827;
  font-weight: 500;
  text-align: right;
}

/* Responsive */
@media (max-width: 1200px) {
  .table-card {
    grid-column: span 6;
  }
}

@media (max-width: 768px) {
  .analytics-page {
    padding: 16px;
  }
  
  .metrics-grid {
    grid-template-columns: repeat(6, 1fr);
  }
  
  .metric-item {
    grid-column: span 3;
  }
  
  .table-card {
    grid-column: span 12;
    padding: 16px;
  }
  
  .metric-value {
    font-size: 28px;
  }
}

@media (max-width: 480px) {
  .metrics-grid {
    grid-template-columns: repeat(4, 1fr);
  }
  
  .metric-item {
    grid-column: span 4;
  }
}
</style>