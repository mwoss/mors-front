import React, {Component} from 'react';
import {getAvatarColor} from "../../utils/Avatar";
import LoadingIndicator from "../common/LoadingIndicator";
import NotFound from "../common/NotFound";
import ServerError from "../common/ServerError";
import {Avatar, Tabs} from 'antd';

import "../../assets/styles/auth/profile.css";

const TabPane = Tabs.TabPane;

class Profile extends Component {
    state = {
        user: null,
        isLoading: false
    };


    loadUserProfile = (username) => {
        // this.setState({
        //     isLoading: true
        // });
        // TODO: add functionality to retrieve all user data (or only statistics)
        // getUserProfile(username)
        //     .then(response => {
        //         this.setState({
        //             user: response,
        //             isLoading: false
        //         });
        //     }).catch(error => {
        //     if (error.status === 404) {
        //         this.setState({
        //             notFound: true,
        //             isLoading: false
        //         });
        //     } else {
        //         this.setState({
        //             serverError: true,
        //             isLoading: false
        //         });
        //     }
        // });

        //PLACEHOLDER

        this.setState({
            user: username
        })
    };

    componentDidMount() {
        const username = this.props.currentUser;
        this.loadUserProfile(username);
    }

    componentDidUpdate(nextProps) {
        if (this.props.match.params.username !== nextProps.match.params.username) {
            this.loadUserProfile(nextProps.match.params.username);
        }
    }

    render() {
        if (this.state.isLoading) {
            return <LoadingIndicator/>;
        }

        if (this.state.notFound) {
            return <NotFound/>;
        }

        if (this.state.serverError) {
            return <ServerError/>;
        }

        return (
            <div className="profile">
                {
                    this.state.user ? (
                        <div className="user-profile">
                            <div className="user-details">
                                <div className="user-avatar">
                                    <Avatar className="user-avatar-circle"
                                            style={{backgroundColor: getAvatarColor(this.state.user.username)}}>
                                        {this.state.user.username[0].toUpperCase()}
                                    </Avatar>
                                </div>
                                <div className="user-summary">
                                    <div className="full-name">FISRT NAME | LAST NAME</div>
                                    <div className="username">{this.state.user.email}</div>
                                </div>
                            </div>
                            {/*USER STATISTICS HERE*/}
                            <div className="user-data-details">
                                <Tabs defaultActiveKey="1"
                                      animated={false}
                                      tabBarStyle={{
                                          textAlign: 'center'
                                      }}
                                      size="large"
                                      className="profile-tabs">
                                    <TabPane tab={`HARDCODED charts`} key="1">
                                    </TabPane>
                                    <TabPane tab={`HARDCODED text result`} key="2">
                                    </TabPane>
                                    <TabPane tab={`HARDCODED next result`} key="3">
                                    </TabPane>
                                </Tabs>
                            </div>
                        </div>
                    ) : null
                }
            </div>
        );
    }
}

export default Profile;