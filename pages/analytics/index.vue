<template>
  <h1 class="text-lg font-semibold text-neutral-700 mb-1">Analytics</h1>
  <div class="flex flex-col gap-4 mt-3">
    <div class="text-sm">
      <NuxtLink to="/analytics/business">Business Metrics</NuxtLink>
    </div>
    <div class="text-sm">
      <NuxtLink to="/analytics/campaigns">Campaign Metrics</NuxtLink>
    </div>
    <div class="text-sm">
      <NuxtLink to="/analytics/website">Website Metrics</NuxtLink>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'sidebar'
})
</script>