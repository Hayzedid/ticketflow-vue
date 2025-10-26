<template>
  <div>
    <!-- Header -->
    <div class="sm:flex sm:items-center sm:justify-between mb-8">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">Tickets</h1>
        <p class="mt-2 text-sm text-gray-700">
          Manage and track all your support tickets in one place.
        </p>
      </div>
      <div class="mt-4 sm:mt-0">
        <router-link
          to="/app/tickets/create"
          class="btn btn-primary"
        >
          <PlusIcon class="h-5 w-5 mr-2" />
          New Ticket
        </router-link>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white shadow rounded-lg mb-6">
      <div class="px-4 py-5 sm:p-6">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <!-- Search -->
          <div>
            <label for="search" class="label">Search tickets</label>
            <div class="relative">
              <SearchIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="search"
                v-model="searchTerm"
                type="text"
                class="input pl-10"
                placeholder="Search by title or description"
              />
            </div>
          </div>

          <!-- Status Filter -->
          <div>
            <label for="status" class="label">Status</label>
            <select
              id="status"
              v-model="statusFilter"
              class="input"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <!-- Priority Filter -->
          <div>
            <label for="priority" class="label">Priority</label>
            <select
              id="priority"
              v-model="priorityFilter"
              class="input"
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Tickets List -->
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <ul v-if="filteredTickets.length > 0" class="divide-y divide-gray-200">
        <li v-for="ticket in filteredTickets" :key="ticket.id">
          <div class="px-4 py-4 sm:px-6">
            <div class="flex items-center justify-between">
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-primary-600 truncate">
                    #{{ ticket.id }} - {{ ticket.title }}
                  </p>
                  <div class="ml-2 flex-shrink-0 flex space-x-2">
                    <span :class="getPriorityBadgeClass(ticket.priority)">
                      {{ ticket.priority }}
                    </span>
                    <span :class="getStatusBadgeClass(ticket.status)">
                      {{ ticket.status.replace('_', ' ') }}
                    </span>
                  </div>
                </div>
                <p class="mt-2 text-sm text-gray-500 line-clamp-2">
                  {{ ticket.description }}
                </p>
                <div class="mt-2 flex items-center text-sm text-gray-500">
                  <p>
                    Created {{ formatDate(ticket.createdAt) }} • Assigned to {{ ticket.assignee }}
                  </p>
                </div>
              </div>
            </div>
            <div class="mt-4 flex justify-end space-x-2">
              <button
                type="button"
                class="btn-sm border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
              >
                <EyeIcon class="h-4 w-4 mr-1" />
                View
              </button>
              <router-link
                :to="`/app/tickets/${ticket.id}/edit`"
                class="btn-sm border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
              >
                <PencilIcon class="h-4 w-4 mr-1" />
                Edit
              </router-link>
              <button
                type="button"
                @click="handleDeleteTicket(ticket.id)"
                class="btn-sm border border-red-300 text-red-700 bg-white hover:bg-red-50"
              >
                <TrashIcon class="h-4 w-4 mr-1" />
                Delete
              </button>
            </div>
          </div>
        </li>
      </ul>
      
      <!-- Empty State -->
      <div v-else class="px-6 py-12 text-center">
        <div class="text-gray-500">
          <FilterIcon class="mx-auto h-12 w-12 text-gray-400" />
          <h3 class="mt-2 text-sm font-medium text-gray-900">No tickets found</h3>
          <p class="mt-1 text-sm text-gray-500">
            {{ ticketStore.tickets.length === 0 
              ? "Get started by creating a new ticket."
              : "Try adjusting your search or filter criteria."
            }}
          </p>
          <div v-if="ticketStore.tickets.length === 0" class="mt-6">
            <router-link
              to="/app/tickets/create"
              class="btn btn-primary"
            >
              <PlusIcon class="h-5 w-5 mr-2" />
              New Ticket
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTicketStore } from '@/stores/tickets'
import { 
  PlusIcon, 
  MagnifyingGlassIcon as SearchIcon, 
  FunnelIcon as FilterIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon
} from '@heroicons/vue/24/outline'

const ticketStore = useTicketStore()

const searchTerm = ref('')
const statusFilter = ref('all')
const priorityFilter = ref('all')

const filteredTickets = computed(() => {
  return ticketStore.tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.value.toLowerCase())
    const matchesStatus = statusFilter.value === 'all' || ticket.status === statusFilter.value
    const matchesPriority = priorityFilter.value === 'all' || ticket.priority === priorityFilter.value
    
    return matchesSearch && matchesStatus && matchesPriority
  })
})

const getStatusBadgeClass = (status: string) => {
  const baseClass = 'badge'
  switch (status) {
    case 'open':
      return `${baseClass} badge-open`
    case 'in_progress':
      return `${baseClass} badge-in_progress`
    case 'closed':
      return `${baseClass} badge-closed`
    default:
      return `${baseClass} badge-closed`
  }
}

const getPriorityBadgeClass = (priority: string) => {
  const baseClass = 'badge'
  switch (priority) {
    case 'high':
      return `${baseClass} badge-high`
    case 'medium':
      return `${baseClass} badge-medium`
    case 'low':
      return `${baseClass} badge-low`
    default:
      return `${baseClass} badge-medium`
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const handleDeleteTicket = async (ticketId: number) => {
  if (window.confirm('Are you sure you want to delete this ticket?')) {
    try {
      await ticketStore.deleteTicket(ticketId)
    } catch (error) {
      console.error('Failed to delete ticket:', error)
    }
  }
}
</script>

<style scoped>
.btn-sm {
  @apply inline-flex items-center px-3 py-1.5 text-xs font-medium rounded;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
