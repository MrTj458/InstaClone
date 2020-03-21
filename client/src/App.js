import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import store from './state/store'
import Routes from './pages/Routes'
import FetchUser from './components/Users/FetchUser'
import NavBar from './components/NavBar'
import GlobalStyle from './components/styles/GlobalStyle'

export default function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />

      <FetchUser>
        <Router>
          <NavBar />
          <Routes />
        </Router>
      </FetchUser>
    </Provider>
  )
}
