import React from 'react'
import './Search.css'

class Search extends React.Component {
    
    state = {
        
    }

    render(){
        return(
            <div className="search">
                <h2>{localStorage.getItem('lang') !== 'mkd' ? ('Search:') : ('Барај:')}</h2>
                <input type="text" name="search_string" id="search" />
                <button type="submit" name="search_go" id="search-go" onClick={this.props.search}><img src="/test_assets/searchicon.png" alt="search" /></button>
            </div>
        )
    }

}

export default Search