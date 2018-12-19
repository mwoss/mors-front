import React from 'react';
import {Form, Input, Button} from 'antd';

const {TextArea} = Input;
const FormItem = Form.Item;

const SEORequestForm = (props) => {
    const {getFieldDecorator} = props.form;
    return (
        <Form onSubmit={props.onSubmit}>
            <FormItem>
                {getFieldDecorator('textName', {
                    rules: [{required: true, message: 'Please input name of your text!'}],
                })(<Input size="large" name="textName" placeholder="Text Name"/>)}
            </FormItem>
            <FormItem>
                {getFieldDecorator('query', {
                    rules: [{required: true, message: 'Please input your query!'}],
                })(<Input size="large" name="query" placeholder="Query"/>)}
            </FormItem>
            <FormItem>
                {getFieldDecorator('textArea', {
                    rules: [{required: true, message: 'Please input text you want to optimize!'}],
                })(<TextArea name="textArea" placeholder="Text to Optimize" rows="10"/>)}
            </FormItem>
            <FormItem>
                <Button type="primary" htmlType="submit" size="large" className='seo-submit-button'>
                    Submit
                </Button>
            </FormItem>
        </Form>
    )
};

export default SEORequestForm;