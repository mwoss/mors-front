import React, {Component} from 'react';
import {getAvatarColor} from "../../utils/Avatar";
import LoadingIndicator from "../common/LoadingIndicator";
import {Avatar, Tabs, Table, Tag} from 'antd';


import "../../assets/styles/auth/profile.css";
import {seoHistory} from "../../utils/APIUtils";

const TabPane = Tabs.TabPane;
const {Column} = Table;

class Profile extends Component {
    state = {
        history: null,
        isLoading: false
    };

    componentDidMount() {
        this.loadUserHistory();
    }

    loadUserHistory = () => {
        this.setState({isLoading: false}, () => {
            seoHistory().then(response => {
                this.setState({
                    history: response.map((optimization, index) => ({
                        key: index,
                        ...optimization
                    })),
                    isLoading: false
                })
            })
        })
    };

    render() {
        if (this.state.isLoading) {
            return <LoadingIndicator/>;
        }

        return (
            <div className="profile">
                {this.props.currentUser ? (
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
                                <TabPane tab={`Search engine optimization results`} key="1">
                                    <Table dataSource={this.state.history}
                                           scroll={{ x: 1300 }}
                                           expandedRowRender={record =>
                                               <p style={{margin: 0}}>{record.text}</p>}>
                                        <Column title="Query" dataIndex="query" key="query"/>
                                        <Column title="Score" dataIndex="score" key="score" size="100"/>
                                        <Column title="Query keywords" dataIndex="query_keywords" key="query_k"
                                                render={query => (<b>{query.join(', ')}</b>)}/>
                                        <Column title="Document keywords" dataIndex="document_keywords"
                                                key="document_k"
                                                render={document => (<b>{document.join(', ')}</b>)}/>
                                        <Column title="Specific result" dataIndex="specific" key="specific"
                                                render={specs => (<span>{specs.map(spec =>
                                                    <Tag color="green" key={spec}>{spec}</Tag>)}</span>)}/>
                                        <Column title="General result" dataIndex="general" key="general"
                                                render={gens => (<span>{gens.map(gen =>
                                                    <Tag color="blue" key={gen}>{gen}</Tag>)}</span>)}/>
                                    </Table>
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