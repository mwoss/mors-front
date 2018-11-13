import React, {Component} from 'react'
import {Container} from "reactstrap";
import {getSearchResult} from "../../utils/APIUtils"

import SearchNav from "./SearchNav";
import Sites from "./Site";

import '../../assets/styles/search/search.css';

class Search extends Component {
    state = {
        urls: [],
        query: ''
    };

    render() {
        return (
            <Container>
                <SearchNav onSearch={this.search}/>
                {this.state.query &&
                <h4 className="header">Search results for query: {this.state.query}</h4>}
                <div className="links">
                    {this.state.urls.map((url, index) => (
                        <Sites key={index} site={url}/>
                    ))}
                </div>
            </Container>
        )
    }

    search = (term) => {
        if (term) {
            getSearchResult(term)
                .then(data => this.setState({
                        query: data.query,
                        urls: data.result.map(e => e[0])
                    })
                )
                .catch(err => console.log('Error', err))
        }
    }
}

export default Search;