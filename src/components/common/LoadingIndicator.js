import React from 'react';
import {Spin, Icon} from 'antd';

const LoadingIndicator = () => {
    const antIcon = <Icon type="loading" style={{fontSize: 34}} spin/>;
    return (
        <Spin indicator={antIcon} style={{display: 'block', textAlign: 'center', marginTop: 30}}/>
    );
};

export default LoadingIndicator;