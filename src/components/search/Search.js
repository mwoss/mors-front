import React, {Component} from 'react'

import SearchNav from "./SearchNav";
import {API_BASE_URL} from "../../constants/constants";

class Search extends Component {
    render() {
        return (
            <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
                <SearchNav/>
            </div>
        )
    }

    searchUpdated = (term) => {
        const fetch_url = API_BASE_URL + "/api/search?query=" + term;
        fetch(fetch_url)
            .then(response => response.json())
            .then(data => console.log(data))
        // .catch(err => console.log('Error', err))
    }
}

export default Search;