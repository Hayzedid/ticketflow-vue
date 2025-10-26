<template>
  <div>
    <div>
      <h2 class="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
      <p class="mt-2 text-sm text-gray-600">
        Or
        <router-link to="/auth/signup" class="font-medium text-primary-600 hover:text-primary-500">
          create a new account
        </router-link>
      </p>
    </div>

    <!-- Toast Notification -->
    <div v-if="toast" :class="[
      'mt-4 p-4 rounded-md',
      toast.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
    ]">
      <div class="flex">
        <div class="ml-3">
          <p class="text-sm font-medium">{{ toast.message }}</p>
        </div>
      </div>
    </div>

    <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
      <div>
        <label for="email" class="label">
          Email address
        </label>
        <input
          id="email"
          v-model="formData.email"
          name="email"
          type="email"
          autocomplete="email"
          required
          :class="[
            'input',
            errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
          ]"
          placeholder="Enter your email"
        />
        <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
      </div>

      <div>
        <label for="password" class="label">
          Password
        </label>
        <div class="relative">
          <input
            id="password"
            v-model="formData.password"
            name="password"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="current-password"
            required
            :class="[
              'input pr-10',
              errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
            ]"
            placeholder="Enter your password"
          />
          <button
            type="button"
            class="absolute inset-y-0 right-0 pr-3 flex items-center"
            @click="showPassword = !showPassword"
          >
            <EyeOffIcon v-if="showPassword" class="h-5 w-5 text-gray-400" />
            <EyeIcon v-else class="h-5 w-5 text-gray-400" />
          </button>
        </div>
        <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label for="remember-me" class="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>

        <div class="text-sm">
          <a href="#" class="font-medium text-primary-600 hover:text-primary-500">
            Forgot your password?
          </a>
        </div>
      </div>

      <div>
        <button
          type="submit"
          :disabled="loading"
          class="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div v-if="loading" class="flex items-center">
            <div class="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
            Signing in...
          </div>
          <span v-else>Sign in</span>
        </button>
      </div>

      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300" />
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">Demo credentials</span>
          </div>
        </div>
        <div class="mt-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
          <p><strong>Email:</strong> demo@example.com</p>
          <p><strong>Password:</strong> password123</p>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { EyeIcon, EyeSlashIcon as EyeOffIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const formData = reactive({
  email: '',
  password: ''
})

const errors = ref<Record<string, string>>({})
const showPassword = ref(false)
const loading = ref(false)
const toast = ref<{ type: 'success' | 'error'; message: string } | null>(null)

const validateForm = () => {
  const newErrors: Record<string, string> = {}

  if (!formData.email) {
    newErrors.email = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'Email is invalid'
  }

  if (!formData.password) {
    newErrors.password = 'Password is required'
  } else if (formData.password.length < 6) {
    newErrors.password = 'Password must be at least 6 characters'
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) return

  loading.value = true
  toast.value = null

  try {
    await authStore.login(formData.email, formData.password)
    toast.value = { type: 'success', message: 'Login successful! Redirecting...' }
    
    setTimeout(() => {
      const redirectPath = (route.query.redirect as string) || '/app'
      router.push(redirectPath)
    }, 1000)
  } catch (error) {
    toast.value = { 
      type: 'error', 
      message: error instanceof Error ? error.message : 'Login failed. Please try again.' 
    }
  } finally {
    loading.value = false
  }
}

// Clear errors when user starts typing
const clearError = (field: string) => {
  if (errors.value[field]) {
    delete errors.value[field]
  }
}
</script>

<style scoped>
.hover\:text-primary-500:hover {
  color: #3b82f6;
}

.focus\:ring-primary-500:focus {
  box-shadow: 0 0 0 1px #3b82f6;
}

.focus\:border-red-500:focus {
  border-color: #ef4444;
}

.focus\:ring-red-500:focus {
  box-shadow: 0 0 0 1px #ef4444;
}
</style>
