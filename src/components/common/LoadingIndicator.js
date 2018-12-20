import React, {Fragment} from 'react';
import {Spin, Icon} from 'antd';

import '../../assets/styles/common/loading.css';

const LoadingIndicator = () => {
    const antIcon = <Icon type="loading" style={{fontSize: 34}} spin/>;
    return (
        <div className='loading-block'>
            <h5 className='loading-text'>Loading data. Please wait :)</h5>
            <Spin indicator={antIcon} className='loading-indicator'/>
        </div>
    );
};

export default LoadingIndicator;