import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider as ChakraProvider } from "./components/ui/provider"
import { Provider } from 'react-redux'
import { store } from './store'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from "./components/ui/toaster"

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <Toaster />
        <BrowserRouter>

          <App />
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  </StrictMode>
)
