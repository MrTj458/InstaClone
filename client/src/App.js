import React from 'react'
import { Provider } from 'react-redux'

import store from './state/store'
import Routes from './pages/Routes'
import FetchUser from './components/Users/FetchUser'
import GlobalStyle from './components/styles/GlobalStyle'

export default function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />

      <FetchUser>
        <Routes />
      </FetchUser>
    </Provider>
  )
}
