import React from 'react'

const footerStyle = {
    fontSize: '0.7rem',
    color: '#898989',
    position: 'absolute',
    bottom: '0',
    left: '50%',
    transform: 'translate(-50%, 0)'
};

const Footer = () => {
    return (
        <div style={footerStyle} className="inner">
            <p>MORS &#169; - D. Goj, A. Marciniec, R.Wcisło, M. Wos</p>
        </div>
    )
};

export default Footer;