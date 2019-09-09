import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { AppFrame } from './components'


import routes from './routes'
class App extends Component {
  render() {
    return (
      <AppFrame>
        <Switch>
          {
            routes.map(route => {
              const path = this.props.match.path+route.path
              return (
                <Route
                  key={route.path}
                  path={path}
                  component={route.component}
                />
              )
            })
          }
          <Redirect to={`${this.props.match.path}${routes[0].path}`} from="/admin" exact />
          <Redirect to='/404' />
        </Switch>
      </AppFrame>
    )
  }
}

export default App;
