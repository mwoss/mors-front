import React from 'react';
import PropTypes from 'prop-types'

import '../../assets/styles/search/site.css'


const cutURL = (url) => {
    return /.+\/\/.+?\//.exec(url)
};

const Site = (props) => {
    return (
        <div>
            <div>
                <a href={props.site.url}>
                    <h5>{props.site.tittle}</h5>
                </a>
                <p className="site-link">{cutURL(props.site.url)}</p>
            </div>
            <p>{props.site.description}...</p>
        </div>
    )
};

Site.propTypes = {
    url: PropTypes.string,
    tittle: PropTypes.string,
    description: PropTypes.string,
};

export default Site;