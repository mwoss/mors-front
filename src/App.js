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
            <Container>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '50px',
                }}>
                <img src={animal} style={{width: 80, height: 80}} className="search-logo"
                         alt="logo"/>
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '10px',
                }}>
                    <SearchField
                        placeholder="Search..."
                        onEnter={this.searchUpdated}
                        onSearchClick={this.searchUpdated}
                        searchText="Search item..."
                    />
                </div>
            </Container>
        )
    }

    searchUpdated(term) {
        this.setState({searchTerm: term})
    }
}

export default App;
