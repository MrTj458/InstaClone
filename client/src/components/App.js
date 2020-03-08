import React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './Home'
import NotFound from './404'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  )
}
