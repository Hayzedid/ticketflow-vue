import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface User {
  id: string
  email: string
  name: string
  token: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(false)

  const isAuthenticated = computed(() => !!user.value)

  // Initialize auth state from localStorage
  const initAuth = () => {
    const storedUser = localStorage.getItem('ticketapp_session')
    if (storedUser) {
      try {
        user.value = JSON.parse(storedUser)
      } catch (error) {
        localStorage.removeItem('ticketapp_session')
      }
    }
  }

  const login = async (email: string, password: string): Promise<User> => {
    loading.value = true
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (email && password) {
        const mockUser: User = {
          id: '1',
          email,
          name: email.split('@')[0] || 'User',
          token: 'mock-jwt-token'
        }
        
        localStorage.setItem('ticketapp_session', JSON.stringify(mockUser))
        user.value = mockUser
        return mockUser
      } else {
        throw new Error('Invalid credentials')
      }
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    localStorage.removeItem('ticketapp_session')
    user.value = null
    // Navigation will be handled by the component calling logout
  }

  return {
    user,
    loading,
    isAuthenticated,
    initAuth,
    login,
    logout
  }
})
