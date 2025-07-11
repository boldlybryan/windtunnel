<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const toast = useToast()

const open = ref(false)

const links = [[{
  label: 'Dashboard',
  icon: 'ph:house-line-duotone',
  to: '/dashboard',
  onSelect: () => {
    open.value = false
  }
}, {
  label: 'Campaigns',
  icon: 'ph:megaphone-duotone',
  to: '/campaigns',
  onSelect: () => {
    open.value = false
  }
}, {
  label: 'Audience',
  icon: 'ph:users-three-duotone',
  to: '/audience',
  onSelect: () => {
    open.value = false
  }
}, {
  label: 'Analytics',
  to: '/analytics',
  icon: 'ph:chart-bar-duotone',
  defaultOpen: false,
  type: 'trigger',
  children: [{
    label: 'General',
    to: '/settings',
    exact: true,
    onSelect: () => {
      open.value = false
    }
  }, {
    label: 'Members',
    to: '/settings/members',
    onSelect: () => {
      open.value = false
    }
  }, {
    label: 'Notifications',
    to: '/settings/notifications',
    onSelect: () => {
      open.value = false
    }
  }, {
    label: 'Security',
    to: '/settings/security',
    onSelect: () => {
      open.value = false
    }
  }]
}, {
  label: 'Integrations',
  icon: 'ph:plugs-duotone',
  to: '/integrations',
  onSelect: () => {
    open.value = false
  }
}], [{
  label: 'Feedback',
  icon: 'i-lucide-message-circle',
  to: 'https://github.com/nuxt-ui-pro/dashboard',
  target: '_blank'
}, {
  label: 'Help & Support',
  icon: 'i-lucide-info',
  to: 'https://github.com/nuxt/ui-pro',
  target: '_blank'
}]] satisfies NavigationMenuItem[][]

const groups = computed(() => [{
  id: 'links',
  label: 'Go to',
  items: links.flat()
}, {
  id: 'code',
  label: 'Code',
  items: [{
    id: 'source',
    label: 'View page source',
    icon: 'i-simple-icons-github',
    to: `https://github.com/nuxt-ui-pro/dashboard/blob/main/app/pages${route.path === '/' ? '/index' : route.path}.vue`,
    target: '_blank'
  }]
}])

onMounted(async () => {
  const cookie = useCookie('cookie-consent')
  if (cookie.value === 'accepted') {
    return
  }

  toast.add({
    title: 'We use first-party cookies to enhance your experience on our website.',
    duration: 0,
    close: false,
    actions: [{
      label: 'Accept',
      color: 'neutral',
      variant: 'outline',
      onClick: () => {
        cookie.value = 'accepted'
      }
    }, {
      label: 'Opt out',
      color: 'neutral',
      variant: 'ghost'
    }]
  })
})
</script>

<template>
  <UDashboardSidebar
    id="default"
    v-model:open="open"
    collapsible
    resizable
    class="bg-elevated/25"
    :ui="{
      footer: 'lg:border-t lg:border-default',
      header: 'm-0 px-[16px] pt-[12px] pb-0 h-auto'
    }"
  >
    <template #header="{ collapsed }">
      <TeamsMenu :collapsed="collapsed"
        :ui="{
          trigger: 'text-md font-medium text-gray-800 dark:text-gray-200',
        }"
      />
    </template>

    <template #default="{ collapsed }">
      <!--UDashboardSearchButton :collapsed="collapsed" class="bg-transparent ring-default" /-->

      <UNavigationMenu
        :collapsed="collapsed"
        :items="links[0]"
        orientation="vertical"
        tooltip
        popover
        :ui="{
          link: 'py-[4px] px-[6px]',
          linkLeadingIcon: 'text-[16px] mr-1 text-gray-800 dark:text-gray-200 opacity-75',
          linkLabel: 'text-[13px] font-[450] text-gray-800 dark:text-gray-200 tracking-[-0.13px] leading-[20px]',

        }"
      />

      <UNavigationMenu
        :collapsed="collapsed"
        :items="links[1]"
        orientation="vertical"
        tooltip
        class="mt-auto"
      />
    </template>

    <template #footer="{ collapsed }">
      <UserMenu :collapsed="collapsed" />
    </template>
  </UDashboardSidebar>
</template>