import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import GlobalStyle from './styles/GlobalStyle'
import Home from './Home'
import NotFound from './404'
import Login from './Login'

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </>
  )
}
