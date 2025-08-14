<template>
  <div class="campaign-optimize-page">
    <!-- Page Header -->
    <div class="page-header">
      <div>
        <h1 class="page-title">Campaign Optimization</h1>
        <p class="page-subtitle" v-if="campaign">{{ campaign.name }}</p>
      </div>
      <div class="header-actions">
        <UButton 
          @click="generateOptimizations" 
          :loading="loading"
          icon="i-heroicons-arrow-trending-up"
          color="primary"
        >
          {{ loading ? 'Analyzing...' : 'Generate Optimizations' }}
        </UButton>
      </div>
    </div>

    <!-- Current Campaign Performance -->
    <div class="section" v-if="campaign">
      <h2 class="section-title">Current Performance</h2>
      <div class="performance-grid">
        <div class="performance-card">
          <div class="performance-label">Response Rate</div>
          <div class="performance-value">{{ (campaign.responseRate * 100).toFixed(1) }}%</div>
          <div class="performance-trend" :class="getTrendClass(campaign.responseRate, 0.08)">
            <UIcon :name="getTrendIcon(campaign.responseRate, 0.08)" />
            vs 8% average
          </div>
        </div>
        <div class="performance-card">
          <div class="performance-label">ROAS</div>
          <div class="performance-value">{{ campaign.roas }}x</div>
          <div class="performance-trend" :class="getTrendClass(campaign.roas, 3.0)">
            <UIcon :name="getTrendIcon(campaign.roas, 3.0)" />
            vs 3.0x average
          </div>
        </div>
        <div class="performance-card">
          <div class="performance-label">Conversion Rate</div>
          <div class="performance-value">{{ (campaign.conversionRate * 100).toFixed(1) }}%</div>
          <div class="performance-trend" :class="getTrendClass(campaign.conversionRate, 0.03)">
            <UIcon :name="getTrendIcon(campaign.conversionRate, 0.03)" />
            vs 3% average
          </div>
        </div>
        <div class="performance-card">
          <div class="performance-label">Total Revenue</div>
          <div class="performance-value">${{ campaign.revenue.toLocaleString() }}</div>
          <div class="performance-change positive">
            <UIcon name="i-heroicons-arrow-up" />
            +12% this month
          </div>
        </div>
      </div>
    </div>

    <!-- AI Optimizations -->
    <div class="section" v-if="optimizations">
      <h2 class="section-title">AI-Recommended Optimizations</h2>
      <div class="optimizations-list">
        <div 
          v-for="optimization in optimizations.optimizations" 
          :key="optimization.title"
          class="optimization-card"
          :class="`priority-${optimization.priority}`"
        >
          <div class="optimization-header">
            <div class="optimization-category">
              <UIcon :name="getCategoryIcon(optimization.category)" />
              {{ optimization.category.toUpperCase() }}
            </div>
            <div class="optimization-priority">
              {{ optimization.priority.toUpperCase() }} PRIORITY
            </div>
            <div class="optimization-effort">
              {{ optimization.effort.toUpperCase() }} EFFORT
            </div>
          </div>
          
          <h3 class="optimization-title">{{ optimization.title }}</h3>
          <p class="optimization-description">{{ optimization.description }}</p>
          
          <div class="implementation-steps">
            <h4>Implementation Steps:</h4>
            <ol>
              <li v-for="step in optimization.implementation" :key="step">{{ step }}</li>
            </ol>
          </div>
          
          <div class="expected-impact">
            <h4>Expected Impact:</h4>
            <div class="impact-metrics">
              <div class="impact-metric">
                <span class="impact-label">Response Rate:</span>
                <span class="impact-value">{{ optimization.expectedImpact.responseRate }}</span>
              </div>
              <div class="impact-metric">
                <span class="impact-label">ROAS:</span>
                <span class="impact-value">{{ optimization.expectedImpact.roas }}</span>
              </div>
              <div class="impact-metric">
                <span class="impact-label">Revenue:</span>
                <span class="impact-value">{{ optimization.expectedImpact.revenue }}</span>
              </div>
            </div>
          </div>
          
          <div class="optimization-actions">
            <UButton 
              @click="applyOptimization(optimization)" 
              size="sm"
              :color="optimization.priority === 'high' ? 'primary' : 'gray'"
            >
              Apply Optimization
            </UButton>
            <UButton 
              @click="scheduleOptimization(optimization)" 
              size="sm"
              variant="outline"
            >
              Schedule for Later
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <!-- New Campaign Suggestions -->
    <div class="section" v-if="optimizations && optimizations.newCampaignSuggestions">
      <h2 class="section-title">New Campaign Opportunities</h2>
      <div class="suggestions-grid">
        <div 
          v-for="suggestion in optimizations.newCampaignSuggestions" 
          :key="suggestion.name"
          class="suggestion-card"
        >
          <div class="suggestion-header">
            <h3 class="suggestion-name">{{ suggestion.name }}</h3>
            <div class="suggestion-type">{{ suggestion.type }}</div>
          </div>
          
          <div class="suggestion-details">
            <div class="detail-row">
              <span class="detail-label">Target Audience:</span>
              <span class="detail-value">{{ suggestion.targetAudience }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Audience Size:</span>
              <span class="detail-value">{{ suggestion.audienceSize.toLocaleString() }} visitors</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Offer:</span>
              <span class="detail-value">{{ suggestion.offer }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Launch Timing:</span>
              <span class="detail-value">{{ suggestion.launchTiming }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Suggested Budget:</span>
              <span class="detail-value">{{ suggestion.budget }}</span>
            </div>
          </div>
          
          <div class="projected-metrics">
            <h4>Projected Performance:</h4>
            <div class="metrics-row">
              <div class="metric">
                <span class="metric-label">Response Rate</span>
                <span class="metric-value">{{ suggestion.expectedMetrics.responseRate }}</span>
              </div>
              <div class="metric">
                <span class="metric-label">Conversion Rate</span>
                <span class="metric-value">{{ suggestion.expectedMetrics.conversionRate }}</span>
              </div>
              <div class="metric">
                <span class="metric-label">ROAS</span>
                <span class="metric-value">{{ suggestion.expectedMetrics.roas }}</span>
              </div>
            </div>
          </div>
          
          <UButton 
            @click="createCampaign(suggestion)" 
            size="sm"
            color="primary"
            block
          >
            Create Campaign
          </UButton>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner">
        <UIcon name="i-heroicons-arrow-path" class="animate-spin" />
      </div>
      <p>AI Agent is analyzing campaign performance...</p>
    </div>

    <!-- Error State -->
    <div v-if="error" class="error-state">
      <UAlert 
        color="red"
        variant="soft"
        :title="error"
        :description="'Please try again or contact support if the issue persists.'"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { analyticsData } from '~/utils/analyticsDataGenerator.js'

definePageMeta({
  layout: 'sidebar'
})

const route = useRoute()
const campaignId = route.params.id

const loading = ref(false)
const error = ref(null)
const campaign = ref(null)
const optimizations = ref(null)

onMounted(() => {
  // Load campaign data
  const campaigns = analyticsData.getCampaignPerformance()
  campaign.value = campaigns.find(c => c.id === campaignId)
  
  if (!campaign.value) {
    error.value = 'Campaign not found'
  }
})

const generateOptimizations = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await $fetch('/api/ai/optimize-campaign', {
      method: 'POST',
      body: {
        campaignId: campaignId,
        analysisType: 'full'
      }
    })
    
    if (response.success) {
      optimizations.value = response.data
    } else {
      error.value = response.error || 'Failed to generate optimizations'
    }
  } catch (err) {
    error.value = err.message || 'Network error occurred'
    console.error('Optimization generation error:', err)
  } finally {
    loading.value = false
  }
}

const applyOptimization = async (optimization) => {
  // In a real app, this would update the campaign
  console.log('Applying optimization:', optimization.title)
  // Show success notification
}

const scheduleOptimization = async (optimization) => {
  // In a real app, this would schedule the optimization
  console.log('Scheduling optimization:', optimization.title)
}

const createCampaign = async (suggestion) => {
  await navigateTo({
    path: '/campaigns/create',
    query: {
      name: suggestion.name,
      type: suggestion.type,
      audience: suggestion.targetAudience,
      offer: suggestion.offer,
      budget: suggestion.budget
    }
  })
}

const getTrendClass = (current, average) => {
  return current > average ? 'positive' : 'negative'
}

const getTrendIcon = (current, average) => {
  return current > average ? 'i-heroicons-arrow-up' : 'i-heroicons-arrow-down'
}

const getCategoryIcon = (category) => {
  const icons = {
    audience: 'i-heroicons-users',
    offer: 'i-heroicons-gift',
    timing: 'i-heroicons-clock',
    design: 'i-heroicons-paint-brush',
    messaging: 'i-heroicons-chat-bubble-left-right'
  }
  return icons[category] || 'i-heroicons-cog'
}
</script>

<style scoped>
.campaign-optimize-page {
  padding: 24px 32px;
  background: #FAFBFC;
  min-height: 100vh;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 16px;
  color: #6B7280;
  margin: 0;
}

.section {
  margin-bottom: 48px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 24px;
}

.performance-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 32px;
}

