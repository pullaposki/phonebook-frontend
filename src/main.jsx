import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ErrorProvider } from './context/ErrorProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorProvider>
      <App />
    </ErrorProvider>
  </React.StrictMode>,
)
