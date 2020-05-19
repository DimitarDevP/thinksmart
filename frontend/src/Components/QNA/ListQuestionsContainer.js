import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import QuestionCard from './QuestionCard'
import Footer from '../GlobalComponents/Footer'
import './ListQuestions.css'

class ListQuestionsContainer extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            questions: [],
            dataIsLoaded: false
        }
    }

    fetchQuestions = () => {
        axios.get('http://localhost:80/thinksmart/get_requests/get_questions.php')
        .then(res => {
            this.setState({
                questions: res.data,
                dataIsLoaded: true
            })
        })
    }

    componentDidMount(){
        this.fetchQuestions()
    }

    render() {

        const questions = this.state.questions.map(question => {
            return (
                <QuestionCard id={question.question_id} title={question.question_title} date={question.added_on} body={question.question_body} />
            )
        })

        return(
            <span>
                <div className="list-quetions-body">
                    <img src="/test_assets/support.png" alt='smart support logo' id="support-logo"/>
                    <div className="list-questions-container">
                        <h2 className="ask-question"><Link to="/add-question/">{localStorage.getItem('lang') !== 'mkd' ? ('Ask Question') : ('Постави Прашање')}</Link></h2>
                        {questions}
                    </div>
                </div>
                <Footer />
            </span>
        )
    }
}

export default ListQuestionsContainer