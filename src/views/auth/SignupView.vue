<template>
  <div>
    <div>
      <h2 class="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
      <p class="mt-2 text-sm text-gray-600">
        Or
        <router-link to="/auth/login" class="font-medium text-primary-600 hover:text-primary-500">
          sign in to your existing account
        </router-link>
      </p>
    </div>

    <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
      <div>
        <label for="name" class="label">Full name</label>
        <input
          id="name"
          v-model="formData.name"
          type="text"
          required
          class="input"
          placeholder="Enter your full name"
        />
      </div>

      <div>
        <label for="email" class="label">Email address</label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          required
          class="input"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label for="password" class="label">Password</label>
        <input
          id="password"
          v-model="formData.password"
          type="password"
          required
          class="input"
          placeholder="Create a password"
        />
      </div>

      <div>
        <button type="submit" class="btn btn-primary w-full">
          Create account
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const formData = reactive({
  name: '',
  email: '',
  password: ''
})

const handleSubmit = () => {
  // Simple redirect for now
  router.push('/app')
}
</script>
