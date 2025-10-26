<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        <router-link to="/" class="text-primary-600 hover:text-primary-700">
          TicketApp
        </router-link>
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Manage your support tickets with ease
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <router-view />
      </div>
      
      <div class="mt-6 text-center text-sm">
        <router-link 
          to="/" 
          class="font-medium text-primary-600 hover:text-primary-500"
        >
          ← Back to home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No additional logic needed for layout component
</script>

<style scoped>
.hover\:text-primary-500:hover {
  color: #3b82f6;
}

.hover\:text-primary-700:hover {
  color: #1d4ed8;
}
</style>
