import './index.css';
import animal from './animal.svg';
import React, {Component} from 'react'
import {Container} from "reactstrap";
import SearchField from 'react-search-field'
import Sites from "./Sites";
import './CSS/sites.css';


class SearchNav extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchTerm: '',
            data: [

                {
                    url: 'url1',
                    name: 'name1'
                },
                {
                    url: 'url2',
                    name: 'name2'
                },
                {
                    url: 'url3',
                    name: 'name3'
                }
            ]
        }
        this.searchUpdated = this.searchUpdated.bind(this)
    }

    render() {

        return (
            <Container>
                <div className="center-content">
                    <img src={animal} className="search-logo"
                         alt="logo"/>
                </div>
                <div className="center-content" style={{
                    marginTop: '10px',
                }}>
                    <SearchField
                        placeholder="Search..."
                        onEnter={this.searchUpdated}
                        onSearchClick={this.searchUpdated}
                    />
                </div>
                <div>
                    <Sites data={this.state.data}/>
                </div>
            </Container>
        )
    }


    searchUpdated(term) {
        this.setState({searchTerm: term})
        fetch('./endpoint', {
            method: "POST",
            body: JSON.stringify(term),
            credentials: "omit"
        }).then(function (response) {
            console.log(response.json)
            this.setState({data: response.json()})
        }, function (error) {
            console.log(error);
        })
    }
}

export default SearchNav;
