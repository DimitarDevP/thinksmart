import React from 'react'

import Course from '../GlobalComponents/Course'
import './CourseGroup.css'

class CourseGroup extends React.Component {

    constructor(props){

        super(props)

        this.state = {
            showingStart: -3
        }

        this.handleArrowClick = this.handleArrowClick.bind(this)

    }

    handleArrowClick = (click,e) => {


        if(click === "left"){
            let slider = e.target.nextSibling
            slider.scrollLeft -= 550;

        } else{
            let slider = e.target.previousSibling
            slider.scrollLeft += 550;
        }
    }

    render(){

        const courses = this.props.courses.map(course => {
            return (
                <Course
                    name={course.course_name} 
                    instructor={course.course_creator} 
                    img={course.course_thumbnail}
                    details={course.details}
                    id={course.course_id}
                    key={course.course_id}
                />
            )
        })

        return(
            <div className={this.props.groupClass}>
                <h2 className="title">{this.props.groupTitle}</h2>
                <div className="course-group">
                    <button className="arrow arrow-back" onClick={(e) => {
                        this.handleArrowClick('left', e)
                    }}> {'<'} </button>
                    <div className="wrap-courses">
                        {courses}
                    </div>
                    <button className="arrow arrow-next" onClick={(e) => {
                            this.handleArrowClick('right', e)
                    }}> {'>'} </button>
                </div>
            </div>
        )   
    }

}

export default CourseGroup