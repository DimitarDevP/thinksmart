import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

import './AddQuestion.css'

class AddQuestionContainer extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            strings: [],
            stringTypes: [],
            title: "...",
            body: "...",
            error: ''
        }
    }

    updatePreview = (e) => {

        const updatedBody = document.getElementById('addQuestion').children[3].value.replace(/ /g, " ‏‏‎ ")
        const updatedTitle = document.getElementById('addQuestion').children[1].value
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
            title: updatedTitle,
            body: updatedBody,
            strings: saveStrings
        })
    }

    uploadData = (e) => {
        e.preventDefault()

        if(this.state.title.length < 20 || this.state.title.length > 80){
            this.setState({
                error: 'Please use the title to describe the problem. Dont give too many details or make it too short.'
            })
            return
        }
        else if(this.state.body.length < 300){
            this.setState({
                error: 'Please enter more descriptive body.'
            })
            return
        }
        else {
            this.setState({
                error: ''
            })
        }

        const question = new FormData()
        question.append('poster_id', localStorage.getItem('user_id'))
        question.append('question_title', this.state.title)
        question.append('question_body', this.state.body)

        axios.post('http://localhost/thinksmart/post_requests/add_question.php', question)
        .then(res => {
            const response = res.data[0]
            this.props.history.push('/view-question/'+response.question_id)
        })
    }

    render(){
        return(
            <div class="add-contain">
                <div className="add-question-container">
                    <div className="add-question">
                        <form id="addQuestion">
                            <label>{localStorage.getItem('lang') !== 'mkd' ? ('Title') : ('Наслов')}:</label>
                            <input type="text" name="question_title" onChange={this.updatePreview} className="title-input" />
                            <label>{localStorage.getItem('lang') !== 'mkd' ? ('Body:') : ('Тело:')}</label>
                            <textarea name="question_body" onChange={this.updatePreview} className="body-input" />
                            <input type="submit" value={localStorage.getItem('lang') !== 'mkd' ? ('Post Question') : ('Постирај')} className="submit-question" onClick={this.uploadData} />
                            {this.state.error === '' ? ('') : (<h1 className="error">{this.state.error}</h1>)}
                            <h2>{localStorage.getItem('lang') !== 'mkd' ? ('Preview') : ('Изглед')}:</h2>
                        </form>
                    </div>
                    <div className="preview-question">
                        <h3>{this.state.title}</h3>

                        {this.state.strings}
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(AddQuestionContainer)