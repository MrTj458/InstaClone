import React from 'react'

import { Switch, Route } from 'react-router-dom'

import Home from './Home'
import AuthPage from './AuthPage'
import NotFound from './404'
import ProfilePage from './ProfilePage'
import CreatePostPage from './CreatePostPage'
import SettingsPage from './SettingsPage'

export default function Routes() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/new">
          <CreatePostPage />
        </Route>

        <Route exact path="/settings">
          <SettingsPage />
        </Route>

        {/* Auth Routes */}
        <Route exact path="/login">
          <AuthPage />
        </Route>
        <Route exact path="/register">
          <AuthPage register={true} />
        </Route>

        {/* Profile Routes */}
        <Route exact path="/:username">
          <ProfilePage />
        </Route>

        {/* 404 route */}
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </>
  )
}
