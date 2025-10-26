<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center">
        <router-link
          to="/app/tickets"
          class="mr-4 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          <ArrowLeftIcon class="h-5 w-5 mr-1" />
          Back to tickets
        </router-link>
      </div>
      <h1 class="mt-2 text-2xl font-semibold text-gray-900">Create New Ticket</h1>
      <p class="mt-1 text-sm text-gray-600">
        Fill out the form below to create a new support ticket.
      </p>
    </div>

    <!-- Toast Notification -->
    <div v-if="toast" :class="[
      'mb-6 p-4 rounded-md border',
      toast.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
    ]">
      <div class="flex">
        <div class="ml-3">
          <p :class="[
            'text-sm font-medium',
            toast.type === 'success' ? 'text-green-800' : 'text-red-800'
          ]">
            {{ toast.message }}
          </p>
        </div>
      </div>
    </div>

    <!-- Form -->
    <div class="bg-white shadow rounded-lg">
      <form @submit.prevent="handleSubmit" class="space-y-6 p-6">
        <!-- Title -->
        <div>
          <label for="title" class="label">
            Title <span class="text-red-500">*</span>
          </label>
          <input
            id="title"
            v-model="formData.title"
            type="text"
            required
            :class="[
              'input',
              errors.title ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
            ]"
            placeholder="Enter a descriptive title for your ticket"
            maxlength="100"
            @input="clearError('title')"
          />
          <p v-if="errors.title" class="mt-1 text-sm text-red-600">{{ errors.title }}</p>
          <p class="mt-1 text-sm text-gray-500">
            {{ formData.title.length }}/100 characters
          </p>
        </div>

        <!-- Description -->
        <div>
          <label for="description" class="label">Description</label>
          <textarea
            id="description"
            v-model="formData.description"
            rows="4"
            :class="[
              'input',
              errors.description ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
            ]"
            placeholder="Provide detailed information about the issue or request"
            maxlength="1000"
            @input="clearError('description')"
          />
          <p v-if="errors.description" class="mt-1 text-sm text-red-600">{{ errors.description }}</p>
          <p class="mt-1 text-sm text-gray-500">
            {{ formData.description.length }}/1000 characters
          </p>
        </div>

        <!-- Status and Priority Row -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <!-- Status -->
          <div>
            <label for="status" class="label">
              Status <span class="text-red-500">*</span>
            </label>
            <select
              id="status"
              v-model="formData.status"
              required
              :class="[
                'input',
                errors.status ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
              ]"
              @change="clearError('status')"
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
            <p v-if="errors.status" class="mt-1 text-sm text-red-600">{{ errors.status }}</p>
          </div>

          <!-- Priority -->
          <div>
            <label for="priority" class="label">Priority</label>
            <select
              id="priority"
              v-model="formData.priority"
              :class="[
                'input',
                errors.priority ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
              ]"
              @change="clearError('priority')"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <p v-if="errors.priority" class="mt-1 text-sm text-red-600">{{ errors.priority }}</p>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <router-link
            to="/app/tickets"
            class="btn btn-secondary"
          >
            Cancel
          </router-link>
          <button
            type="submit"
            :disabled="loading"
            class="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div v-if="loading" class="flex items-center">
              <div class="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
              Creating...
            </div>
            <span v-else>Create Ticket</span>
          </button>
        </div>
      </form>
    </div>

    <!-- Help Text -->
    <div class="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4">
      <div class="flex">
        <div class="ml-3">
          <h3 class="text-sm font-medium text-blue-800">
            Tips for creating effective tickets
          </h3>
          <div class="mt-2 text-sm text-blue-700">
            <ul class="list-disc pl-5 space-y-1">
              <li>Use a clear and descriptive title</li>
              <li>Provide detailed steps to reproduce the issue</li>
              <li>Include relevant error messages or screenshots</li>
              <li>Set appropriate priority based on business impact</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useTicketStore } from '@/stores/tickets'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const ticketStore = useTicketStore()

const formData = reactive({
  title: '',
  description: '',
  status: 'open' as 'open' | 'in_progress' | 'closed',
  priority: 'medium' as 'low' | 'medium' | 'high'
})

const errors = ref<Record<string, string>>({})
const loading = ref(false)
const toast = ref<{ type: 'success' | 'error'; message: string } | null>(null)

const validateForm = () => {
  const newErrors: Record<string, string> = {}

  // Title validation (required)
  if (!formData.title.trim()) {
    newErrors.title = 'Title is required'
  } else if (formData.title.trim().length < 3) {
    newErrors.title = 'Title must be at least 3 characters long'
  } else if (formData.title.trim().length > 100) {
    newErrors.title = 'Title must be less than 100 characters'
  }

  // Description validation (optional but with length limits)
  if (formData.description && formData.description.length > 1000) {
    newErrors.description = 'Description must be less than 1000 characters'
  }

  // Status validation (required, must be one of allowed values)
  const allowedStatuses = ['open', 'in_progress', 'closed']
  if (!formData.status) {
    newErrors.status = 'Status is required'
  } else if (!allowedStatuses.includes(formData.status)) {
    newErrors.status = 'Status must be one of: open, in_progress, closed'
  }

  // Priority validation (optional but must be valid if provided)
  const allowedPriorities = ['low', 'medium', 'high']
  if (formData.priority && !allowedPriorities.includes(formData.priority)) {
    newErrors.priority = 'Priority must be one of: low, medium, high'
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) {
    toast.value = { type: 'error', message: 'Please fix the errors below and try again.' }
    return
  }

  loading.value = true
  toast.value = null

  try {
    await ticketStore.createTicket({
      title: formData.title.trim(),
      description: formData.description,
      status: formData.status,
      priority: formData.priority
    })

    toast.value = { type: 'success', message: 'Ticket created successfully! Redirecting...' }
    
    setTimeout(() => {
      router.push('/app/tickets')
    }, 1000)
  } catch (error) {
    toast.value = { 
      type: 'error', 
      message: error instanceof Error ? error.message : 'Failed to create ticket. Please try again.' 
    }
  } finally {
    loading.value = false
  }
}

const clearError = (field: string) => {
  if (errors.value[field]) {
    delete errors.value[field]
  }
}
</script>
