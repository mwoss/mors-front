import React from 'react';
import {Collapse, Tabs, List, Tag} from 'antd';

const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;

const SEOResult = (props) => {
    const data = 'Current Score: ' + props.score;
    return (
        <div>
            <h3 className='result-title'>Result table</h3>
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
            <Tabs defaultActiveKey="1" className='tabs-general'>

                <TabPane tab="General result" key="1">
                    <span>{props.general.map(gen =>
                        <Tag color="blue" key={gen}>{gen}</Tag>)}</span>
                </TabPane>
                <TabPane tab="Specific result" key="2">
                    <span>{props.specific.map(spec =>
                        <Tag color="green" key={spec}>{spec}</Tag>)}</span>
                </TabPane>
            </Tabs>
        </div>
    )
};

export default SEOResult