<template>
  <OnboardingLayout>
    <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-8 max-w-md mx-auto text-center">
      <div class="mb-6">
        <div class="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="i-heroicons-check" class="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Welcome to NaviStone!
        </h2>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Thanks for completing your onboarding. We've personalized your experience based on your responses.
        </p>
      </div>

      <div class="mb-8">
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-left">
          <h3 class="font-medium text-gray-900 dark:text-white mb-3">Your Setup Summary:</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Industry:</span>
              <span class="text-gray-900 dark:text-white">{{ onboardingData.businessDetails.industry }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Business Model:</span>
              <span class="text-gray-900 dark:text-white">{{ onboardingData.businessDetails.businessModel }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Team Size:</span>
              <span class="text-gray-900 dark:text-white">{{ onboardingData.businessDetails.teamSize }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Ad Spend:</span>
              <span class="text-gray-900 dark:text-white">{{ onboardingData.marketing.adSpend }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Primary Goal:</span>
              <span class="text-gray-900 dark:text-white">{{ onboardingData.marketing.primaryGoal }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Tools Selected:</span>
              <span class="text-gray-900 dark:text-white">{{ onboardingData.tools.length }} tools</span>
            </div>
          </div>
        </div>
      </div>

      <UButton
        @click="handleGetStarted"
        color="orange"
        class="w-full"
        size="lg"
      >
        Get Started
      </UButton>
    </div>
  </OnboardingLayout>
</template>

<script setup>
import OnboardingLayout from '~/components/onboarding/OnboardingLayout.vue'

const { onboardingData, completeOnboarding } = useOnboarding()

const handleGetStarted = () => {
  completeOnboarding()
  navigateTo('/')
}

// Auto-redirect after 10 seconds
onMounted(() => {
  setTimeout(() => {
    if (process.client) {
      handleGetStarted()
    }
  }, 10000)
})
</script>