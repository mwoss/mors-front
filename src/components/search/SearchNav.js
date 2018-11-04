import animal from '../../assets/images/animal.svg';
import React, {Component} from 'react'
import {Container} from "reactstrap";
import {Input} from 'antd';

import {API_BASE_URL} from "../../constants/constants";

const Search = Input.Search;

class SearchNav extends Component {
    render() {

        return (
            <Container>
                <div className="center-content">
                    <img src={animal} className="search-logo"
                         alt="logo"/>
                </div>

                <Search
                    placeholder="Search..."
                    onSearch={(term) => this.searchUpdated(term)}
                />
            </Container>
        )
    }


    searchUpdated = (term) => {
        const fetch_url =  API_BASE_URL + "/api/search?query=" + term;
        fetch(fetch_url)
            .then(response => response.json())
            .then(data => console.log(data))
            // .catch(err => console.log('Error', err))
    }
}

export default SearchNav;
