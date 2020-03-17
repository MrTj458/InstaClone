import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import NotFound from './pages/404'
import AuthPage from './pages/AuthPage'

export default function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/login">
            <AuthPage />
          </Route>
          <Route exact path="/register">
            <AuthPage register={true} />
          </Route>

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </>
  )
}
