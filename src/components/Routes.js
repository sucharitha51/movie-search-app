import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CastMoviesPage from './pages/CastMoviesPage'
import Header from './Nav/Nav'


// The Routing Component providing all the routing Configuration
const Routes = (props) => {
    return (
        <>
       <Header />
        <BrowserRouter>
            <Switch>
               <Route exact path="/" component={HomePage} />
               <Route exact path="/cast-movies/:cast_id/:movie_id" render={(props) => <CastMoviesPage {...props} />} />
            </Switch>
        </BrowserRouter>
        </>
    )
}
export { Routes }