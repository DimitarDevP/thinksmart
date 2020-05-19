import React from 'react'
import axios from 'axios'

import AddAnswer from './AddAnswer'
import Answer from './Answer'
import './ViewQuestion.css'

class ViewQuestionsContainer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            question_id: this.props.match.params.question_id,
            body: null,
            title: null,
            isLoaded: false,
            upvotes: 0,
            downvotes: 0,
            addedOn: 0,
            solved: false,
            answers: []
        }
    }

    fetchAnswers = () => {
        axios.get('http://localhost/thinksmart/get_requests/get_all_answers.php?post_id=' + this.state.question_id)
        .then(res => {
            const response = res.data

            this.setState({
                answers: response
            })
        })
    }

    fetchQuestion = () => {
        axios.get('http://localhost/thinksmart/get_requests/get_questions.php?question_id='+this.state.question_id)
        .then(res => {
            const response = res.data[0]
            this.setState({
                title: response.question_title,
                body: response.question_body,
                upvotes: response.upvotes,
                downvotes: response.downvotes,
                addedOn: response.added_on,
                solved: response.solved,
            })

            this.generateQuestion()

            this.setState({
                isLoaded: true
            })
        })
    }

    generateQuestion = () => {

        var updatedBody = this.state.body
        updatedBody = updatedBody.replace(/\?\?\?/g, " ‏‏‎ ")
        const saveStrings = []
        const stringTypes = []
        const strings = updatedBody.split("'''")
        var stc = 0
        for(let i = 0; i < updatedBody.length; i++){
            if(updatedBody[i] === "'" && updatedBody[i+1] === "'" && updatedBody[i+2] === "'"){
                for(let j = i+4; j < updatedBody.length; j++){
                    if(updatedBody[j+1] === "'" && updatedBody[j+2] === "'" && updatedBody[j+3] === "'"){
                        stringTypes[stc] = 'code'
                        stc++
                        i = j+4
                        break
                    }
                }
            }else {
                if((updatedBody[i+1] === "'" && updatedBody[i+2] === "'" && updatedBody[i+3] === "'")){
                    stringTypes[stc] = 'text'
                    stc++
                }
            }
        }

        if(stringTypes.length < strings.length){
            stringTypes[stringTypes.length] = 'text'
        }

        for(let i = 0; i < strings.length; i++){
            const className = stringTypes[i]
            const text = strings[i].split('\n')
            let element = (
                text.map(txt => {
                    return (
                        <p className={className}>{txt}</p>
                    )
                })
            )

            saveStrings.push(element)

        }

        this.setState({
            strings: saveStrings
        })
    }

    componentDidMount(){
        this.fetchQuestion()
        this.fetchAnswers()
    }

    updateComponent = () => {
        this.forceUpdate()
        this.fetchAnswers()
    }


    render(){

        const answers = this.state.answers.map(a => {
            return (<Answer 
                id={a.answer_id} 
                creator={a.poster_id} 
                body={a.answer} 
                date={a.answered_on}
                upvotes={a.upvotes}
                downvotes={a.downvotes}
                solution={a.solution}
            />)
        })

        return(
            <div class='view-contain'>
            {this.state.isLoaded === true ? (
            <div className="view-question-container">              
                <div className="view-question">
                    <h3>{this.state.title}</h3>

                    {this.state.strings}
                </div>
                <div className="question-data">
                    <ul>
                        {/* <li className="vote upvote">🡅 {this.state.upvotes}</li>
                        <li className="vote downvote">🡇 {this.state.downvotes}</li>
                        <li>{this.state.solved === true ? ('Solved') : ('Not Solved')}</li> */}
                        <li>{localStorage.getItem('lang') !== 'mkd' ? ('Asked On:') : ('Прашано На:')} {this.state.addedOn}</li>
                    </ul>
                </div>

            </div>) : ('') }
            <AddAnswer question_id={this.state.question_id} update={this.updateComponent}/>
            <h2 className="answers-heading">{localStorage.getItem('lang') !== 'mkd' ? ('Answers:') : ('Одговори:')} </h2>
            {answers}
            </div>
        )
    }

}

export default ViewQuestionsContainer
