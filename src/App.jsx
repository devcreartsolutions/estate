import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import HomePage from './pages/HomePage'
import ListingsPage from './pages/ListingsPage'
import PropertyDetailPage from './pages/PropertyDetailPage'
import BuyingPage from './pages/BuyingPage'
import SellingPage from './pages/SellingPage'
import FinancingPage from './pages/FinancingPage'
import HomeValuePage from './pages/HomeValuePage'
import AboutPage from './pages/AboutPage'
import BlogPage from './pages/BlogPage'
import BrokerLoginPage from './pages/BrokerLoginPage'
import BrokerDashboardPage from './pages/BrokerDashboardPage'
import ProtectedRoute from './components/ProtectedRoute'
import ImageToVideo from './components/ImageToVideo'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
        <Routes>
          {/* Property Website Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/properties/:id" element={<PropertyDetailPage />} />
          <Route path="/buying" element={<BuyingPage />} />
          <Route path="/selling" element={<SellingPage />} />
          <Route path="/financing" element={<FinancingPage />} />
          <Route path="/home-value" element={<HomeValuePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/broker/login" element={<BrokerLoginPage />} />
          <Route
            path="/broker/dashboard"
            element={
              <ProtectedRoute>
                <BrokerDashboardPage />
              </ProtectedRoute>
            }
          />
          
          {/* Legacy ImageToVideo route - keep for backward compatibility */}
          <Route path="/video" element={<ImageToVideo />} />
          
          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App