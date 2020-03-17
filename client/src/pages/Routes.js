import React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './Home'
import AuthPage from './AuthPage'
import NotFound from './404'

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        {/* Auth Routes */}
        <Route exact path="/login">
          <AuthPage />
        </Route>
        <Route exact path="/register">
          <AuthPage register={true} />
        </Route>

        {/* 404 route */}
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  )
}
