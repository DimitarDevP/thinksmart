import React from 'react'

import './Landing.css'

import LandingHero from './LandingHero'
import LandingCms from './LandingCms'


class Landing extends React.Component {

    constructor(){
        super()

        this.state = {

        }
    }

    componentDidMount() {
        if(localStorage.getItem('user_id') !== null || localStorage.getItem('is_logged_in') === 'true'){
            this.props.history.push('/home')
        }
    }

    render() {
        return (
            <div className="landing-page">
                <LandingHero />
                <LandingCms logIn={this.props.isLoggedIn}/>
            </div>
        )
    }

}

export default Landing