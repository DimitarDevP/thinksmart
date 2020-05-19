import React from 'react'

import './InstructorNav.css'

const InstructorNav = props => {
    return(
        <div className="instructor-nav">
            <ul>
                <li onClick={
                function (){
                    return props.handleNavChange(0)
                }}>{localStorage.getItem('lang') !== 'mkd' ? ('About Me') : ('За Мене')}</li>

                <li onClick={
                function (){
                    return props.handleNavChange(1)
                }}>{localStorage.getItem('lang') !== 'mkd' ? ('Created Courses') : ('Направени Курсеви')}</li>

                <li onClick={
                function (){
                    return props.handleNavChange(2)
                }}>{localStorage.getItem('lang') !== 'mkd' ? ('Enrolled Courses') : ('Додадени Курсеви')}</li>
            </ul>
        </div>
    )
}

export default InstructorNav