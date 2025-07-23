<template>
  <OnboardingLayout>
    <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-8 max-w-md mx-auto">
      <div class="mb-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Tell us about your business
        </h2>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          We'll use this to personalize your experience and show you the most relevant insights.
        </p>
      </div>

      <div class="space-y-6">
        <!-- Industry -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Industry
          </label>
          <select 
            v-model="formData.industry"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="">Select industry</option>
            <option v-for="option in industryOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>

        <!-- Business Model -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Business Model
          </label>
          <select 
            v-model="formData.businessModel"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="">Select business model</option>
            <option v-for="option in businessModelOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>

        <!-- Team Size -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Team Size
          </label>
          <select 
            v-model="formData.teamSize"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="">Select team size</option>
            <option v-for="option in teamSizeOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>

        <!-- Continue Button -->
        <UButton
          @click="handleContinue"
          :disabled="!isFormValid"
          color="orange"
          class="w-full"
          size="lg"
        >
          Continue
        </UButton>
      </div>
    </div>
  </OnboardingLayout>
</template>

<script setup>
import OnboardingLayout from '~/components/onboarding/OnboardingLayout.vue'

const { onboardingData, updateBusinessDetails, setStep, nextStep } = useOnboarding()

setStep(1)

const formData = reactive({
  industry: onboardingData.value.businessDetails.industry || '',
  businessModel: onboardingData.value.businessDetails.businessModel || '',
  teamSize: onboardingData.value.businessDetails.teamSize || ''
})

const industryOptions = [
  'Health & Wellness',
  'Fashion & Apparel',
  'Technology',
  'Food & Beverage',
  'Home & Garden',
  'Sports & Recreation',
  'Beauty & Personal Care',
  'Automotive',
  'Education',
  'Finance',
  'Other'
]

const businessModelOptions = [
  'E-commerce',
  'SaaS',
  'Marketplace',
  'Subscription',
  'B2B Services',
  'B2C Services',
  'Manufacturing',
  'Retail',
  'Other'
]

const teamSizeOptions = [
  '1-10 people',
  '11-50 people',
  '51-200 people',
  '201-500 people',
  '500+ people'
]

const isFormValid = computed(() => {
  return formData.industry && formData.businessModel && formData.teamSize
})

const handleContinue = () => {
  if (isFormValid.value) {
    updateBusinessDetails(formData)
    nextStep()
    navigateTo('/onboarding/marketing')
  }
}

watch(formData, (newData) => {
  updateBusinessDetails(newData)
}, { deep: true })
</script>