<template>
  <UDashboardGroup>
    <Sidebar />
    <UDashboardPanel>
      <template #header>
        <UDashboardNavbar
          :title="title"
          icon="ph:house-line-duotone"
          :toggle="true"
          class="p-6 h-auto"
          :ui="{
            title: 'text-sm font-regular',
            icon: 'text-sm',
          }"
        />
      </template>

    <template #body>
      <slot />
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
  return route.name.split('/').pop().charAt(0).toUpperCase() + route.name.split('/').pop().slice(1)
})
</script>