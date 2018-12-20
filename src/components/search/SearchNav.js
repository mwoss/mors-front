import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Input} from 'antd';

import animal from '../../assets/images/animal.svg';
import '../../assets/styles/search/searchnav.css'

const Search = Input.Search;


class SearchNav extends Component {
    render() {
        return (
            <div className="search-div">
                <img src={animal} className="search-logo" alt="logo"/>
                <Search placeholder="Search..." onSearch={(term) => this.props.onSearch(term)}/>
            </div>
        )
    }
}

SearchNav.propTypes = {
    onSearch: PropTypes.func,
};

export default SearchNav;
