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
          <label class="flex items-center gap-3 cursor-pointer">
            <UCheckbox 
              v-model="checklist.shopifyApp"
            />
            <span class="text-sm font-medium" :class="checklist.shopifyApp ? 'text-gray-500 dark:text-gray-400 line-through' : 'text-gray-900 dark:text-white'">
              Install NaviStone app on your Shopify store
            </span>
          </label>
          <UButton 
            color="neutral" 
            variant="subtle" 
            size="xs"
            :disabled="checklist.shopifyApp"
          >
            Install app
          </UButton>
        </div>

        <!-- Pending items -->
        <div class="flex items-center justify-between py-3 border-t border-gray-200 dark:border-gray-700">
          <label class="flex items-center gap-3 cursor-pointer">
            <UCheckbox 
              v-model="checklist.dataSync"
            />
            <span class="text-sm font-medium" :class="checklist.dataSync ? 'text-gray-500 dark:text-gray-400 line-through' : 'text-gray-900 dark:text-white'">
              Enable automatic data syncing
            </span>
          </label>
          <UButton 
            color="neutral" 
            variant="subtle" 
            size="xs"
          >
            Enable sync
          </UButton>
        </div>

        <div class="flex items-center justify-between py-3 border-t border-gray-200 dark:border-gray-700">
          <label class="flex items-center gap-3 cursor-pointer">
            <UCheckbox 
              v-model="checklist.trackingScript"
            />
            <span class="text-sm font-medium" :class="checklist.trackingScript ? 'text-gray-500 dark:text-gray-400 line-through' : 'text-gray-900 dark:text-white'">
              Install tracking script on your website
            </span>
          </label>
          <UButton 
            color="neutral" 
            variant="subtle" 
            size="xs"
          >
            Install script
          </UButton>
        </div>

        <div class="flex items-center justify-between py-3 border-t border-b border-gray-200 dark:border-gray-700">
          <label class="flex items-center gap-3 cursor-pointer">
            <UCheckbox 
              v-model="checklist.paymentMethod"
            />
            <span class="text-sm font-medium" :class="checklist.paymentMethod ? 'text-gray-500 dark:text-gray-400 line-through' : 'text-gray-900 dark:text-white'">
              Add payment method
            </span>
          </label>
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

const checklist = reactive({
  shopifyApp: true,
  dataSync: false,
  trackingScript: false,
  paymentMethod: false
})
</script>