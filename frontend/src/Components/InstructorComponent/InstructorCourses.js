import React from 'react'
import './InstructorCourses.css'

import Course from '../GlobalComponents/Course'

class InstructorCourses extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            creator: null
        }
    }  

    componentDidMount(){
        
    }

    render() { 
        const courses = this.props.courses.map(course => {
            return(
                <Course class="instructor-page-course" img={course.course_thumbnail} id={course.course_id} name={course.course_name} key={course.course_id}/>
            )
        })
        return (
            <div className="instructor-tab">
                <div className="instructor-courses">
                    {courses}
                </div>
            </div>
        )
    }
}

export default InstructorCourses