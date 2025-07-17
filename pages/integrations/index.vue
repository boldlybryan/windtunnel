<template>
  <div class="">
    <div class=" w-full flex justify-between items-center">
      <div class="">
        <h1 class="text-2xl font-bold">Integrations</h1>
        <p class="text-sm text-gray-500">Connect to the other apps in your tech stack and use that data to power your lifecycle marketing programs</p>
      </div>
        <div>
          <UButton color="neutral" variant="solid">
            Add Integration
            <template #icon>
              <Icon name="lucide:plus" />
            </template>
          </UButton>
        </div>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div v-for="integration in configuredIntegrations" :key="integration.name">
        <h2 class="text-lg font-bold">{{ integration.name }}</h2>
        <p class="text-sm text-gray-500">{{ integration.description }}</p>
        <UButton color="neutral" variant="solid" :to="`/integrations/${integration.name.toLowerCase()}`">
          <template #icon>
            <Icon name="lucide:plus" />
          </template>
          Connect
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'sidebar'
})

const integrations = [
  {
    name: 'Shopify',
    description: 'Pull in your customer list, order file, and product inventory to power your direct mail programs',
  },
]

const configuredIntegrations = [
  {
    name: 'Shopify',
    description: 'Pull in your customer list, order file, and product inventory to power your direct mail programs',
  },
]
</script>