import React from 'react'
import axios from 'axios'

class RegisterStepOne extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            username: null,
            password: null,
            email: null,
            displayName: null,
            errors: null
        }

        this.validateStepOne = this.validateStepOne.bind(this)
        this.sendData = this.sendData.bind(this)
    }
    
    validateStepOne = (e) =>{
        e.preventDefault()

        if(e.target.username.value.length < 5) {
            this.setState({
                errors: "Username must be at least 5 characters long"
            })
            return
        }

        if(e.target.password.value !== e.target.password2.value) {
            this.setState({
                errors: "Passwords do not match"
            })
            return
        }

        if(e.target.password.value.length < 6) {
            this.setState({
                errors: "Password must be at least 6 characters long"
            })
            return
        }

        if(e.target.display_name.value.length < 6) {
            this.setState({
                errors: "Please select a more descriptive Display Name"
            })
            return
        }

        this.setState({
            username: e.target.username.value,
            password: e.target.password.value,
            email: e.target.email.value,
            displayName: e.target.display_name,
            errors: null
        })

        this.sendData()

    }

    sendData() {
        const form = document.getElementById('registerForm')

        const user = new FormData(form)
        const api = axios.create({baseURL: 'http://localhost:80'})
        api.post("/thinksmart/post_requests/register_step_one.php", user)
        .then(response => {
            const user = response.data[0]
            const error = response.data

            if(typeof(error.error) === 'string'){
                this.setState({
                    errors: error.error
                })
            }
            else {
                localStorage.clear()
                localStorage.setItem("registered_user", user.user_id)
                this.props.changeState()
            }
        })
        .catch(error => 
            console.log(error)
        )
    }


    render(){
        return (
            <div>
                <h1 className="form-label">{this.props.label}</h1>
                <form onSubmit={this.validateStepOne} id="registerForm">
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" ></input>
                    <label htmlFor="display_name">Display Name:</label>
                    <input type="text" name="display_name" ></input>
                    <label htmlFor="email">E-Mail:</label>
                    <input type="email" name="email" required></input>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" ></input>
                    <label htmlFor="password2">Confirm Password:</label>
                    <input type="password" name="password2" ></input>
                    <input type="submit" value="Next" className="submit-login"></input>

                    {this.state.errors !== null ? (
                        <h1 className="error">{this.state.errors}</h1>
                    ) : ('')}

                </form>
            </div>
        )
    }
}

export default RegisterStepOne