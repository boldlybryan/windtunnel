<template>
  <div class="create-campaign-page">
    <!-- Page Header -->
    <div class="page-header">
      <div>
        <h1 class="page-title">Create New Campaign</h1>
        <p class="page-subtitle">Design a targeted direct mail postcard campaign</p>
      </div>
    </div>

    <!-- Campaign Form -->
    <div class="form-container">
      <UForm :schema="campaignSchema" :state="formData" @submit="createCampaign">
        <div class="form-sections">
          <!-- Basic Information -->
          <div class="form-section">
            <h2 class="section-title">Campaign Details</h2>
            <div class="form-grid">
              <UFormField name="name" label="Campaign Name" required>
                <UInput v-model="formData.name" placeholder="e.g., Holiday Comeback Campaign" />
              </UFormField>
              
              <UFormField name="type" label="Campaign Type" required>
                <USelect 
                  v-model="formData.type" 
                  :options="campaignTypes"
                  placeholder="Select campaign type"
                />
              </UFormField>
            </div>
          </div>

          <!-- Audience Targeting -->
          <div class="form-section">
            <h2 class="section-title">Audience Targeting</h2>
            <div class="form-grid">
              <UFormField name="audienceSegment" label="Target Audience" required>
                <USelect 
                  v-model="formData.audienceSegment" 
                  :options="audienceOptions"
                  placeholder="Select target audience"
                />
              </UFormField>
              
              <UFormField name="audienceSize" label="Estimated Audience Size" readonly>
                <UInput 
                  v-model="estimatedAudienceSize" 
                  :placeholder="getAudienceSize(formData.audienceSegment) + ' visitors'"
                  readonly
                />
              </UFormField>
            </div>
            
            <UFormField name="audienceFilters" label="Additional Filters (Optional)">
              <UCheckboxGroup v-model="formData.audienceFilters" :options="filterOptions" />
            </UFormField>
          </div>

          <!-- Campaign Content -->
          <div class="form-section">
            <h2 class="section-title">Campaign Content</h2>
            <div class="form-grid">
              <UFormField name="offer" label="Offer/Incentive" required>
                <UTextarea 
                  v-model="formData.offer" 
                  placeholder="e.g., 25% off your abandoned cart"
                  :rows="2"
                />
              </UFormField>
              
              <UFormField name="callToAction" label="Call to Action" required>
                <UInput 
                  v-model="formData.callToAction" 
                  placeholder="e.g., Complete Your Order"
                />
              </UFormField>
            </div>
            
            <UFormField name="designTemplate" label="Design Template">
              <USelect 
                v-model="formData.designTemplate" 
                :options="designTemplates"
                placeholder="Select design template"
              />
            </UFormField>
          </div>

          <!-- Budget & Timing -->
          <div class="form-section">
            <h2 class="section-title">Budget & Timing</h2>
            <div class="form-grid">
              <UFormField name="budget" label="Campaign Budget" required>
                <UInput 
                  v-model="formData.budget" 
                  type="number"
                  placeholder="2500"
                  prefix="$"
                />
              </UFormField>
              
              <UFormField name="launchDate" label="Launch Date" required>
                <UInput 
                  v-model="formData.launchDate" 
                  type="date"
                  :min="new Date().toISOString().split('T')[0]"
                />
              </UFormField>
            </div>
          </div>

          <!-- AI-Generated Recommendations -->
          <div class="form-section" v-if="recommendations">
            <h2 class="section-title">AI Recommendations</h2>
            <div class="recommendations-grid">
              <div class="recommendation-card">
                <h3>Expected Performance</h3>
                <div class="recommendation-metrics">
                  <div class="metric">
                    <span class="metric-label">Response Rate</span>
                    <span class="metric-value">{{ recommendations.expectedResponseRate }}</span>
                  </div>
                  <div class="metric">
                    <span class="metric-label">ROAS</span>
                    <span class="metric-value">{{ recommendations.expectedROAS }}</span>
                  </div>
                  <div class="metric">
                    <span class="metric-label">Revenue</span>
                    <span class="metric-value">{{ recommendations.expectedRevenue }}</span>
                  </div>
                </div>
              </div>
              
              <div class="recommendation-card">
                <h3>Optimization Tips</h3>
                <ul class="tips-list">
                  <li v-for="tip in recommendations.tips" :key="tip">{{ tip }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="form-actions">
          <UButton 
            @click="getRecommendations" 
            variant="outline"
            :loading="loadingRecommendations"
            icon="i-heroicons-sparkles"
          >
            Get AI Recommendations
          </UButton>
          
          <div class="action-buttons">
            <UButton 
              type="button"
              variant="outline"
              @click="saveDraft"
            >
              Save Draft
            </UButton>
            
            <UButton 
              type="submit"
              color="primary"
              :loading="loading"
            >
              Create Campaign
            </UButton>
          </div>
        </div>
      </UForm>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { z } from 'zod'
import { analyticsData } from '~/utils/analyticsDataGenerator.js'

definePageMeta({
  layout: 'sidebar'
})

const route = useRoute()
const loading = ref(false)
const loadingRecommendations = ref(false)
const recommendations = ref(null)

// Pre-fill form from query parameters
const formData = ref({
  name: route.query.name || '',
  type: route.query.type || 'postcard',
  audienceSegment: route.query.audience || '',
  audienceFilters: [],
  offer: route.query.offer || '',
  callToAction: '',
  designTemplate: '',
  budget: route.query.budget ? parseInt(route.query.budget.replace(/[^0-9]/g, '')) : null,
  launchDate: ''
})

const campaignSchema = z.object({
  name: z.string().min(1, 'Campaign name is required'),
  type: z.string().min(1, 'Campaign type is required'),
  audienceSegment: z.string().min(1, 'Target audience is required'),
  offer: z.string().min(1, 'Offer is required'),
  callToAction: z.string().min(1, 'Call to action is required'),
  budget: z.number().min(100, 'Minimum budget is $100'),
  launchDate: z.string().min(1, 'Launch date is required')
})

const campaignTypes = [
  { label: 'Direct Mail Postcard', value: 'postcard' },
  { label: 'Email Campaign', value: 'email' },
  { label: 'SMS Campaign', value: 'sms' }
]

const audienceOptions = [
  { label: 'Abandoned Cart (High-Value)', value: 'abandoned_cart' },
  { label: 'High-Value Customers', value: 'high_value' },
  { label: 'Lapsed Customers', value: 'lapsed_customers' },
  { label: 'New Visitors', value: 'new_visitors' },
  { label: 'Returning Customers', value: 'returning_customers' },
  { label: 'Mobile Users', value: 'mobile_users' }
]

const filterOptions = [
  { label: 'High Income ($75k+)', value: 'high_income' },
  { label: 'Urban Areas', value: 'urban' },
  { label: 'Ages 25-45', value: 'millennials' },
  { label: 'Previous Purchasers', value: 'previous_buyers' }
]

const designTemplates = [
  { label: 'Holiday Special', value: 'holiday_special' },
  { label: 'Modern Minimal', value: 'modern_minimal' },
  { label: 'Vintage Style', value: 'vintage' },
  { label: 'Bold & Colorful', value: 'bold_colorful' },
  { label: 'VIP Exclusive', value: 'vip_exclusive' }
]

const estimatedAudienceSize = computed(() => {
  return getAudienceSize(formData.value.audienceSegment)
})

const getAudienceSize = (segment) => {
  const segments = analyticsData.getAudienceSegments()
  
  const sizeMap = {
    'abandoned_cart': segments.abandonedCart?.size || 1200,
    'high_value': segments.highValue?.size || 850,
    'lapsed': segments.lapsed?.size || 2100,
    'new_visitors': segments.newVisitors?.size || 3200,
    'returning_customers': 1800,
    'mobile_users': 2400
  }
  
  return sizeMap[segment] || 0
}

const getRecommendations = async () => {
  loadingRecommendations.value = true
  
  try {
    // Simulate AI recommendation call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    recommendations.value = {
      expectedResponseRate: '8.5%',
      expectedROAS: '4.2x',
      expectedRevenue: '$18,750',
      tips: [
        'Best send time: Tuesday-Thursday 10am-2pm',
        'Include urgency language for 15% higher response',
        'Test personalized vs. generic subject lines',
        'Consider A/B testing the offer amount'
      ]
    }
  } catch (error) {
    console.error('Failed to get recommendations:', error)
  } finally {
    loadingRecommendations.value = false
  }
}

