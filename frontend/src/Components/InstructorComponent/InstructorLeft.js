import React from 'react'

import './InstructorLeft.css'

const InstructorLeft = (props) => {
    return (
        <div className="instructor-left">
            <div className="image-container">
                <img src={props.imgsrc} alt="ThinkSmart Instructor"/>
            </div>
            <div className="basic-info-container">
                <span>
                    <h1>{localStorage.getItem('lang') !== 'mkd' ? ('Name:') : ('Име:')}</h1>
                    <h2>{props.name}</h2>
                </span>
                <span>
                    <h1>{localStorage.getItem('lang') !== 'mkd' ? ('Short Bio:') : ('Кратка Биографија')}</h1>
                    <h3>{props.shortbio}</h3>
                </span>
            </div>
        </div>
    )
}

export default InstructorLeft