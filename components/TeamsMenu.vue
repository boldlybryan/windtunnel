<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

defineProps<{
  collapsed?: boolean
}>()

const teams = ref([{
  label: 'ACME Corp',
  avatar: {
    alt: 'ACME Corp'
  }
}, {
  label: 'EXMA Inc',
  avatar: {
    alt: 'EXMA Inc'
  }
}, {
  label: 'YoYo Company',
  avatar: {
    alt: 'YoYo Company'
  }
}])
const selectedTeam = ref(teams.value[0])

const items = computed<DropdownMenuItem[][]>(() => {
  return [teams.value.map(team => ({
    ...team,
    onSelect() {
      selectedTeam.value = team
    }
  })), [{
    label: 'Create team',
    icon: 'i-lucide-circle-plus'
  }, {
    label: 'Manage teams',
    icon: 'i-lucide-cog'
  }]]
})
</script>

<template>
  <UDropdownMenu
    :items="items"
    :content="{ align: 'center', collisionPadding: 12 }"
    :ui="{ content: collapsed ? 'w-40' : 'w-(--reka-dropdown-menu-trigger-width)' }"
  >
    <UButton
      v-bind="{
        ...selectedTeam,
        label: collapsed ? undefined : selectedTeam?.label,
        trailingIcon: collapsed ? undefined : 'i-lucide-chevrons-up-down'
      }"
      color="neutral"
      variant="outline"
      block
      :square="collapsed"
      class="data-[state=open]:bg-elevated font-regular text-[13px] text-gray-800 dark:text-gray-200"
      :class="[!collapsed && 'py-2']"
      :ui="{
        trailingIcon: 'text-dimmed text-[16.67px]'
      }"
    />
  </UDropdownMenu>
</template>