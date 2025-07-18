<template>
  <UDashboardGroup>
    <Sidebar />
    <UDashboardPanel class="bg-gray-50 dark:bg-gray-950 min-h-full">
      <template #header>
        <UDashboardNavbar
          :toggle="true"
          class="p-5"
        >
          <template #title>
            <div class="flex items-center gap-2 text-xs">
              <UButton 
                v-if="parentSection" 
                :to="`/${parentSection}`" 
                color="gray" 
                variant="link" 
                size="sm" 
                class="text-gray-600 dark:text-gray-400 p-0"
              >
                {{ parentSectionTitle }}
              </UButton>
              <Icon v-if="parentSection" name="i-heroicons-chevron-right" class="w-4 h-4 text-gray-400" />
              <span class="text-gray-900 dark:text-white">{{ title }}</span>
              <span 
                v-if="route.name === 'integrations-shopify'" 
                class="ml-2 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-full"
              >
                Connected
              </span>
            </div>
          </template>
        </UDashboardNavbar>
      </template>

    <template #body>
      <div class="">
        <slot />
      </div>
    </template>
    </UDashboardPanel>
    <UDashboardSearch :groups="groups" />
    <NotificationsSlideover />
  </UDashboardGroup>
</template>

<script setup>
import Sidebar from '~/components/Sidebar.vue'

const route = useRoute()

const title = computed(() => {
  const routePart = route.name.split('-').pop()
  return routePart.charAt(0).toUpperCase() + routePart.slice(1)
})

const parentSection = computed(() => {
  const routeParts = route.name.split('-')
  // Check if this is a nested route (has more than one part and isn't an index page)
  if (routeParts.length > 1 && routeParts[1] !== 'index') {
    return routeParts[0]
  }
  return null
})

const parentSectionTitle = computed(() => {
  if (!parentSection.value) return null
  return parentSection.value.charAt(0).toUpperCase() + parentSection.value.slice(1)
})
</script>