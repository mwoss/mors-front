import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'antd';

import "../../assets/styles/common/notfound.css";

const NotFound = () => {
    return (
        <div className="page-not-found">
            <h1 className="title">
                404
            </h1>
            <div className="desc">
                This page didn't exist. :(
            </div>
            <Link to="/">
                <Button className="back-btn" type="primary" size="large">Go Back</Button>
            </Link>
        </div>
    );
};

export default NotFound;