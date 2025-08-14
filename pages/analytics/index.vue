<template>
  <div class="analytics-page">
    <!-- Page Header -->
    <div class="page-header">
      <h1 class="page-title">Analytics Dashboard</h1>
      <div class="nav-links">
        <NuxtLink to="/analytics/business" class="nav-link">Business</NuxtLink>
        <NuxtLink to="/analytics/campaigns" class="nav-link">Campaigns</NuxtLink>
        <NuxtLink to="/analytics/website" class="nav-link">Website</NuxtLink>
        <NuxtLink to="/analytics/ai-insights" class="nav-link ai-link">
          <UIcon name="i-heroicons-sparkles" />
          AI Insights
        </NuxtLink>
      </div>
    </div>

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

    <!-- Key Metrics Overview -->
    <div class="overview-section">
      <h2 class="section-title">Key Performance Indicators</h2>
      <div class="metrics-grid overview-grid">
        <div class="metric-item highlight">
          <div class="metric-label">Total Revenue</div>
          <div class="metric-value">$2,847,392</div>
        </div>
        <div class="metric-item highlight">
          <div class="metric-label">Website Visitors</div>
          <div class="metric-value">86,431</div>
        </div>
        <div class="metric-item highlight">
          <div class="metric-label">Campaign ROAS</div>
          <div class="metric-value">4.2x</div>
        </div>
        <div class="metric-item highlight">
          <div class="metric-label">Conversion Rate</div>
          <div class="metric-value">3.36%</div>
        </div>
      </div>
    </div>

    <!-- Business Metrics Section -->
    <div class="section">
      <div class="section-header">
        <h2 class="section-title">Business Performance</h2>
        <NuxtLink to="/analytics/business" class="section-link">View Details →</NuxtLink>
      </div>
      <div class="metrics-grid">
        <div class="metric-item">
          <div class="metric-label">Profit</div>
          <div class="metric-value">$1,124,583</div>
        </div>
        <div class="metric-item">
          <div class="metric-label">New Customers</div>
          <div class="metric-value">1,847</div>
        </div>
        <div class="metric-item">
          <div class="metric-label">Active Users</div>
          <div class="metric-value">42,891</div>
        </div>
        <div class="metric-item">
          <div class="metric-label">Growth Rate</div>
          <div class="metric-value">+12.4%</div>
        </div>
      </div>
    </div>

    <!-- Campaign Metrics Section -->
    <div class="section">
      <div class="section-header">
        <h2 class="section-title">Campaign Performance</h2>
        <NuxtLink to="/analytics/campaigns" class="section-link">View Details →</NuxtLink>
      </div>
      <div class="metrics-grid">
        <div class="metric-item">
          <div class="metric-label">Active Campaigns</div>
          <div class="metric-value">32</div>
        </div>
        <div class="metric-item">
          <div class="metric-label">Campaign Spend</div>
          <div class="metric-value">$284,391</div>
        </div>
        <div class="metric-item">
          <div class="metric-label">Impressions</div>
          <div class="metric-value">2,847,392</div>
        </div>
        <div class="metric-item">
          <div class="metric-label">CTR</div>
          <div class="metric-value">2.8%</div>
        </div>
      </div>
    </div>

    <!-- Website Metrics Section -->
    <div class="section">
      <div class="section-header">
        <h2 class="section-title">Website Performance</h2>
        <NuxtLink to="/analytics/website" class="section-link">View Details →</NuxtLink>
      </div>
      <div class="metrics-grid">
        <div class="metric-item">
          <div class="metric-label">Browsing Sessions</div>
          <div class="metric-value">86,431</div>
        </div>
        <div class="metric-item">
          <div class="metric-label">Add to Carts</div>
          <div class="metric-value">24,930</div>
        </div>
        <div class="metric-item">
          <div class="metric-label">Avg. Session Duration</div>
          <div class="metric-value">4m 37s</div>
        </div>
        <div class="metric-item">
          <div class="metric-label">Bounce Rate</div>
          <div class="metric-value">31.4%</div>
        </div>
      </div>
    </div>

    <!-- Quick Insights -->
    <div class="section">
      <h2 class="section-title">Quick Insights</h2>
      <div class="insights-grid">
        <div class="insight-card">
          <h3 class="insight-title">Top Revenue Channel</h3>
          <p class="insight-value">E-commerce</p>
          <p class="insight-detail">$1,284,750 revenue</p>
        </div>
        <div class="insight-card">
          <h3 class="insight-title">Best Performing Campaign</h3>
          <p class="insight-value">Summer Sale 2024</p>
          <p class="insight-detail">2,304 conversions</p>
        </div>
        <div class="insight-card">
          <h3 class="insight-title">Top Landing Page</h3>
          <p class="insight-value">/category/womens</p>
          <p class="insight-detail">2,304 sessions</p>
        </div>
        <div class="insight-card">
          <h3 class="insight-title">Primary Traffic Source</h3>
          <p class="insight-value">Direct</p>
          <p class="insight-detail">3,127 visitors</p>
        </div>
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
</script>

<style scoped>
.analytics-page {
  padding: 24px 32px;
  background: #FAFBFC;
  min-height: 100vh;
}

/* Page Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #111827;
}

.nav-links {
  display: flex;
  gap: 24px;
}

.nav-link {
  color: #6B7280;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #111827;
}

.ai-link {
  display: flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, #3B82F6, #8B5CF6);
  color: white !important;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s;
}

.ai-link:hover {
  background: linear-gradient(135deg, #2563EB, #7C3AED);
  color: white !important;
  transform: translateY(-1px);
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

/* Sections */
.section {
  margin-bottom: 48px;
}

.overview-section {
  margin-bottom: 40px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
}

.section-link {
  color: #6B7280;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s;
}

.section-link:hover {
  color: #111827;
}

/* Metrics Grid - 12 column layout */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
  margin-bottom: 40px;
}

.overview-grid {
  margin-bottom: 40px;
}

.overview-grid .metric-item {
  grid-column: span 3;
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

/* Insights Grid - 12 column layout */
.insights-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}

.insight-card {
  grid-column: span 4;
  background: #FFFFFF;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #F3F4F6;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

.insight-title {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 8px 0;
}

.insight-value {
  font-size: 14px;
  color: #111827;
  font-weight: 500;
  margin: 0 0 4px 0;
}

.insight-detail {
  font-size: 14px;
  color: #6B7280;
  font-weight: 400;
  margin: 0;
}

/* Responsive */
@media (max-width: 1200px) {
  .insight-card {
    grid-column: span 6;
  }
}

@media (max-width: 768px) {
  .analytics-page {
    padding: 16px;
  }
  
  .page-header {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
  
  .nav-links {
    gap: 16px;
  }
  
  .section-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  
  .metrics-grid {
    grid-template-columns: repeat(6, 1fr);
  }
  
  .overview-grid .metric-item {
    grid-column: span 3;
  }
  
  .metric-item {
    grid-column: span 3;
  }
  
  .insights-grid {
    grid-template-columns: repeat(6, 1fr);
  }
  
  .insight-card {
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
  
  .overview-grid .metric-item {
    grid-column: span 4;
  }
  
  .metric-item {
    grid-column: span 4;
  }
}
</style>