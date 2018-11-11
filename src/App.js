import React, {Component} from 'react'
import {Route, withRouter, Switch} from 'react-router-dom';

import Search from "./components/search/Search"
import SEO from "./components/seo/SEO";
import Footer from "./components/common/Footer";


class App extends Component {
    render() {
        return (
            <div id="app">
                <Switch>
                    <Route exact path="/" component={Search}/>
                    <Route exact path="/seo" component={SEO}/>
                </Switch>
                <Footer/>
            </div>
        )
    }
}

export default withRouter(App);
