import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [broker, setBroker] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored broker session
    const storedBroker = localStorage.getItem('broker')
    if (storedBroker) {
      try {
        setBroker(JSON.parse(storedBroker))
      } catch (e) {
        localStorage.removeItem('broker')
      }
    }
    setLoading(false)
  }, [])

  const login = (brokerData) => {
    setBroker(brokerData)
    localStorage.setItem('broker', JSON.stringify(brokerData))
  }

  const logout = () => {
    setBroker(null)
    localStorage.removeItem('broker')
  }

  return (
    <AuthContext.Provider value={{ broker, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

