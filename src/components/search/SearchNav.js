import React, {Component} from 'react'
import {Container} from "reactstrap";
import {Input} from 'antd';

import {API_BASE_URL} from "../../constants/constants";
import animal from '../../assets/images/animal.svg';

const Search = Input.Search;

const searchLogo = {
    width: '100px',
    height: '100px',
};

const searchDiv = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '8vh'
};

class SearchNav extends Component {
    render() {
        return (
            <Container>
                <div style={searchDiv}>
                    <img src={animal} style={searchLogo} alt="logo"/>
                    <Search placeholder="Search..." onSearch={(term) => this.searchUpdated(term)}/>
                </div>
            </Container>
        )
    }
}

export default SearchNav;
