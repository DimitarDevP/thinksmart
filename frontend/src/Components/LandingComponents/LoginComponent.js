import React from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios';

class LoginComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: null,
            errors: null
        }
    }

    handleLogin = e => {
        e.preventDefault()
        
        const form = document.getElementById('loginForm')

        const user = new FormData(form) 
        const api = axios.create({baseURL: 'http://localhost:80'})
        api.post("/thinksmart/post_requests/login.php", user)
        .then(response => {
            const user = response.data[0]

            this.setState({
                user
            })

            if(typeof(this.state.user) == 'undefined'){
                this.setState({
                    errors: "Wrong Credidentials"
                })
            } else {
                this.setState({
                    errors: null
                })
                localStorage.setItem('user_id', this.state.user.user_id)
                localStorage.setItem('is_logged_in', 'true')
                this.props.history.push('/home')
            }

        })
        .catch(error => 
            console.log(error)
        )
    }

    render() {
        return(
            this.props.isShowing ? (
            <div className="login">
                <div className="user-form">
                        <div>
                            <h1 className="form-label">{localStorage.getItem('lang') !== 'mkd' ? ('Login') : ('Логирај Се')}</h1>
                            <form onSubmit={this.handleLogin} id="loginForm">
                                <label htmlFor="username">{localStorage.getItem('lang') !== 'mkd' ? ('Username:') : ('Корисничко Име:')}</label>
                                <input type="text" name="username" />
                                <label htmlFor="password">{localStorage.getItem('lang') !== 'mkd' ? ('Password:') : ('Лозинка:')}</label>
                                <input type="password" name="password" />
                                <input type="submit" value={localStorage.getItem('lang') !== 'mkd' ? ('Login') : ('Логирај Се')} className="submit-login" onClick={this.handleLogin} />
                                {this.state.errors !== null ? (
                                    <h1 className="error">{this.state.errors}</h1>
                                ) : ('')}
                            </form>
                        </div>
                </div>
            </div>
            ) : ('')
        )
    }

}
export default withRouter(LoginComponent)