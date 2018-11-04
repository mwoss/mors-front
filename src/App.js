import React, {Component} from 'react'
import {Route, withRouter, Switch} from 'react-router-dom';

import './assets/styles/sites.css';
import SearchNav from "./components/search/SearchNav";
import SEO from "./components/seo/SEO";


class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={SearchNav}/>
                <Route exact path="/seo" component={SEO}/>
            </Switch>
        )
    }
}

export default withRouter(App);
