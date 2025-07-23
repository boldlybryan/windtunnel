<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <div class="max-w-2xl mx-auto px-4 py-8">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">N</span>
          </div>
          <span class="text-lg font-semibold text-gray-900 dark:text-white">NAVISTONE</span>
        </div>
        <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span>Hey, Bryan!</span>
          <div class="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <span class="text-xs font-medium">BK</span>
          </div>
        </div>
      </div>

      <!-- Progress Steps -->
      <div class="flex items-center justify-center mb-8">
        <div class="flex items-center space-x-4">
          <div 
            v-for="step in 3" 
            :key="step"
            class="flex items-center"
          >
            <div 
              class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
              :class="[
                step <= currentStep 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              ]"
            >
              {{ step }}
            </div>
            <span 
              class="ml-2 text-sm font-medium"
              :class="[
                step <= currentStep 
                  ? 'text-gray-900 dark:text-white' 
                  : 'text-gray-400 dark:text-gray-600'
              ]"
            >
              {{ getStepTitle(step) }}
            </span>
            <div 
              v-if="step < 3"
              class="w-8 h-0.5 mx-4"
              :class="[
                step < currentStep 
                  ? 'bg-orange-500' 
                  : 'bg-gray-200 dark:bg-gray-700'
              ]"
            />
          </div>
        </div>
      </div>

      <!-- Welcome Text -->
      <div class="text-center mb-8">
        <p class="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
          Welcome to NaviStone! Please take a few minutes to tell us about your business,
          marketing plans, and the tools you use to do your job. With this information, you'll
          be presented with the appropriate benchmarks, leverage the best algorithms, and
          have all of your first-party data powering your marketing programs
        </p>
      </div>

      <!-- Content Slot -->
      <slot />
    </div>
  </div>
</template>

<script setup>
const { onboardingData, getStepTitle } = useOnboarding()

const currentStep = computed(() => onboardingData.value.step)
</script>