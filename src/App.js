import React, {Component} from 'react'
import {Route, withRouter, Switch, Redirect} from 'react-router-dom';
import {getCurrentUser, logout} from "./utils/APIUtils";
import {ACCESS_TOKEN} from "./constants/constants";
import {notification} from 'antd';

import Search from "./components/search/Search"
import Login from "./components/auth/Login";
import Register from "./components/auth/Register"
import Footer from "./components/common/Footer";
import LoadingIndicator from "./components/common/LoadingIndicator";
import NotFound from "./components/common/NotFound";
import NavBar from "./components/common/NavBar";
import Profile from "./components/auth/Profile";
import SEO from "./components/seo/SEO";

class App extends Component {
    state = {
        currentUser: null,
        isAuthenticated: false,
        isLoading: false
    };

    componentDidMount() {
        this.tryLoadCurrentUser();
    }

    tryLoadCurrentUser = () => {
        this.setState({
            isLoading: true
        });
        getCurrentUser()
            .then(response => {
                if (response.status === 401) {
                    notification.error({
                        message: 'Mors SEO',
                        description: 'Sorry! Your account could not be authorized properly'
                    });
                } else {
                    this.setState({
                        currentUser: response,
                        isAuthenticated: true,
                        isLoading: false,
                    }, () => this.props.history.push("/seo"));
                }
            }).catch(error => {
            if (error.expired !== false) {
                this.setState({
                    currentUser: null,
                    isAuthenticated: false,
                    isLoading: false
                });
                localStorage.removeItem(ACCESS_TOKEN);
                this.props.history.push("/");
                notification.error({
                    message: 'Mors SEO',
                    description: "Your refresh token has expired. Log in again.",
                });
            } else {
                this.setState({
                    isLoading: false
                });
            }
        });
    };

    handleLogin = () => {
        this.tryLoadCurrentUser();
        if (this.state.isAuthenticated) {
            notification.success({
                message: 'MORS browser',
                description: "You're successfully logged in.",
            });
        }
    };

    handleLogout = () => {
        const redirectTo = "/";
        const logoutRequest = {key: ACCESS_TOKEN};
        logout(logoutRequest)
            .then(response => {
                localStorage.removeItem(ACCESS_TOKEN);
                this.setState({
                    currentUser: null,

                });
                this.props.history.push(redirectTo);
                notification.success({
                    message: 'Mors SEO',
                    description: response.detail,
                });
            }).catch(error => {
            notification.error({
                message: 'Mors SEO',
                description: error.message || 'Sorry! Something went wrong. Please try again!'
            });
        });
    };

    render() {
        if (this.state.isLoading) {
            return <LoadingIndicator/>;
        }
        return (
            <React.Fragment>
                <NavBar currentUser={this.state.currentUser}
                        onLogout={this.handleLogout}/>
                <div className="app-content">
                    <Switch>
                        <Route exact path="/" component={Search}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/login" render={(props) => <Login onLogin={this.handleLogin} {...props}/>}/>
                        <Route path="/users/:username" render={(props) =>
                            <Profile currentUser={this.state.currentUser} {...props}/>}/>
                        <Route exact path="/seo" render={(props) => this.state.isAuthenticated ? <SEO {...props}/> :
                            <Redirect to={{pathname: '/login'}}/>}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
                <Footer/>
            </React.Fragment>
        )
    }
}

export default withRouter(App);
