import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface Ticket {
  id: number
  title: string
  description: string
  status: 'open' | 'in_progress' | 'closed'
  priority: 'low' | 'medium' | 'high'
  createdAt: string
  updatedAt: string
  assignee: string
}

export const useTicketStore = defineStore('tickets', () => {
  const tickets = ref<Ticket[]>([
    {
      id: 1,
      title: 'Login issue with mobile app',
      description: 'Users are unable to log in using the mobile application. The error occurs after entering credentials.',
      status: 'open',
      priority: 'high',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T14:20:00Z',
      assignee: 'John Doe'
    },
    {
      id: 2,
      title: 'Feature request: Dark mode',
      description: 'Add dark mode support to improve user experience during night time usage.',
      status: 'in_progress',
      priority: 'medium',
      createdAt: '2024-01-14T09:15:00Z',
      updatedAt: '2024-01-15T11:45:00Z',
      assignee: 'Jane Smith'
    },
    {
      id: 3,
      title: 'Payment processing error',
      description: 'Payment gateway returns error 500 when processing credit card transactions.',
      status: 'open',
      priority: 'high',
      createdAt: '2024-01-14T16:20:00Z',
      updatedAt: '2024-01-14T16:20:00Z',
      assignee: 'Mike Johnson'
    },
    {
      id: 4,
      title: 'UI improvement suggestions',
      description: 'Several UI elements could be improved for better accessibility and user experience.',
      status: 'closed',
      priority: 'low',
      createdAt: '2024-01-13T14:10:00Z',
      updatedAt: '2024-01-14T10:30:00Z',
      assignee: 'Sarah Wilson'
    },
    {
      id: 5,
      title: 'Database performance issue',
      description: 'Queries are running slowly during peak hours, affecting application performance.',
      status: 'in_progress',
      priority: 'high',
      createdAt: '2024-01-12T11:00:00Z',
      updatedAt: '2024-01-15T09:15:00Z',
      assignee: 'Alex Brown'
    }
  ])

  const loading = ref(false)

  // Computed statistics
  const totalTickets = computed(() => tickets.value.length)
  const openTickets = computed(() => tickets.value.filter(t => t.status === 'open').length)
  const inProgressTickets = computed(() => tickets.value.filter(t => t.status === 'in_progress').length)
  const closedTickets = computed(() => tickets.value.filter(t => t.status === 'closed').length)

  const getTicketById = (id: number) => {
    return tickets.value.find(ticket => ticket.id === id)
  }

  const createTicket = async (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'assignee'>): Promise<Ticket> => {
    loading.value = true
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const newTicket: Ticket = {
        id: Date.now(),
        ...ticketData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        assignee: 'Current User'
      }
      
      tickets.value.unshift(newTicket)
      return newTicket
    } finally {
      loading.value = false
    }
  }

  const updateTicket = async (id: number, ticketData: Partial<Omit<Ticket, 'id' | 'createdAt'>>): Promise<Ticket> => {
    loading.value = true
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const index = tickets.value.findIndex(t => t.id === id)
      if (index === -1) {
        throw new Error('Ticket not found')
      }
      
      const updatedTicket: Ticket = {
        ...tickets.value[index],
        ...ticketData,
        updatedAt: new Date().toISOString()
      }
      
      tickets.value[index] = updatedTicket
      return updatedTicket
    } finally {
      loading.value = false
    }
  }

  const deleteTicket = async (id: number): Promise<void> => {
    loading.value = true
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const index = tickets.value.findIndex(t => t.id === id)
      if (index === -1) {
        throw new Error('Ticket not found')
      }
      
      tickets.value.splice(index, 1)
    } finally {
      loading.value = false
    }
  }

  return {
    tickets,
    loading,
    totalTickets,
    openTickets,
    inProgressTickets,
    closedTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket
  }
})
