<template>
  <div class="p-6 max-w-4xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Billing</h1>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Manage your billing information and subscription details.
      </p>
    </div>

    <div class="space-y-6">
      <!-- Current Plan -->
      <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 class="text-base font-semibold text-gray-900 dark:text-white mb-4">Current Plan</h2>
        <div class="flex items-center justify-between">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-lg font-medium text-gray-900 dark:text-white">Professional</span>
              <span class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full">
                Current
              </span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">$99/month • Next billing: March 15, 2024</p>
          </div>
          <UButton color="gray" variant="outline" size="sm">
            Change Plan
          </UButton>
        </div>
      </div>

      <!-- Payment Method -->
      <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-base font-semibold text-gray-900 dark:text-white">Payment Method</h2>
          <UButton color="gray" variant="outline" size="sm">
            Update
          </UButton>
        </div>
        
        <div class="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div class="w-8 h-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
            <span class="text-white text-xs font-bold">••••</span>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-900 dark:text-white">•••• •••• •••• 4242</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">Expires 12/25</p>
          </div>
        </div>
      </div>

      <!-- Add Payment Method Form -->
      <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 class="text-base font-semibold text-gray-900 dark:text-white mb-4">Add New Payment Method</h2>
        
        <form @submit.prevent="addPaymentMethod" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Card Number
            </label>
            <UInput 
              v-model="paymentForm.cardNumber" 
              placeholder="1234 5678 9012 3456"
              class="w-full"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Expiry Date
              </label>
              <UInput 
                v-model="paymentForm.expiryDate" 
                placeholder="MM/YY"
                class="w-full"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                CVC
              </label>
              <UInput 
                v-model="paymentForm.cvc" 
                placeholder="123"
                class="w-full"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Cardholder Name
            </label>
            <UInput 
              v-model="paymentForm.cardholderName" 
              placeholder="John Doe"
              class="w-full"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Billing Address
            </label>
            <UInput 
              v-model="paymentForm.billingAddress" 
              placeholder="123 Main St, City, State 12345"
              class="w-full"
            />
          </div>

          <div class="flex items-center gap-3 pt-4">
            <UButton type="submit" color="primary">
              Add Payment Method
            </UButton>
            <UButton type="button" color="gray" variant="outline">
              Cancel
            </UButton>
          </div>
        </form>
      </div>

      <!-- Billing History -->
      <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 class="text-base font-semibold text-gray-900 dark:text-white mb-4">Billing History</h2>
        
        <div class="space-y-3">
          <div class="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-white">Feb 15, 2024</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Professional Plan</p>
            </div>
            <div class="text-right">
              <p class="text-sm font-medium text-gray-900 dark:text-white">$99.00</p>
              <UButton color="gray" variant="ghost" size="xs">
                Download
              </UButton>
            </div>
          </div>
          
          <div class="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-white">Jan 15, 2024</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Professional Plan</p>
            </div>
            <div class="text-right">
              <p class="text-sm font-medium text-gray-900 dark:text-white">$99.00</p>
              <UButton color="gray" variant="ghost" size="xs">
                Download
              </UButton>
            </div>
          </div>
          
          <div class="flex items-center justify-between py-3">
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-white">Dec 15, 2023</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Professional Plan</p>
            </div>
            <div class="text-right">
              <p class="text-sm font-medium text-gray-900 dark:text-white">$99.00</p>
              <UButton color="gray" variant="ghost" size="xs">
                Download
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: 'sidebar'
})

const paymentForm = reactive({
  cardNumber: '',
  expiryDate: '',
  cvc: '',
  cardholderName: '',
  billingAddress: ''
})

const addPaymentMethod = () => {
  // Handle form submission
  console.log('Adding payment method:', paymentForm)
  // Reset form after submission
  Object.keys(paymentForm).forEach(key => {
    paymentForm[key] = ''
  })
}
</script>