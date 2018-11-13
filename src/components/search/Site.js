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
                <a href={props.site}>
                    <h5>TITLE FROM PROPS - MONGO</h5>
                </a>
                <p className="site-link">{cutURL(props.site)}</p>
            </div>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis molestie magna.
                Maecenas varius quis ex eu cursus. Vivamus pretium a nulla vitae fringilla. Praesent sit amet libero
                ante.
            </p>
        </div>
    )
};

Site.propTypes = {
    site: PropTypes.string,
};

export default Site;