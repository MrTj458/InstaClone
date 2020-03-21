import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import store from './state/store'
import Routes from './pages/Routes'
import FetchUser from './components/Users/FetchUser'
import NavBar from './components/NavBar'
import GlobalStyle from './components/styles/GlobalStyle'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 30px auto;
`

export default function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />

      <FetchUser>
        <Router>
          <NavBar />
          <Container>
            <Routes />
          </Container>
        </Router>
      </FetchUser>
    </Provider>
  )
}
