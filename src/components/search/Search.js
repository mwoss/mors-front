import React, {Component} from 'react'
import {Container} from "reactstrap";
import {getSearchResult} from "../../utils/APIUtils"

import SearchNav from "./SearchNav";
import Sites from "./Site";

import '../../assets/styles/search/search.css';
import LoadingIndicator from "../common/LoadingIndicator";

class Search extends Component {
    state = {
        urls: [],
        query: '',
        isLoading: false
    };

    render() {
        return (
            <Container>
                <SearchNav onSearch={this.search}/>
                {this.state.query && <h4 className="header">Search results for query: {this.state.query}</h4>}
                {this.state.isLoading && <LoadingIndicator/>}
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
            this.setState({isLoading: true});
            getSearchResult(term)
                .then(data => {
                    console.log(data)
                    this.setState({
                        query: data.query,
                        urls: data.result,
                        isLoading: false
                    })
        })
                .catch(err => console.log('Error', err))
        }
    }
}

export default Search;