import React from 'react';
import {Collapse, Tabs, List} from 'antd';

const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;

const SEOResult = (props) => {
    const data = 'Current Score: ' + props.score;
    return (
        <div>
            <List bordered dataSource={[data]}
                  renderItem={item => (<List.Item>{item}</List.Item>)}/>
            <Collapse defaultActiveKey={['1']}>
                <Panel header="Query keywords" key="1">
                    <p>{props.queryKeywords.toString()}</p>
                </Panel>
                <Panel header="Document keywords" key="2">
                    <p>{props.documentKeywords.toString()}</p>
                </Panel>
            </Collapse>
            <Tabs defaultActiveKey="1">
                <TabPane tab="General" key="1">
                    <b>{props.general.toString()}</b>
                </TabPane>
                <TabPane tab="Specific" key="2">
                    <b>{props.specific.toString()}</b>
                </TabPane>
            </Tabs>
        </div>
    )
};

export default SEOResult