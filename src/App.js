import React, {Component} from 'react'
import {Route, withRouter, Switch} from 'react-router-dom';
import {getCurrentUser} from "./utils/APIUtils";
import {ACCESS_TOKEN} from "./constants/constants";
import {notification} from 'antd';


import Search from "./components/search/Search"
import SEO from "./components/seo/SEO";
import Login from "./components/auth/Login";
import Footer from "./components/common/Footer";
import LoadingIndicator from "./components/common/LoadingIndicator";
import NotFound from "./components/common/NotFound";
import NavBar from "./components/common/NavBar";


class App extends Component {
    state = {
        currentUser: null,
        isAuthenticated: false,
        isLoading: false
    };

    componentDidMount() {
        this.loadCurrentUser();
    }

    loadCurrentUser = () => {
        this.setState({
            isLoading: true
        });
        getCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response,
                    isAuthenticated: true,
                    isLoading: false
                });
            }).catch(error => {
            this.setState({
                isLoading: false
            });
        });
    };

    handleLogin() {
        notification.success({
            message: 'MORS browser',
            description: "You're successfully logged in.",
        });
        this.loadCurrentUser();
        this.props.history.push("/seo");
    }

    handleLogout(redirectTo = "/seo", notificationType = "success", description = "You're successfully logged out.") {
        localStorage.removeItem(ACCESS_TOKEN);

        this.setState({
            currentUser: null,
            isAuthenticated: false
        });

        this.props.history.push(redirectTo);

        notification[notificationType]({
            message: 'Polling App',
            description: description,
        });
    }

    render() {
        if (this.state.isLoading) {
            return <LoadingIndicator/>
        }
        return (
            <React.Fragment>
                <NavBar isAuthenticated={this.state.isAuthenticated}
                        currentUser={this.state.currentUser}
                        onLogaout={this.handleLogout}/>
                <div className="app-content">
                    <Switch>
                        <Route exact path="/" component={Search}/>
                        <Route path="/login" render={(props) => <Login onLogin={this.handleLogin} {...props}/>}/>
                        <Route exact path="/seo" component={SEO}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
                <Footer/>
            </React.Fragment>
        )
    }
}

export default withRouter(App);
