import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './axiosGlobals/axiosGlobals.js'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import UserProvider from './contextAPI/UserProvider.jsx'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <QueryClientProvider client={client}>
      <UserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserProvider>
    </QueryClientProvider>
  </StrictMode>
)
