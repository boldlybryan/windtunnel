<template>
  <div class="p-6 max-w-4xl mx-auto">
    <!-- Main heading -->
    <div class="mb-8">
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
        You're almost there!
      </h1>
      <p class="text-sm text-gray-600 dark:text-gray-400 max-w-2xl">
        Based on your answers, we've built this onboarding checklist—just for you. Some of these things take 
        time to get just right, so we'll keep these todos front and center until they're all done.
      </p>
    </div>

    <!-- Onboarding checklist -->
    <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div class="flex items-center justify-between mb-2">
        <h2 class="text-base font-semibold text-gray-900 dark:text-white">
          Onboarding checklist
        </h2>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          3 remaining
        </span>
      </div>

      <div class="space-y-0">
        <!-- Completed item -->
        <div class="flex items-center justify-between py-3">
          <div class="flex items-center gap-3">
            <div class="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
              <Icon name="i-heroicons-check" class="w-3 h-3 text-white" />
            </div>
            <span class="text-sm font-medium text-gray-900 dark:text-white line-through">
              Install NaviStone app on your Shopify store
            </span>
          </div>
          <UButton 
            color="neutral" 
            variant="subtle" 
            size="xs"
            disabled
          >
            Install app
          </UButton>
        </div>

        <!-- Pending items -->
        <div class="flex items-center justify-between py-3 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center gap-3">
            <div class="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded"></div>
            <span class="text-sm font-medium text-gray-900 dark:text-white">
              Enable automatic data syncing
            </span>
          </div>
          <UButton 
            color="neutral" 
            variant="subtle" 
            size="xs"
          >
            Enable sync
          </UButton>
        </div>

        <div class="flex items-center justify-between py-3 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center gap-3">
            <div class="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded"></div>
            <span class="text-sm font-medium text-gray-900 dark:text-white">
              Install tracking script on your website
            </span>
          </div>
          <UButton 
            color="neutral" 
            variant="subtle" 
            size="xs"
          >
            Install script
          </UButton>
        </div>

        <div class="flex items-center justify-between py-3 border-t border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center gap-3">
            <div class="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded"></div>
            <span class="text-sm font-medium text-gray-900 dark:text-white">
              Add payment method
            </span>
          </div>
          <UButton 
            color="neutral" 
            variant="subtle" 
            size="xs"
          >
            Enter card details
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'sidebar'
})
</script>