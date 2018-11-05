import React from 'react'

import { BrowserRouter, HashRouter, Switch, Route } from 'react-router-dom'

import Home from './pages/home'
import Forms from './pages/forms'
import Send from './pages/send'


const Routes = () => (
    <BrowserRouter>
        <Switch>
            {/* <HashRouter> */}
            <div>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/forms" component={Forms}></Route>
                <Route exact path="/send" component={Send}></Route>
            </div>
            {/* </HashRouter> */}
        </Switch>
    </BrowserRouter>
)

export default Routes
