import React, {Component} from 'react';
import './CSS/sites.css';
class Sites extends Component {
    render() {
        const rows = [];
        this.props.data.forEach((site) => {
            rows.push(<div className="site"><a href={site.url}> {site.name}</a></div>)
        });
        return <div> {rows}</div>
    }

}

export default Sites;