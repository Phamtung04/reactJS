import React from 'react'
import Dashboard from './layouts/Dashboard'
import Router from './router/Router'
import { ErrorProvider } from './context/ErrorContext'

function App() {

  return (
    <ErrorProvider>
      <Router/>
    </ErrorProvider>
  )
}

export default App