const createCampaign = async (data) => {
  loading.value = true
  
  try {
    // Simulate campaign creation
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // In a real app, this would save to database
    console.log('Creating campaign:', data)
    
    // Navigate to campaign list with success message
    await navigateTo('/campaigns?created=true')
  } catch (error) {
    console.error('Failed to create campaign:', error)
  } finally {
    loading.value = false
  }
}

const saveDraft = async () => {
  // In a real app, this would save draft to database
  console.log('Saving draft:', formData.value)
}
</script>

<style scoped>
.create-campaign-page {
  padding: 24px 32px;
  background: #FAFBFC;
  min-height: 100vh;
}

.page-header {
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

.form-container {
  max-width: 800px;
  background: white;
  border-radius: 12px;
  border: 1px solid #E5E7EB;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 32px;
}

.form-sections {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.form-section {
  border-bottom: 1px solid #F3F4F6;
  padding-bottom: 32px;
}

.form-section:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 20px 0;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.recommendations-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.recommendation-card {
  background: #F9FAFB;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
}

.recommendation-card h3 {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 16px 0;
}

.recommendation-metrics {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.metric {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.metric-label {
  font-size: 14px;
  color: #6B7280;
}

.metric-value {
  font-size: 16px;
  font-weight: 600;
  color: #059669;
}

.tips-list {
  margin: 0;
  padding-left: 20px;
}

.tips-list li {
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 8px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
  padding-top: 32px;
  border-top: 1px solid #F3F4F6;
}

.action-buttons {
  display: flex;
  gap: 12px;
}

@media (max-width: 768px) {
  .create-campaign-page {
    padding: 16px;
  }
  
  .form-container {
    padding: 20px;
  }
  
  .form-grid,
  .recommendations-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .form-actions {
    flex-direction: column;
    gap: 16px;
  }
  
  .action-buttons {
    width: 100%;
    flex-direction: column;
  }
}
</style>