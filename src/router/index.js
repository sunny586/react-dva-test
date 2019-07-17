import React from 'react'
import { Router, Route, Switch } from 'dva/router'
import { asyncComponent } from './async-component'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={asyncComponent(() => import('@/views'))} />
      </Switch>
    </Router>
  )
}

export default RouterConfig
