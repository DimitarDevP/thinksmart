import React, { Component } from "react"
import {withRouter} from 'react-router-dom'
import PropTypes from "prop-types"
import SpeechRecognition from "react-speech-recognition"
import './speechRecognition.css'


class Dictaphone extends Component {

    constructor({finalTranscript, transcript, resetTranscript, browserSupportsSpeechRecognition}){
        super({finalTranscript, transcript, resetTranscript, browserSupportsSpeechRecognition})
        const propTypes = {
            listening: PropTypes.bool,
            finalTranscript: PropTypes.string,
            transcript: PropTypes.string,
            resetTranscript: PropTypes.func,
            browserSupportsSpeechRecognition: PropTypes.bool
        };
        this.state = {
            error: ''
        }
    }

    sleep = (milliseconds) => {
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds)
        })
    }

    recognize = (command) => {
        const words = command.toLowerCase().split(' ')
        const navWords = ['go', 'to', 'goto', 'home', 'profile', 'smart', 'support', 'smartsupport', 'log', 'out', 'logout']
        const searchWords = ['search', 'browser', 'think', 'smart', 'thinksmart']
        var navProb = 0;
        var searchProb = 0;
        var executed = false
    
        for(let i = 0; i < words.length; i++){
            for(let j = 0; j < navWords.length; j++){
                if(words[i] === navWords[j]){
                    navProb++;
                }
            }
        }
    
        for(let i = 0; i < words.length; i++){
            for(let j = 0; j < searchWords.length; j++){
                if(words[i] === searchWords[j]){
                    searchProb++;
                }
            }
        }
    
        if(navProb > searchProb){
            if(words.includes('log') || words.includes('out') || words.includes('logout')){
                localStorage.clear()
                this.props.history.push('/')
                executed = true
            } else if (words.includes('home')){
                this.props.history.push('/home')
                executed = true
            } else if (words.includes('profile')){
                this.props.history.push('/instructor-land/' + localStorage.getItem('user_id'))
                executed = true
            } else if(words.includes('smart') || words.includes('assist') || words.includes('smartassist')){
                this.props.history.push('/list-questions/')
                executed = true
            }
        } else if(searchProb > navProb) {
            if(words.includes('browser')){
                var search = ''

                for(let i = 0; i < words.length; i++){
                    if(words[i] !== 'browser' && words[i] !== 'search' && words[i] !== 'think' && words[i] !== 'smart' && words[i] !== 'thinksmart')
                        search += (words[i]+' ')
                }

                window.open('https://www.google.com/search?q='+search, '_blank');
                executed = true
            } else if(words.includes('think') || words.includes('smart') || words.includes('thinksmart')){
                var search = ''

                for(let i = 0; i < words.length; i++){
                    if(words[i] !== 'browser' && words[i] !== 'search' && words[i] !== 'think' && words[i] !== 'smart' && words[i] !== 'thinksmart')
                        search += (words[i]+'-')
                    this.props.history.push('/results/'+search)
                    executed = true
                }
            }
        }
        this.sleep(2000)
        this.props.resetTranscript()
    }

    componentDidUpdate(){
        if (!this.props.browserSupportsSpeechRecognition) {
            return null;
        }
    
        if(this.props.finalTranscript){
            this.recognize(this.props.transcript)
        }
    }

    render(){
        var styles = {
            'background' : 'none'
        }
    
        if(this.props.transcript.length > 0){
            styles = {
                'background' : '#FFF'
            }   
        }


        return (
                <div style={styles} className='recog-card'>
                    <span>{this.props.transcript}</span>
                    <img className="speaker" onClick={this.props.resetTranscript} src="/test_assets/recog.png" />
                </div>
        )
    }
}
const options = {
    autoStart: true
}
  
export default withRouter(SpeechRecognition(options)(Dictaphone))