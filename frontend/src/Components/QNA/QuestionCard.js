import React from 'react'
import { Link } from 'react-router-dom'
import './QuestionCard.css'

const QuestionCard = (props) => {

    const title = props.title
    const body = props.body.substring(0, 300).replace(/\?\?\?/g, " ‏‏‎ ").replace(/'''/g, "<code>").concat('...')
    const addedOn = props.date

    return(
        <Link to={'/view-question/'+ props.id} className="question-link">
        <div className="question-card">
            <h2 className="question-title">{title}</h2>
            <h4 className="question-body-s">{body}</h4>
            <h4 className="question-date-s">{addedOn}</h4>
        </div>
        </Link>
    )
}

export default QuestionCard