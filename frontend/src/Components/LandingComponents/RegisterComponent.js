import React from 'react'

import RegisterStepOne from './RegisterStepOne'
import RegisterStepTwo from './RegisterStepTwo'

export default class RegisterComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            stepOneShowing: true,
            stepTwoShowing: false,
        }
    }

    

    handleStepOneSubmit = () => {
        this.setState({
            stepOneShowing: false,
            stepTwoShowing: true,
        })
    }

    render() {
        return(
            this.props.isShowing ? (
                <div className="register-container">
                    <div className="user-form">
                        <div>
                            {this.state.stepOneShowing ? (<RegisterStepOne changeState={this.handleStepOneSubmit} label={localStorage.getItem('lang') !== 'mkd' ? ('Register') : ('Регистрирај Се')}/>) : (null) }
                            {this.state.stepTwoShowing ? (<RegisterStepTwo label={localStorage.getItem('lang') !== 'mkd' ? ('Register Step Two') : ('Втор Чекор')}/>) : (null) }
                        </div>
                    </div>
                </div>
            ) : ('')
        )
    }

}