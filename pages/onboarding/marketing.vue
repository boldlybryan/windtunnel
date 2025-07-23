<template>
  <OnboardingLayout>
    <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-8 max-w-md mx-auto">
      <div class="mb-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Tell us about your marketing
        </h2>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          This helps us show you the most relevant benchmarks and recommendations.
        </p>
      </div>

      <div class="space-y-6">
        <!-- Average Monthly Advertising Spend -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Average Monthly Advertising Spend
          </label>
          <select 
            v-model="formData.adSpend"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="">Select ad spend</option>
            <option v-for="option in adSpendOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <!-- Primary Goal -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Primary Goal for NaviStone
          </label>
          <select 
            v-model="formData.primaryGoal"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="">Select primary goal</option>
            <option v-for="option in primaryGoalOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <!-- Monthly Uniques -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Monthly uniques
          </label>
          <select 
            v-model="formData.monthlyUniques"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="">Select monthly uniques</option>
            <option v-for="option in monthlyUniquesOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex gap-3">
          <UButton
            @click="handleBack"
            color="gray"
            variant="outline"
            class="flex-1"
            size="lg"
          >
            Back
          </UButton>
          <UButton
            @click="handleContinue"
            :disabled="!isFormValid"
            color="orange"
            class="flex-1"
            size="lg"
          >
            Continue
          </UButton>
        </div>
      </div>
    </div>
  </OnboardingLayout>
</template>

<script setup>
import OnboardingLayout from '~/components/onboarding/OnboardingLayout.vue'

const { onboardingData, updateMarketing, setStep, nextStep, prevStep } = useOnboarding()

setStep(2)

const formData = reactive({
  adSpend: onboardingData.value.marketing.adSpend || '',
  primaryGoal: onboardingData.value.marketing.primaryGoal || '',
  monthlyUniques: onboardingData.value.marketing.monthlyUniques || ''
})

const adSpendOptions = [
  { label: '$0 - $10K/month', value: '$0 - $10K/month' },
  { label: '$10K - $50K/month', value: '$10K - $50K/month' },
  { label: '$50K - $250K/month', value: '$50K - $250K/month' },
  { label: '$250K - $1M/month', value: '$250K - $1M/month' },
  { label: '$1M+ /month', value: '$1M+ /month' }
]

const primaryGoalOptions = [
  { label: 'Increase ROAS', value: 'Increase ROAS' },
  { label: 'Reduce CAC', value: 'Reduce CAC' },
  { label: 'Improve LTV', value: 'Improve LTV' },
  { label: 'Increase Conversion Rate', value: 'Increase Conversion Rate' },
  { label: 'Expand Market Reach', value: 'Expand Market Reach' },
  { label: 'Better Attribution', value: 'Better Attribution' },
  { label: 'Optimize Budget Allocation', value: 'Optimize Budget Allocation' }
]

const monthlyUniquesOptions = [
  { label: 'Under 10K', value: 'Under 10K' },
  { label: '10K - 50K', value: '10K - 50K' },
  { label: '50K - 250K', value: '50K - 250K' },
  { label: '250K - 1M', value: '250K - 1M' },
  { label: '1M - 5M', value: '1M - 5M' },
  { label: '5M+', value: '5M+' }
]

const isFormValid = computed(() => {
  return formData.adSpend && formData.primaryGoal && formData.monthlyUniques
})

const handleBack = () => {
  prevStep()
  navigateTo('/onboarding')
}

const handleContinue = () => {
  if (isFormValid.value) {
    updateMarketing(formData)
    nextStep()
    navigateTo('/onboarding/tools')
  }
}

watch(formData, (newData) => {
  updateMarketing(newData)
}, { deep: true })
</script>