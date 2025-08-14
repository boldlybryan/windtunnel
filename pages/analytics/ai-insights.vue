<template>
  <div class="ai-insights-page">
    <!-- Page Header -->
    <div class="page-header">
      <div>
        <h1 class="page-title">AI Analytics Agent</h1>
        <p class="page-subtitle">Transform visitor behavior into actionable direct mail campaigns</p>
      </div>
      <div class="header-actions">
        <UButton 
          @click="generateInsights" 
          :loading="loading"
          icon="i-heroicons-sparkles"
          color="primary"
        >
          {{ loading ? 'Generating Insights...' : 'Generate AI Insights' }}
        </UButton>
      </div>
    </div>

    <!-- Analytics Overview -->
    <div class="overview-section" v-if="behaviorData">
      <h2 class="section-title">Website Analytics Overview</h2>
      <div class="overview-grid">
        <div class="overview-card">
          <div class="overview-label">Total Visitors</div>
          <div class="overview-value">{{ behaviorData.totalVisitors.toLocaleString() }}</div>
        </div>
        <div class="overview-card">
          <div class="overview-label">Conversion Rate</div>
          <div class="overview-value">{{ behaviorData.conversionRate }}%</div>
        </div>
        <div class="overview-card">
          <div class="overview-label">High-Value Visitors</div>
          <div class="overview-value">{{ behaviorData.highValueVisitors.toLocaleString() }}</div>
        </div>
        <div class="overview-card">
          <div class="overview-label">Abandoned Carts</div>
          <div class="overview-value">{{ behaviorData.abandonedCartSessions.toLocaleString() }}</div>
        </div>
      </div>
    </div>

    <!-- AI Insights Section -->
    <div class="section" v-if="insights">
      <h2 class="section-title">AI-Generated Insights</h2>
      <div class="insights-grid">
        <div 
          v-for="insight in insights.insights" 
          :key="insight.title"
          class="insight-card"
          :class="`insight-${insight.type}`"
        >
          <div class="insight-header">
            <div class="insight-type-badge" :class="`badge-${insight.type}`">
              <UIcon :name="getInsightIcon(insight.type)" />
              {{ insight.type.toUpperCase() }}
            </div>
            <div class="insight-impact" :class="`impact-${insight.impact}`">
              {{ insight.impact.toUpperCase() }} IMPACT
            </div>
          </div>
          <h3 class="insight-title">{{ insight.title }}</h3>
          <p class="insight-description">{{ insight.description }}</p>
          <div class="insight-confidence">
            <span>Confidence: {{ insight.confidence }}%</span>
            <div class="confidence-bar">
              <div class="confidence-fill" :style="`width: ${insight.confidence}%`"></div>
            </div>
          </div>
          <div v-if="insight.suggestedActions && insight.suggestedActions.length > 0" class="suggested-actions">
            <h4>Suggested Actions:</h4>
            <ul>
              <li v-for="action in insight.suggestedActions" :key="action">{{ action }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Audience Recommendations -->
    <div class="section" v-if="insights && insights.audienceRecommendations">
      <h2 class="section-title">Audience Targeting Recommendations</h2>
      <div class="audience-grid">
        <div 
          v-for="audience in insights.audienceRecommendations" 
          :key="audience.segment"
          class="audience-card"
          :class="`priority-${audience.priority}`"
        >
          <div class="audience-header">
            <h3 class="audience-segment">{{ audience.segment }}</h3>
            <div class="audience-size">{{ audience.size.toLocaleString() }} visitors</div>
          </div>
          <p class="audience-description">{{ audience.description }}</p>
          <div class="campaign-info">
            <div class="campaign-type">
              <UIcon name="i-heroicons-envelope" />
              {{ audience.campaignType.toUpperCase() }} Campaign
            </div>
            <div class="expected-response">Expected: {{ audience.expectedResponse }}</div>
          </div>
          <UButton 
            @click="createCampaign(audience)" 
            size="sm" 
            variant="outline"
            class="create-campaign-btn"
          >
            Create Campaign
          </UButton>
        </div>
      </div>
    </div>

    <!-- Campaign Optimizations -->
    <div class="section" v-if="insights && insights.campaignOptimizations">
      <h2 class="section-title">Campaign Optimization Opportunities</h2>
      <div class="optimization-list">
        <div 
          v-for="optimization in insights.campaignOptimizations" 
          :key="optimization.campaignId"
          class="optimization-card"
        >
          <div class="optimization-header">
            <h3 class="campaign-name">{{ optimization.campaignName }}</h3>
            <div class="current-performance">{{ optimization.currentPerformance }}</div>
          </div>
          <div class="recommendations">
            <h4>Optimization Recommendations:</h4>
            <ul>
              <li v-for="rec in optimization.recommendations" :key="rec">{{ rec }}</li>
            </ul>
          </div>
          <div class="expected-impact">
            <strong>Expected Impact:</strong> {{ optimization.expectedImpact }}
          </div>
          <UButton 
            @click="optimizeCampaign(optimization.campaignId)" 
            size="sm"
            color="primary"
          >
            Apply Optimizations
          </UButton>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner">
        <UIcon name="i-heroicons-arrow-path" class="animate-spin" />
      </div>
      <p>AI Agent is analyzing your website data...</p>
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

const loading = ref(false)
const error = ref(null)
const insights = ref(null)
const behaviorData = ref(null)

onMounted(() => {
  behaviorData.value = analyticsData.getVisitorBehaviorInsights()
})

const generateInsights = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await $fetch('/api/ai/insights', {
      method: 'POST',
      body: {
        timeframe: '7d',
        focusArea: 'direct_mail'
      }
    })
    
    if (response.success) {
      insights.value = response.data
    } else {
      error.value = response.error || 'Failed to generate insights'
    }
  } catch (err) {
    error.value = err.message || 'Network error occurred'
    console.error('Insights generation error:', err)
  } finally {
    loading.value = false
  }
}

