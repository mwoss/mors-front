import React, {Component} from 'react'
import {Route, withRouter, Switch} from 'react-router-dom';

import Search from "./components/search/Search"
import SEO from "./components/seo/SEO";


class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Search}/>
                <Route exact path="/seo" component={SEO}/>
            </Switch>
        )
    }
}

export default withRouter(App);
