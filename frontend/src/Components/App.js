import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Dictaphone from './SpeechRecognition'
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";
import './App.css'
import Nav from './GlobalComponents/Nav'
import Landing from './LandingComponents/Landing'
import Home from'./HomeComponent/Home'
import Instructor from './InstructorComponent/Instructor';
import UploadCourseContainer from './courseUploadComponent/UploadCourseContainer'
import CourseContentContainer from './CourseContentContainer/CourseContentContainer'
import LandSearch from './LandSearch/LandSearch'
import AddQuestionContainer from './QNA/AddQuestionContainer'
import ListQuestionsContainer from './QNA/ListQuestionsContainer'
import ViewQuestionsContainer from './QNA/ViewQuestionsContainer'


class App extends React.Component {

    constructor(){

        super()

        this.state = {
            isLoggedIn: false,
            username: null
        }

    }

    logOut = () => {
        const newState = {...this.state}
        this.setState({
            ...newState,
            isLoggedIn: false
        })
    }

    logIn = (username) => {
        const newState = {...this.state}

        this.setState({
            ...newState,
            isLoggedIn: true,
            username: username
        })

    }

    componentDidMount(){
        localStorage.setItem('lang', 'en')
        const propTypes = {
            transcript: PropTypes.string,
            resetTranscript: PropTypes.func,
            browserSupportsSpeechRecognition: PropTypes.bool
        };


    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Dictaphone/>
                    <Nav isLoggedIn={this.state.isLoggedIn} />
                    <Route exact path='/' component={Landing} />
                    <Route path="/home" component={Home}/>
                    <Route path="/instructor-land/:instructor_id" component={Instructor} />
                    <Route path="/add-course" component={UploadCourseContainer} />
                    <Route path="/course-land/:course_id" component={CourseContentContainer} />
                    <Route path="/add-question/" component={AddQuestionContainer} />
                    <Route path="/list-questions/" component={ListQuestionsContainer} />
                    <Route path="/view-question/:question_id" component={ViewQuestionsContainer} />
                    <Route path="/results/:query_string" component={LandSearch} />
                </div>
            </BrowserRouter>
        )
    }
}


export default App