const optimizeCampaign = async (campaignId) => {
  try {
    const response = await $fetch('/api/ai/optimize-campaign', {
      method: 'POST',
      body: { campaignId }
    })
    
    if (response.success) {
      // Navigate to campaign optimization page or show modal
      await navigateTo(`/campaigns/optimize/${campaignId}`)
    }
  } catch (err) {
    error.value = 'Failed to optimize campaign'
  }
}

const createCampaign = async (audience) => {
  // Navigate to campaign creation with pre-filled audience data
  await navigateTo({
    path: '/campaigns/create',
    query: {
      audience: audience.segment,
      size: audience.size,
      type: audience.campaignType
    }
  })
}

const getInsightIcon = (type) => {
  const icons = {
    opportunity: 'i-heroicons-arrow-trending-up',
    warning: 'i-heroicons-exclamation-triangle',
    trend: 'i-heroicons-chart-bar',
    recommendation: 'i-heroicons-light-bulb'
  }
  return icons[type] || 'i-heroicons-information-circle'
}
</script>

<style scoped>
.ai-insights-page {
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

.header-actions {
  display: flex;
  gap: 12px;
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

.overview-section {
  margin-bottom: 48px;
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.overview-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #E5E7EB;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.overview-label {
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 8px;
}

.overview-value {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
}

.insights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
}

.insight-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #E5E7EB;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.insight-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.insight-type-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
}

.badge-opportunity { background: #DCFCE7; color: #166534; }
.badge-warning { background: #FEF3C7; color: #92400E; }
.badge-trend { background: #DBEAFE; color: #1E40AF; }
.badge-recommendation { background: #F3E8FF; color: #7C3AED; }

.insight-impact {
  font-size: 11px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 6px;
}

.impact-high { background: #FEE2E2; color: #DC2626; }
.impact-medium { background: #FEF3C7; color: #D97706; }
.impact-low { background: #F0F9FF; color: #0369A1; }

.insight-title {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 12px 0;
}

.insight-description {
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 0 0 16px 0;
}

.insight-confidence {
  margin-bottom: 16px;
}

.insight-confidence span {
  font-size: 12px;
  color: #6B7280;
  font-weight: 500;
}

.confidence-bar {
  width: 100%;
  height: 4px;
  background: #E5E7EB;
  border-radius: 2px;
  margin-top: 4px;
  overflow: hidden;
}

.confidence-fill {
  height: 100%;
  background: #3B82F6;
  transition: width 0.3s ease;
}

.suggested-actions h4 {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 8px 0;
}

.suggested-actions ul {
  margin: 0;
  padding-left: 20px;
}

.suggested-actions li {
  font-size: 13px;
  color: #6B7280;
  margin-bottom: 4px;
}

.audience-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
}

.audience-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #E5E7EB;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: relative;
}

.audience-card.priority-high {
  border-left: 4px solid #DC2626;
}

.audience-card.priority-medium {
  border-left: 4px solid #D97706;
}

.audience-card.priority-low {
  border-left: 4px solid #059669;
}

.audience-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.audience-segment {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.audience-size {
  font-size: 12px;
  color: #6B7280;
  font-weight: 500;
}

.audience-description {
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
  line-height: 1.4;
}

.campaign-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 8px;
}

.campaign-type {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: #374151;
}

.expected-response {
  font-size: 12px;
  font-weight: 500;
  color: #059669;
}

.create-campaign-btn {
  width: 100%;
}

.optimization-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.optimization-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #E5E7EB;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.optimization-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.campaign-name {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.current-performance {
  font-size: 12px;
  color: #6B7280;
  font-weight: 500;
}

.recommendations h4 {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 8px 0;
}

.recommendations ul {
  margin: 0 0 16px 0;
  padding-left: 20px;
}

.recommendations li {
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 6px;
}

.expected-impact {
  font-size: 14px;
  color: #374151;
  margin-bottom: 16px;
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
  .ai-insights-page {
    padding: 16px;
  }
  
  .page-header {
    flex-direction: column;
    gap: 16px;
  }
  
  .overview-grid {
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  
  .insights-grid,
  .audience-grid {
    grid-template-columns: 1fr;
  }
}
</style>