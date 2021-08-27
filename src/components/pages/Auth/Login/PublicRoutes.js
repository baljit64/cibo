import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from './Login'
import SignUp from './SignUp'
import Otp from './Otp'
import Forget from './Forget'
function PublicRoutes() {
  return (
    <Switch>

      <Route exact path='/signup' component={SignUp} />
      <Route exact path='/forget' component={Forget} />
      <Route exact path='/otp' component={Otp} />
      <Route exact path='/' component={Login} />
      <Redirect to='/' />
    </Switch>
  )
}

export default PublicRoutes

