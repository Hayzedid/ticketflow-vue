<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800">
      <div class="absolute top-0 left-0 w-full h-full opacity-20">
        <div class="animate-float absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
        <div class="animate-float absolute top-40 right-20 w-24 h-24 bg-pink-300 rounded-full blur-lg" style="animation-delay: 1s"></div>
        <div class="animate-float absolute bottom-20 left-1/4 w-40 h-40 bg-blue-300 rounded-full blur-2xl" style="animation-delay: 2s"></div>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="relative z-50 px-6 py-4">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div class="text-2xl font-bold text-white">
          ✨ TicketFlow
        </div>
        <div class="space-x-4">
          <router-link :to="{ name: 'login' }" class="text-white hover:text-purple-200 transition-colors">
            Login
          </router-link>
          <router-link :to="{ name: 'signup' }" class="btn btn-secondary">
            Get Started
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="relative z-10 min-h-screen flex items-center">
      <div class="max-w-7xl mx-auto px-6 py-20">
        <div class="text-center">
          <div class="animate-fadeIn">
            <h1 class="text-6xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              Ticket Management
              <span class="block bg-gradient-to-r from-pink-400 to-purple-300 bg-clip-text text-transparent">
                Reimagined
              </span>
            </h1>
            <p class="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your support workflow with our beautiful, intuitive ticket management system. 
              Built for modern teams who demand excellence.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <router-link
                :to="{ name: 'signup' }"
                class="btn btn-primary text-lg px-8 py-4 animate-pulse"
              >
                🚀 Start Free Trial
              </router-link>
              <router-link
                :to="{ name: 'login' }"
                class="btn btn-secondary text-lg px-8 py-4"
              >
                💼 Sign In
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="relative py-20 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-extrabold text-gray-900 mb-4">
            Why Choose TicketFlow?
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of support management with our cutting-edge features
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="(feature, index) in features" :key="feature.name" 
               class="card p-6 text-center animate-fadeIn" 
               :style="`animation-delay: ${index * 0.1}s`">
            <div class="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircleIcon class="h-8 w-8 text-white" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ feature.name }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="relative py-20 bg-gradient-to-r from-purple-600 to-blue-600">
      <div class="max-w-4xl mx-auto text-center px-6">
        <h2 class="text-4xl font-extrabold text-white mb-4">
          Ready to Transform Your Support?
        </h2>
        <p class="text-xl text-purple-100 mb-8">
          Join thousands of teams already using TicketFlow to deliver exceptional customer support.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link :to="{ name: 'signup' }" class="btn btn-primary text-lg px-8 py-4">
            Start Free Trial
          </router-link>
          <router-link :to="{ name: 'login' }" class="btn btn-secondary text-lg px-8 py-4">
            Sign In
          </router-link>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center">
          <div class="text-2xl font-bold mb-4">✨ TicketFlow</div>
          <p class="text-gray-400 mb-6">
            The modern way to manage support tickets
          </p>
          <div class="flex justify-center space-x-6 mb-6">
            <router-link :to="{ name: 'landing' }" class="text-gray-400 hover:text-white transition-colors">
              Home
            </router-link>
            <router-link :to="{ name: 'login' }" class="text-gray-400 hover:text-white transition-colors">
              Sign In
            </router-link>
            <router-link :to="{ name: 'signup' }" class="text-gray-400 hover:text-white transition-colors">
              Sign Up
            </router-link>
          </div>
          <p class="text-gray-500 text-sm">
            &copy; {{ new Date().getFullYear() }} TicketFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { CheckCircleIcon } from '@heroicons/vue/24/outline'

const features = [
  {
    name: 'Easy Ticket Creation',
    description: 'Quickly create and submit support tickets with all the necessary details.'
  },
  {
    name: 'Real-time Updates',
    description: 'Get instant notifications and updates on your support tickets.'
  },
  {
    name: 'Team Collaboration',
    description: 'Easily assign tickets to team members and collaborate on solutions.'
  },
  {
    name: 'Powerful Dashboard',
    description: 'Track all your tickets and their statuses from a single dashboard.'
  }
]
</script>

<style scoped>
.bg-primary-100 {
  background-color: #dbeafe;
}

.bg-primary-200 {
  background-color: #bfdbfe;
}

.bg-primary-500 {
  background-color: #3b82f6;
}

.hover\:bg-primary-200:hover {
  background-color: #bfdbfe;
}

.hover\:bg-primary-700:hover {
  background-color: #1d4ed8;
}

.fill-current {
  fill: currentColor;
}

.text-gray-100 {
  color: #f3f4f6;
}
</style>
