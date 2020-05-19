import React from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import ImageUpload from './ImageUpload';

class RegisterStepTwo extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            errors: null,
            dataLoaded: false,
            image_source: '',
            dataSent: false
        }

        this.validateStepTwo = this.validateStepTwo.bind(this)
    }

    sendData = (api, user) => {
        api.post("/thinksmart/post_requests/register_step_two.php", user)
        .then(response => {
            localStorage.setItem('user_id', localStorage.getItem('registered_user'))
            localStorage.setItem('is_logged_in', 'true')
            this.setState({
                dataSent: true
            })
        })
        .catch(error => 
            console.log(error)
        )
    }

    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    validateStepTwo = (e) => {
        e.preventDefault()
        const input = document.getElementById("hold_id")
        input.value = localStorage.getItem('registered_user')

        const form = document.getElementById('registerFormTwo')

        const user = new FormData(form)
        while(!this.state.dataLoaded){
            this.sleep(2000)
        }
        user.append('image_source', this.state.image_source)

        const api = axios.create({baseURL: 'http://localhost:80'})

        this.sendData(api, user)
    }

    componentDidUpdate(){
        if(this.state.dataLoaded && this.state.dataSent){
            this.props.history.push('/home')
        }
    }

    setLoadedData = (url) => {
        this.setState({
            image_source: url,
            dataLoaded: true
        })
    }
    
    
    render(){
        return (
            <div>
                <h1 className="form-label">{this.props.label}</h1>
                <form onSubmit={this.validateStepTwo} id="registerFormTwo" encType="multipart/form-data">
                    <label htmlFor="short_bio">Tell the users a bit about yourself:</label>
                    <textarea name="short_bio" className="textarea-small"/>

                    <label htmlFor="bio_info">Tell the users who you are:</label>
                    <textarea name="bio_info" className="textarea-large"/>

                    <label htmlFor="bio_exp">Tell the users what you did:</label>
                    <textarea name="bio_exp" className="textarea-large"/>
                    
                    <div className="file-input">
                        <ImageUpload loadData={this.setLoadedData}/>
                    </div>

                    <div className="checkbox-container">
                        <input type="checkbox" name="instructor" value="instructor" className="checkbox"/>
                        <h4>I want to be an instructor</h4>
                    </div>
                    
                    <input type="submit" value="Register" className="submit-login"></input>
                    <input type="text" name="user_id" id="hold_id"/>                    
                    {this.state.errors !== null ? (
                        <h1 className="error">{this.state.errors}</h1>
                    ) : ('')}

                </form>
            </div>
        )
    }
}

export default withRouter(RegisterStepTwo)