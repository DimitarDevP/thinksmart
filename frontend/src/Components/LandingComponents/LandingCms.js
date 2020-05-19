import React from 'react'

import './LandingCms.css'

import RegisterComponent from './RegisterComponent'
import LoginComponent from './LoginComponent'

class LandingCms extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            loginShowing: true,
            registerShowing: false,
            instructorRegisterShowing: false
        }

        this.loginRegisterToggle = this.loginRegisterToggle.bind(this)
        this.instructorRegisterToggle = this.instructorRegisterToggle.bind(this)
    }

    loginRegisterToggle = () => {
        
        this.setState((prevState) => ({
            ...this.state,
            loginShowing: !prevState.loginShowing,
            registerShowing: !prevState.registerShowing
        }))
    }

    instructorRegisterToggle = () => {
        this.setState((prevState) => ({
            ...this.state,
            loginShowing: false,
            registerShowing: false,
            instructorRegisterShowing: !prevState.instructorRegisterShowing
        }))

        if(!this.state.instructorRegisterShowing) {
            document.getElementById('login-or-register').style.display = 'none'
        } else {
            document.getElementById('login-or-register').style.display = 'block'
            this.setState({
                ...this.state,
                loginShowing: true,
                registerShowing: false,
                instructorRegisterShowing: false
            })
        }

    }


    render() {
        return (
            <div className="Landing-cms">
                <LoginComponent isShowing={this.state.loginShowing} />
                <RegisterComponent isShowing={this.state.registerShowing} />
                <h4 id="login-or-register" className="landing-cms-select" onClick={this.loginRegisterToggle}>{
                    this.state.loginShowing && !this.state.instructorRegisterShowing ? 
                    (localStorage.getItem('lang') !== 'mkd' ? ('Dont have an account - Register') : ('Немаш акаунт - Регистрирај Се')) : 
                    (localStorage.getItem('lang') !== 'mkd' ? ('Already have an account - login') : ('Веќе имаш акаунт - Логирај се'))
                }</h4>
            </div>
        )
    }

}

export default LandingCms