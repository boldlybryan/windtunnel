<template>
  <div class="p-6 max-w-4xl">
    <!-- Page Header -->
    <div class="flex items-center justify-between mb-4">
      <div>
        <h1 class="text-lg font-semibold text-neutral-700 mb-1">Integrations</h1>
        <p class="text-xs text-neutral-500 leading-4">
          Connect to the other apps in your tech stack and use that data to power your lifecycle marketing programs
        </p>
      </div>
      <UButton class="bg-neutral-900 text-white px-2.5 py-1.5 text-xs font-medium">
        Add Integration
        <template #trailing>
          <Icon name="lucide:plus" class="w-4 h-4" />
        </template>
      </UButton>
    </div>

    <!-- Connected Integration Card -->
    <NuxtLink to="/integrations/shopify" class="block">
      <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow cursor-pointer">
        <!-- Integration Header -->
        <div class="flex items-center gap-3 mb-5">
          <!-- Shopify Logo -->
          <div class="w-10 h-10 bg-black rounded flex items-center justify-center flex-shrink-0">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="4" fill="black"/>
              <path d="M29.7579 10.5774C29.7368 10.4313 29.6096 10.3477 29.5037 10.3477C29.3977 10.3477 27.2999 10.306 27.2999 10.306C27.2999 10.306 25.5412 8.63578 25.3716 8.44788C25.2021 8.28086 24.8631 8.32261 24.7359 8.36437C24.7359 8.36437 24.3969 8.46876 23.846 8.63578C23.7612 8.34349 23.6129 7.98857 23.4222 7.61277C22.8077 6.44363 21.8753 5.8173 20.7734 5.8173C20.6887 5.8173 20.6251 5.8173 20.5403 5.83818C20.498 5.79642 20.4768 5.75467 20.4344 5.73379C19.947 5.23273 19.3325 4.98219 18.5909 5.00098C17.1711 5.04274 15.7514 6.06574 14.586 7.86122C13.7808 9.13475 13.1663 10.7215 12.9756 11.9532C11.3439 12.4543 10.1997 12.8092 10.1573 12.8092C9.33089 13.0597 9.3097 13.0806 9.20375 13.8531C9.16137 14.4377 7 30.9101 7 30.9101L25.1386 34L33 32.0793C32.9788 32.0793 29.7791 10.7215 29.7579 10.5753V10.5774ZM22.9348 8.92806C22.511 9.05333 22.0448 9.19947 21.5363 9.3665C21.5363 8.65666 21.4303 7.65453 21.1125 6.81943C22.1932 6.98645 22.7229 8.19735 22.9348 8.92806ZM20.5827 9.6379C19.6292 9.93019 18.5909 10.2434 17.5526 10.5565C17.8492 9.45001 18.4002 8.36437 19.0782 7.63365C19.3325 7.36224 19.6927 7.06996 20.0954 6.90294C20.5192 7.71716 20.6039 8.86543 20.5827 9.6379ZM18.6333 5.94257C18.9723 5.94257 19.2478 6.0052 19.4808 6.17222C19.0994 6.36012 18.718 6.6524 18.379 7.0282C17.4678 7.98857 16.7685 9.47088 16.4931 10.9114C15.6243 11.1828 14.7767 11.4334 14.0139 11.663C14.5224 9.38737 16.4507 6.0052 18.6333 5.94257Z" fill="#95BF47"/>
              <path d="M29.442 10.9528C29.3342 10.9528 27.1995 10.9121 27.1995 10.9121C27.1995 10.9121 25.4097 9.28478 25.2372 9.10171C25.1725 9.04068 25.0863 9 25 9V34L33 32.1286C33 32.1286 29.7439 11.319 29.7224 11.1766C29.6792 11.0342 29.5499 10.9528 29.442 10.9528Z" fill="#5E8E3E"/>
              <path d="M21 14.3103L20.083 17.6772C20.083 17.6772 19.0593 17.2172 17.8436 17.3008C16.0522 17.4054 16.0521 18.5137 16.0521 18.7856C16.1588 20.2913 20.1896 20.6259 20.4242 24.1601C20.5948 26.9415 18.9313 28.8445 16.5 28.9909C13.5995 29.1373 12 27.4643 12 27.4643L12.6185 24.8921C12.6185 24.8921 14.2393 26.0841 15.519 26.0004C16.3507 25.9586 16.6706 25.2685 16.628 24.8084C16.5 22.8426 13.2156 22.9681 13.0024 19.7267C12.8318 17.008 14.6446 14.2685 18.654 14.0175C20.2109 13.913 21 14.3103 21 14.3103Z" fill="white"/>
            </svg>
          </div>

          <!-- Integration Info -->
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <h3 class="text-sm font-semibold text-neutral-700">Shopify</h3>
              <span class="bg-green-50 text-green-600 px-1 py-0.5 rounded text-xs font-medium">
                Connected
              </span>
            </div>
            <p class="text-xs text-neutral-500">https://acmecorp.myshopify.com</p>
          </div>

          <!-- Manage Button -->
          <UButton 
            color="neutral" 
            variant="soft" 
            size="xs" 
            class="px-2 py-1"
            @click.stop="$event.preventDefault()"
          >
            Manage
          </UButton>
        </div>

        <!-- Integration Details -->
        <div class="flex gap-5 text-xs text-neutral-500">
          <div class="w-48">
            <p class="mb-0 leading-4">Last import on</p>
            <p class="text-neutral-500 leading-4">Tues, July 8, 2025 at 12:23 PM</p>
          </div>
          <div class="w-48">
            <p class="mb-0 leading-4">Synced Data</p>
            <p class="leading-4">Customers, Orders, Products</p>
          </div>
          <div class="w-48">
            <p class="mb-0 leading-4">Website Tracking</p>
            <p class="leading-4">Page views, Conversions, Carts</p>
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'sidebar'
})
</script>