import React, {Component} from 'react';
import {getAvatarColor} from "../../utils/Avatar";
import LoadingIndicator from "../common/LoadingIndicator";
import {Avatar, Tabs} from 'antd';


import "../../assets/styles/auth/profile.css";

const TabPane = Tabs.TabPane;

class Profile extends Component {
    state = {
        history: null,
        isLoading: false
    };


    loadUserHistory = () => {
        //PLACEHOLDER
    };

    render() {
        if (this.state.isLoading) {
            return <LoadingIndicator/>;
        }

        return (
            <div className="profile">
                {
                    this.props.currentUser ? (
                        <div className="user-profile">
                            <div className="user-details">
                                <div className="user-avatar">
                                    <Avatar className="user-avatar-circle"
                                            style={{backgroundColor: getAvatarColor(this.props.currentUser.username)}}>
                                        {this.props.currentUser.username[0].toUpperCase()}
                                    </Avatar>
                                </div>
                                <div className="user-summary">
                                    <div className="full-name">
                                        {this.props.currentUser.first_name} {this.props.currentUser.last_name}
                                    </div>
                                    <div className="username">{this.props.currentUser.email}</div>
                                    <div className="user-joined">
                                        Joined date: {/.+?(?=T)/.exec(this.props.currentUser.date_joined)}
                                    </div>
                                </div>
                            </div>
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