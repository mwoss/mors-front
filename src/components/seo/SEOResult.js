import React, {Component} from 'react';
import {Form, Collapse, Tabs} from 'antd';
import '../../assets/styles/seo/seo.css';
import {List, Avatar} from 'antd';

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

class SEOResult extends Component {

    render() {
        const AntWrappedSEOForm = Form.create()(SEOResultForm);
        return (
            <div className="seo-result-container">
                <h1 className="page-title">Search Engine Optimization Result</h1>
                <div>
                    <AntWrappedSEOForm/>
                </div>
            </div>
        );
    }
}

class SEOResultForm extends Component {

    render() {
        const {getFieldDecorator} = this.props.form;
        const data = ['Current Score: ',
            'Query Keywords',];
        return (
            <div>
                <List
                    bordered
                    dataSource={data}
                    renderItem={item => (<List.Item>{item}</List.Item>)}
                />
                <Collapse defaultActiveKey={['1']} onChange={callback}>
                    <Panel header="Document keywords" key="1">
                        <p>{text}</p>
                    </Panel>
                </Collapse>
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="General" key="1">Content of Tab Pane 1</TabPane>
                    <TabPane tab="Specific" key="2">Content of Tab Pane 2</TabPane>
                </Tabs>
                   <Collapse defaultActiveKey={['2']} onChange={callback}>
                    <Panel header="Flip suggestions" key="1">
                        <p>{text}</p>
                    </Panel>
                </Collapse>
            </div>

        );
    }
}


export default SEOResult;