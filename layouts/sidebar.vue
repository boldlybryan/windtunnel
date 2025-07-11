<template>
  <UDashboardGroup>
    <Sidebar />
    <UDashboardContent class="p-4">
      <slot />
    </UDashboardContent>
    <UDashboardSearch :groups="groups" />
    <NotificationsSlideover />
  </UDashboardGroup>
</template>

<script setup>
import Sidebar from '~/components/Sidebar.vue'
</script>