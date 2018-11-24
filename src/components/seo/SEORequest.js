import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Form, Input, Button, Icon, notification} from 'antd';
import '../../assets/styles/seo/seo.css';
import {seo} from "../../utils/APIUtils";
import {ACCESS_TOKEN} from '../../constants/constants';
// import {login} from '../../utils/APIUtils';

const {TextArea} = Input;

const FormItem = Form.Item;

class SEORequest extends Component {
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
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const seoRequest = Object.assign({}, values);
                seo(seoRequest)
                    .then(
                        response => {
                        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                        notification.success({
                            message: 'MORS browser',
                            description: "You're request was send successfully.",
                        });
                                this.props.history.push("/");

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
        const {getFieldDecorator} = this.props.form;
        return (
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
            </Form>
        );
    }
}


export default SEORequest;