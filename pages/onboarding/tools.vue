<template>
  <OnboardingLayout>
    <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-8 max-w-2xl mx-auto">
      <div class="mb-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          What tools are in your stack?
        </h2>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          We'll prepare custom integration guides for your tech stack.
        </p>
      </div>

      <!-- Category Filter -->
      <div class="mb-6">
        <div class="flex flex-wrap gap-2">
          <UButton
            v-for="category in categories"
            :key="category"
            @click="activeCategory = category"
            :color="activeCategory === category ? 'orange' : 'gray'"
            :variant="activeCategory === category ? 'solid' : 'outline'"
            size="sm"
          >
            {{ category }}
          </UButton>
        </div>
      </div>

      <!-- Search -->
      <div class="mb-6">
        <UInput
          v-model="searchQuery"
          placeholder="Find your tool..."
          icon="i-heroicons-magnifying-glass"
          class="w-full"
        />
      </div>

      <!-- Tools Grid -->
      <div class="grid grid-cols-2 gap-3 mb-8">
        <div
          v-for="tool in filteredTools"
          :key="tool.name"
          @click="toggleTool(tool)"
          :class="[
            'flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all',
            selectedTools.includes(tool.name)
              ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
          ]"
        >
          <UCheckbox
            :model-value="selectedTools.includes(tool.name)"
            :ui="{ base: 'pointer-events-none' }"
          />
          <div class="flex-1">
            <div class="font-medium text-sm text-gray-900 dark:text-white">
              {{ tool.name }}
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400">
              {{ tool.category }}
            </div>
          </div>
        </div>
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
          color="orange"
          class="flex-1"
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

const { onboardingData, updateTools, setStep, nextStep, prevStep } = useOnboarding()

setStep(3)

const searchQuery = ref('')
const activeCategory = ref('All')
const selectedTools = ref([...onboardingData.value.tools])

const categories = ['All', 'E-commerce', 'Email & SMS', 'Data Platform', 'Marketing Platform', 'Analytics', 'Digital Advertising']

const tools = [
  { name: 'Shopify', category: 'E-commerce' },
  { name: 'BigCommerce', category: 'E-commerce' },
  { name: 'WooCommerce', category: 'E-commerce' },
  { name: 'Klaviyo', category: 'Email & SMS' },
  { name: 'Attentive', category: 'Email & SMS' },
  { name: 'MailChimp', category: 'Email & SMS' },
  { name: 'LiveRamp', category: 'Data Platform' },
  { name: 'Hightouch', category: 'Data Platform' },
  { name: 'Segment.io', category: 'Data Platform' },
  { name: 'Salesforce Marketing Cloud', category: 'Marketing Platform' },
  { name: 'Adobe Marketing Cloud', category: 'Marketing Platform' },
  { name: 'HubSpot', category: 'Marketing Platform' },
  { name: 'Google Analytics', category: 'Analytics' },
  { name: 'Mixpanel', category: 'Analytics' },
  { name: 'Amplitude', category: 'Analytics' },
  { name: 'Google Ads', category: 'Digital Advertising' },
  { name: 'Facebook Ads Manager', category: 'Digital Advertising' },
  { name: 'TikTok Ads', category: 'Digital Advertising' }
]

const filteredTools = computed(() => {
  let filtered = tools

  if (activeCategory.value !== 'All') {
    filtered = filtered.filter(tool => tool.category === activeCategory.value)
  }

  if (searchQuery.value) {
    filtered = filtered.filter(tool => 
      tool.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  return filtered
})

const toggleTool = (tool) => {
  const index = selectedTools.value.indexOf(tool.name)
  if (index > -1) {
    selectedTools.value.splice(index, 1)
  } else {
    selectedTools.value.push(tool.name)
  }
  updateTools(selectedTools.value)
}

const handleBack = () => {
  prevStep()
  navigateTo('/onboarding/marketing')
}

const handleContinue = () => {
  updateTools(selectedTools.value)
  nextStep()
  navigateTo('/onboarding/complete')
}

watch(selectedTools, (newTools) => {
  updateTools(newTools)
}, { deep: true })
</script>