.performance-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #E5E7EB;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.performance-label {
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 8px;
}

.performance-value {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
}

.performance-trend,
.performance-change {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 500;
}

.performance-trend.positive,
.performance-change.positive {
  color: #059669;
}

.performance-trend.negative {
  color: #DC2626;
}

.optimizations-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.optimization-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #E5E7EB;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: relative;
}

.optimization-card.priority-high {
  border-left: 4px solid #DC2626;
}

.optimization-card.priority-medium {
  border-left: 4px solid #D97706;
}

.optimization-card.priority-low {
  border-left: 4px solid #059669;
}

.optimization-header {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.optimization-category,
.optimization-priority,
.optimization-effort {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
}

.optimization-category {
  background: #F3F4F6;
  color: #374151;
}

.optimization-priority {
  background: #FEF3C7;
  color: #92400E;
}

.optimization-effort {
  background: #DBEAFE;
  color: #1E40AF;
}

.optimization-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 12px 0;
}

.optimization-description {
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 0 0 20px 0;
}

.implementation-steps h4,
.expected-impact h4 {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 12px 0;
}

.implementation-steps ol {
  margin: 0 0 20px 0;
  padding-left: 20px;
}

.implementation-steps li {
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 6px;
}

.impact-metrics {
  display: flex;
  gap: 24px;
  margin-bottom: 20px;
}

