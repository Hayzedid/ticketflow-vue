<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
      <p class="mt-2 text-sm text-gray-700">
        Here's what's happening with your tickets today.
      </p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                <span class="text-white text-sm font-medium">{{ ticketStore.totalTickets }}</span>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Total Tickets</dt>
                <dd class="text-lg font-medium text-gray-900">{{ ticketStore.totalTickets }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                <span class="text-white text-sm font-medium">{{ ticketStore.openTickets }}</span>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Open Tickets</dt>
                <dd class="text-lg font-medium text-gray-900">{{ ticketStore.openTickets }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                <span class="text-white text-sm font-medium">{{ ticketStore.inProgressTickets }}</span>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">In Progress</dt>
                <dd class="text-lg font-medium text-gray-900">{{ ticketStore.inProgressTickets }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-gray-500 rounded-md flex items-center justify-center">
                <span class="text-white text-sm font-medium">{{ ticketStore.closedTickets }}</span>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Closed</dt>
                <dd class="text-lg font-medium text-gray-900">{{ ticketStore.closedTickets }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white shadow rounded-lg p-6">
      <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Quick Actions</h3>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <router-link
          to="/app/tickets/create"
          class="relative group bg-white p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400"
        >
          <div class="text-center">
            <h3 class="text-lg font-medium text-gray-900">Create New Ticket</h3>
            <p class="mt-2 text-sm text-gray-500">Submit a new support ticket or feature request.</p>
          </div>
        </router-link>

        <router-link
          to="/app/tickets"
          class="relative group bg-white p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400"
        >
          <div class="text-center">
            <h3 class="text-lg font-medium text-gray-900">View All Tickets</h3>
            <p class="mt-2 text-sm text-gray-500">Browse and manage all your support tickets.</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTicketStore } from '@/stores/tickets'

const ticketStore = useTicketStore()
</script>
