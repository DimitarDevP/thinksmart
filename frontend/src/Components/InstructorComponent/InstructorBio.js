import React from 'react'

import './InstructorBio.css'

const InstructorBio = (props) => {

    return (
        <div className="instructor-tab">
            <div className="instructor-bio">
                <div className="bio">
                    <h2>{localStorage.getItem('lang') !== 'mkd' ? ('About Me:') : ('За Мене:')}</h2>
                    <h3>{props.bio1}</h3>
                </div>

                <div className="bio">
                    <h2>{localStorage.getItem('lang') !== 'mkd' ? ('My Experience:') : ('Искуство:')}</h2>
                    <h3>{props.bio2}</h3>
                </div>
            </div>
        </div>
    )

}

export default InstructorBio