.impact-metric {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.impact-label {
  font-size: 12px;
  color: #6B7280;
  font-weight: 500;
}

.impact-value {
  font-size: 16px;
  color: #059669;
  font-weight: 600;
}

.optimization-actions {
  display: flex;
  gap: 12px;
}

.suggestions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
}

.suggestion-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #E5E7EB;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.suggestion-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.suggestion-name {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.suggestion-type {
  font-size: 12px;
  color: #6B7280;
  font-weight: 500;
  padding: 4px 8px;
  background: #F3F4F6;
  border-radius: 6px;
}

.suggestion-details {
  margin-bottom: 20px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.detail-label {
  font-size: 13px;
  color: #6B7280;
  font-weight: 500;
}

.detail-value {
  font-size: 13px;
  color: #111827;
  font-weight: 500;
}

.projected-metrics h4 {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 12px 0;
}

.metrics-row {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.metric {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.metric-label {
  font-size: 11px;
  color: #6B7280;
  font-weight: 500;
}

.metric-value {
  font-size: 14px;
  color: #059669;
  font-weight: 600;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.loading-spinner {
  font-size: 24px;
  color: #3B82F6;
  margin-bottom: 16px;
}

.error-state {
  margin-top: 20px;
}

@media (max-width: 768px) {
  .campaign-optimize-page {
    padding: 16px;
  }
  
  .page-header {
    flex-direction: column;
    gap: 16px;
  }
  
  .performance-grid {
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  
  .suggestions-grid {
    grid-template-columns: 1fr;
  }
  
  .impact-metrics {
    flex-direction: column;
    gap: 12px;
  }
  
  .optimization-actions {
    flex-direction: column;
  }
}
</style>