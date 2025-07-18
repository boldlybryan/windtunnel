<template>
  <div class="p-6 space-y-6">
    <!-- Header Section -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-[#7AB55C] rounded-lg flex items-center justify-center">
          <Icon name="simple-icons:shopify" class="text-white text-xl" />
        </div>
        <div>
          <h1 class="text-xl font-semibold text-gray-900 dark:text-white">Shopify</h1>
          <p class="text-sm text-gray-500">Automate data ingestion and track activity on your storefront.</p>
        </div>
      </div>
      <UButton color="black" variant="solid" size="sm">
        Documentation
      </UButton>
    </div>

    <!-- Overview Section Card -->
    <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
      <h2 class="text-base font-semibold mb-3 text-gray-900 dark:text-white">Overview</h2>
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        Turn your Shopify customer data into targeted direct mail campaigns. This integration pulls your store's customer, order, 
        and product data to build precise audience segments for postcard marketing. Our tracking pixel identifies anonymous 
        website visitors and scores their purchase intent, giving you even more prospects to mail.
      </p>
    </div>

    <!-- Connected Stores Section Card -->
    <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-base font-semibold text-gray-900 dark:text-white">Connected Stores</h2>
        <UButton color="gray" variant="outline" size="sm" icon="i-heroicons-plus" class="text-gray-700">
          Add store
        </UButton>
      </div>

      <!-- Store Item -->
      <div class="flex items-center justify-between">
        <div>
          <h3 class="font-medium text-gray-900 dark:text-white">ACME Corp</h3>
          <p class="text-sm text-gray-500">https://acmecorp.myshopify.com</p>
        </div>
        <div class="flex items-center gap-4">
          <span class="text-sm text-gray-500">Enabled July 9, 2025</span>
          <UDropdownMenu
            :items="[
              [
                { label: 'Connected', icon: 'i-heroicons-check', disabled: true }
              ],
              [
                { label: 'Settings', icon: 'i-heroicons-cog-6-tooth' },
                { label: 'Disconnect', icon: 'i-heroicons-trash', color: 'red' }
              ]
            ]"
          >
            <UButton color="gray" variant="outline" size="sm" trailing-icon="i-heroicons-chevron-down">
              Connected
            </UButton>
          </UDropdownMenu>
        </div>
      </div>
    </div>

    <!-- Manage Data Sync Section Card -->
    <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
      <h2 class="text-base font-semibold mb-2 text-gray-900 dark:text-white">Manage Data Sync</h2>
      <p class="text-sm text-gray-500 mb-6">Specify which data to sync from Shopify, and how frequently the syncs run.</p>
      
      <!-- Data Sync Table -->
      <table class="w-full">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Data Type</th>
            <th class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Volume</th>
            <th class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Last Sync</th>
            <th class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Frequency</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
          <tr>
            <td class="py-4 text-sm text-gray-900 dark:text-white">Customers</td>
            <td class="py-4 text-sm text-gray-600 dark:text-gray-400">192,102 customers</td>
            <td class="py-4 text-sm text-gray-600 dark:text-gray-400">7 min ago</td>
            <td class="py-4">
              <UDropdownMenu
                :items="[
                  [
                    { label: 'Every 15 minutes', active: true },
                    { label: 'Every 30 minutes' },
                    { label: 'Every hour' },
                    { label: 'Every 6 hours' },
                    { label: 'Every 24 hours' }
                  ]
                ]"
              >
                <UButton color="gray" variant="ghost" size="xs" trailing-icon="i-heroicons-chevron-down" class="text-gray-700">
                  Every 15 minutes
                </UButton>
              </UDropdownMenu>
            </td>
          </tr>
          <tr>
            <td class="py-4 text-sm text-gray-900 dark:text-white">Orders</td>
            <td class="py-4 text-sm text-gray-600 dark:text-gray-400">124,294 orders</td>
            <td class="py-4 text-sm text-gray-600 dark:text-gray-400">2 hours ago</td>
            <td class="py-4">
              <UDropdownMenu
                :items="[
                  [
                    { label: 'Every 15 minutes' },
                    { label: 'Every 30 minutes' },
                    { label: 'Every hour' },
                    { label: 'Every 6 hours' },
                    { label: 'Every 24 hours', active: true }
                  ]
                ]"
              >
                <UButton color="gray" variant="ghost" size="xs" trailing-icon="i-heroicons-chevron-down" class="text-gray-700">
                  Every 24 hours
                </UButton>
              </UDropdownMenu>
            </td>
          </tr>
          <tr>
            <td class="py-4 text-sm text-gray-900 dark:text-white">Products</td>
            <td class="py-4 text-sm text-gray-600 dark:text-gray-400">439 SKUs</td>
            <td class="py-4 text-sm text-gray-600 dark:text-gray-400">Yesterday</td>
            <td class="py-4">
              <UDropdownMenu
                :items="[
                  [
                    { label: 'Manual', active: true },
                    { label: 'Every hour' },
                    { label: 'Every 6 hours' },
                    { label: 'Every 24 hours' }
                  ]
                ]"
              >
                <UButton color="gray" variant="ghost" size="xs" trailing-icon="i-heroicons-chevron-down" class="text-gray-700">
                  Manual
                </UButton>
              </UDropdownMenu>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Website Tracking Section Card -->
    <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
      <div class="flex items-center gap-2 mb-3">
        <h2 class="text-base font-semibold text-gray-900 dark:text-white">Website Tracking</h2>
        <span class="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-full">
          Active
        </span>
      </div>
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Installing our tracking pixel enables visitor identification and purchase intent scoring. The pixel runs invisibly in the 
        background and doesn't affect your site's performance.
      </p>

      <!-- Configure Events -->
      <div>
        <h3 class="text-sm font-semibold mb-3 text-gray-900 dark:text-white">Configure Events</h3>
        <div class="space-y-3">
          <label class="flex items-center gap-3">
            <UCheckbox v-model="pageViewed" />
            <span class="text-sm text-gray-700 dark:text-gray-300">Page viewed</span>
          </label>
          <label class="flex items-center gap-3">
            <UCheckbox v-model="checkoutCompleted" />
            <span class="text-sm text-gray-700 dark:text-gray-300">Checkout completed</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: 'sidebar'
})

const pageViewed = ref(true)
const checkoutCompleted = ref(true)
</script>