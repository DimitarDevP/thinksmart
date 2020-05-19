import React from 'react'

import {Link} from 'react-router-dom'

import './Course.css'

const Course = (props) => {

    const courseUrl = '/course-land/'+props.id
    return (
        <div className="course">
            <img src={props.img} alt="ThinkSmart Course"/>
            <div className="course-info-wrapper">
                <h2 className="course-name">{props.name}</h2>
                <Link to={courseUrl} className="go-to-course">{localStorage.getItem('lang') !== 'mkd' ? ('Go to course') : ('Оди до курсот')}</Link>
            </div>
        </div>
    )

}

export default Course