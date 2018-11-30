import React, {Component} from 'react';
import {Form, Input, Icon, notification,Button, Collapse, Tabs, List} from 'antd';
import '../../assets/styles/seo/seo.css';
import {seo} from "../../utils/APIUtils";
import {ACCESS_TOKEN} from '../../constants/constants';
import LoadingIndicator from "../common/LoadingIndicator";

// import {login} from '../../utils/APIUtils';

const {TextArea} = Input;
const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;

function callback(key) {
    console.log(key);
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const FormItem = Form.Item;

class SEO extends Component {

    render() {
        const AntWrappedSEOForm = Form.create()(SEOForm);
        return (
            <div className="seo-container">
                <h1 className="page-title">Search Engine Optimization</h1>
                <div>
                    <AntWrappedSEOForm/>
                </div>
            </div>
        );
    }
}

class SEOForm extends Component {
    state = {
        isQuerySent: true,
        isLoading: false,
        score: null,
        queryKeywords: [],
        documentKeywords: [],
        general: null,
        specific: null,
        flipSuggestions: {}
    };
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const seoRequest = Object.assign({}, values);
                this.setState({isLoading: true});
                seo(seoRequest)
                    .then(
                        response => {
                            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                            notification.success({
                                message: 'MORS browser',
                                description: "You're request was send successfully.",
                            });
                            this.setState({
                                score: response.score,
                                queryKeywords: response.queryKeywords,
                                documentKeywords: response.documentKeywords,
                                general: response.general,
                                specific: response.specific,
                                flipSuggestions: response.flipSuggestions,
                                isQuerySent: false,
                                isLoading: false,

                            })
                            // this.props.history.push("/");

                        }).catch(error => {
                    notification.error({
                        message: 'Polling App',
                        description: error.message || 'Sorry! Something went wrong. Please try again!'
                    });

                });
            }
        });
    };


    render() {
        const data = ['Current Score: ' + this.state.score,
        ];
        const {getFieldDecorator} = this.props.form;
        if (this.state.isLoading) {
            return <LoadingIndicator/>;
        }
        return (

            this.state.isQuerySent ? (

                    <Form onSubmit={this.handleSubmit}>
                        <FormItem>
                            {getFieldDecorator('textName', {
                                rules: [{required: true, message: 'Please input name of your name!'}],
                            })(
                                <Input
                                    size="large"
                                    name="textName"
                                    placeholder="Text Name"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('query', {
                                rules: [{required: true, message: 'Please input your query!'}],
                            })(
                                <Input
                                    size="large"
                                    name="query"
                                    placeholder="Query"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('textArea', {
                                rules: [{required: true, message: 'Please input text you want to optimize!'}],
                            })(
                                <TextArea
                                    name="textArea"
                                    placeholder="Text to Optimize"
                                    rows="10"/>
                            )}
                        </FormItem>
                        <FormItem>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{float: 'right'}}>
                                Submit
                            </Button>
                        </FormItem>
                    </Form>) :
                <div>
                    <List
                        bordered
                        dataSource={data}
                        renderItem={item => (<List.Item>{item}</List.Item>)}
                    />
                    <Collapse defaultActiveKey={['1']} onChange={callback}>
                        <Panel header="Query keywords" key="1">
                            <p>{this.state.queryKeywords.toString()}</p>
                        </Panel>
                        <Panel header="Document keywords" key="2">
                            <p>{this.state.documentKeywords.toString()}</p>
                        </Panel>
                    </Collapse>
                    <Tabs defaultActiveKey="1" onChange={callback}>
                        <TabPane tab="General" key="1">{this.state.general.toString()}</TabPane>
                        <TabPane tab="Specific" key="2">{this.state.specific.toString()}</TabPane>
                    </Tabs>
                    <Collapse defaultActiveKey={['2']} onChange={callback}>
                        <Panel header="Flip suggestions" key="3">
                            <p>{JSON.stringify(this.state.flipSuggestions)}</p>
                        </Panel>
                    </Collapse>
                </div>

        )
            ;
    }
}


export default SEO;