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
        <div class="metric-label">Total Campaigns</div>
        <div class="metric-value">147</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">Active Campaigns</div>
        <div class="metric-value">32</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">Campaign Spend</div>
        <div class="metric-value">$284,391</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">ROAS</div>
        <div class="metric-value">4.2x</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">Impressions</div>
        <div class="metric-value">2,847,392</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">Conversions</div>
        <div class="metric-value">8,942</div>
      </div>
      
      <!-- Row 2 -->
      <div class="metric-item">
        <div class="metric-label">CTR</div>
        <div class="metric-value">2.8%</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">CPC</div>
        <div class="metric-value">$1.24</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">CPM</div>
        <div class="metric-value">$8.47</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">CPA</div>
        <div class="metric-value">$31.84</div>
      </div>
    </div>

    <!-- Tables Section -->
    <div class="tables-grid">
      <!-- Top Campaigns -->
      <div class="table-card">
        <h3 class="table-title">Top Campaigns</h3>
        <table class="data-table">
          <tbody>
            <tr v-for="item in topCampaigns" :key="item.name">
              <td class="table-label">{{ item.name }}</td>
              <td class="table-value">{{ item.conversions.toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Campaign Types -->
      <div class="table-card">
        <h3 class="table-title">Campaign Types</h3>
        <table class="data-table">
          <tbody>
            <tr v-for="item in campaignTypes" :key="item.type">
              <td class="table-label">{{ item.type }}</td>
              <td class="table-value">${{ item.spend.toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Ad Platforms -->
      <div class="table-card">
        <h3 class="table-title">Ad Platforms</h3>
        <table class="data-table">
          <tbody>
            <tr v-for="item in adPlatforms" :key="item.platform">
              <td class="table-label">{{ item.platform }}</td>
              <td class="table-value">{{ item.roas }}x</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Audience Segments -->
      <div class="table-card">
        <h3 class="table-title">Audience Segments</h3>
        <table class="data-table">
          <tbody>
            <tr v-for="item in audienceSegments" :key="item.segment">
              <td class="table-label">{{ item.segment }}</td>
              <td class="table-value">{{ item.ctr }}%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Creative Performance -->
      <div class="table-card">
        <h3 class="table-title">Creative Performance</h3>
        <table class="data-table">
          <tbody>
            <tr v-for="item in creativePerformance" :key="item.creative">
              <td class="table-label">{{ item.creative }}</td>
              <td class="table-value">{{ item.conversions.toLocaleString() }}</td>
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

const topCampaigns = ref([
  { name: 'Summer Sale 2024', conversions: 2304 },
  { name: 'Back to School', conversions: 1892 },
  { name: 'Winter Collection', conversions: 1456 },
  { name: 'Holiday Promotion', conversions: 1234 },
  { name: 'New Year Launch', conversions: 987 }
])

const campaignTypes = ref([
  { type: 'Search Campaigns', spend: 124750 },
  { type: 'Display Campaigns', spend: 89420 },
  { type: 'Social Media', spend: 56890 },
  { type: 'Video Campaigns', spend: 34520 },
  { type: 'Shopping Campaigns', spend: 28430 }
])

const adPlatforms = ref([
  { platform: 'Google Ads', roas: 4.8 },
  { platform: 'Facebook Ads', roas: 3.9 },
  { platform: 'Instagram Ads', roas: 3.2 },
  { platform: 'TikTok Ads', roas: 2.7 },
  { platform: 'LinkedIn Ads', roas: 2.1 }
])

const audienceSegments = ref([
  { segment: 'Returning Customers', ctr: 4.2 },
  { segment: 'Lookalike Audience', ctr: 3.8 },
  { segment: 'Interest-Based', ctr: 2.9 },
  { segment: 'Demographic', ctr: 2.4 },
  { segment: 'Behavioral', ctr: 1.8 }
])

const creativePerformance = ref([
  { creative: 'Video Ad #1', conversions: 1847 },
  { creative: 'Carousel Ad #2', conversions: 1523 },
  { creative: 'Static Image #3', conversions: 1289 },
  { creative: 'Collection Ad #4', conversions: 1067 },
  { creative: 'Story Ad #5', conversions: 894 }
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