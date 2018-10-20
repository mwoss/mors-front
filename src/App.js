import './index.css';
import animal from './animal.svg';
import React, {Component} from 'react'
import {Container} from "reactstrap";
import SearchInput, {createFilter} from 'react-search-input'
import emails from './mails'
import SearchField from 'react-search-field'

const KEYS_TO_FILTERS = ['user.name', 'subject', 'dest.name']

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchTerm: ''
        }
        this.searchUpdated = this.searchUpdated.bind(this)
    }

    render() {
        const filteredEmails = emails.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

        return (
            <div>

                <SearchField
                    placeholder="Search..."
                    onEnter={this.searchUpdated}
                    onSearchClick={this.searchUpdated}
                    searchText="Search item..."
                />
            </div>
        )
    }

    searchUpdated(term) {
        this.setState({searchTerm: term})
    }
}

export default App;
