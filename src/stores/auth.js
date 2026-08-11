import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { account } from '@/lib/appwrite'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(localStorage.getItem('isAdminAuthenticated') === 'true')
  const user = ref(null)

  const login = async (email, password) => {
    try {
      await account.createEmailPasswordSession(email, password)
      const session = await account.get()
      user.value = session
      isAuthenticated.value = true
      localStorage.setItem('isAdminAuthenticated', 'true')
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = async () => {
    try {
      await account.deleteSession('current')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      isAuthenticated.value = false
      user.value = null
      localStorage.removeItem('isAdminAuthenticated')
    }
  }

  const checkAuth = async () => {
    try {
      const session = await account.get()
      user.value = session
      isAuthenticated.value = true
      localStorage.setItem('isAdminAuthenticated', 'true')
    } catch (error) {
      isAuthenticated.value = false
      user.value = null
      localStorage.removeItem('isAdminAuthenticated')
    }
  }

  return {
    isAuthenticated,
    user,
    login,
    logout,
    checkAuth,
  }
})
