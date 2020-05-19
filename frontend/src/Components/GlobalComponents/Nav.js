import React from 'react'
import './Nav.css'

import { NavLink } from 'react-router-dom'


class Nav extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            isShowing: true,
            is_logged_in: false,
            user_id: null,
            
        }

        this.toggle = this.toggle.bind(this)
    }

    toggle  =  () => { 
        
        const newState = {isShowing: !this.state.isShowing}
        this.setState(newState)

        let nav = document.getElementsByTagName('nav')[0]
        let toggle = document.getElementsByClassName('toggle')[0]
        let bars = document.getElementsByClassName('bar')

        if(this.state.isShowing){
            nav.classList.add('showing')
            toggle.classList.add('showing')
            for(let i = 0; i < 3; i++){
                bars[i].classList.add('showing')
            }
        } else {
            nav.classList.remove('showing')
            toggle.classList.remove('showing')
            for(let i = 0; i < 3; i++){
                bars[i].classList.remove('showing')
            }
        }

        if(localStorage.getItem('is_logged_in') === 'true'){
            const id = localStorage.getItem('user_id')
            this.setState({
                is_logged_in: true,
                user_id: id
            })
        }
    } 

    logOut = () => {
        localStorage.clear()
        this.setState({
            is_logged_in: false,
            user_id: null
        })
    }    

    render(){
        return(
            <nav>
                <h1>ThinkSmart</h1>
                <ul>
                    <NavLink to="/home"><li>{localStorage.getItem('lang') !== 'mkd' ? ('Home') : ('Дома')}</li></NavLink>
                    <NavLink to={"/instructor-land/" + localStorage.getItem('user_id')}><li>{localStorage.getItem('lang') !== 'mkd' ? ('Profile') : ('Профил')}</li></NavLink>
                    <NavLink to='/add-course'><li>{localStorage.getItem('lang') !== 'mkd' ? ('Upload Course') : ('Подигни Курс')}</li></NavLink>
                    <NavLink to='/list-questions/'><li>Smart Support</li></NavLink>
                    <NavLink to="/" onClick={() => {
                        this.logOut()
                    }}><li>{this.state.is_logged_in ? (localStorage.getItem('lang') !== 'mkd' ? ('Log Out') : ('Одлогирај Се')) : (localStorage.getItem('lang') !== 'mkd' ? ('Log In') : ('Логирај Се'))}</li></NavLink>
                </ul>

                <div className="toggle" onClick={this.toggle}>
                    <div className="bar bar1"></div>
                    <div className="bar bar2"></div>
                    <div className="bar bar3"></div>
                </div>
            </nav>
        )
    }

}
export default Nav