import React from 'react'
import { withRouter } from 'react-router-dom'

import './Instructor.css'

import InstructorLeft from './InstructorLeft'
import InstructorNav from './InstructorNav'
import InstructorBio from './InstructorBio'
import InstructorCourses from './InstructorCourses'
import axios from 'axios'
var instructor_id = 0

class Instructor extends React.Component {

    constructor() {
        
        super()

        this.state = {
            tab1showing: true,
            tab2showing: false,
            tab3showing: false,
            user_info: [],
            user_courses: [],
            user_created_courses: []
        }
    }

    componentDidMount(){
        this.handleNavChange(0)
        instructor_id = this.props.match.params.instructor_id

        axios.get('http://localhost:80/thinksmart/get_requests/courses.php?creator_id='+instructor_id)
                .then(res => {
                    const courses = res.data
                    this.setState({
                        user_created_courses : courses
                    })
                })

        axios.get('http://localhost:80/thinksmart/get_requests/user_owned_courses.php?owner_id='+instructor_id)
                .then(res => {
                    const courses = res.data
                    this.setState({
                        user_courses : courses
                    })

                })

        axios.get('http://localhost:80/thinksmart/get_requests/users.php?id='+instructor_id)
        .then(res => {
            const user_info = res.data[0]

            if(typeof(user_info) === 'undefined') {
                this.props.history.push('/home')
            }

            this.setState({
                user_info:user_info
            })
        })

    }

    handleNavChange = (tab) => {

        this.setState({
            tab1showing: false,
            tab2showing: false,
            tab3showing: false
        })

        if(tab === 0){
            this.setState({
                tab1showing: true
            })
        } else if (tab === 1){
            this.setState({
                tab2showing: true
            })
        } else {
            this.setState({
                tab3showing: true
            })
        }

        const tabs = document.getElementsByClassName("instructor-tab")

        for(let i = 0; i < 3; i++){
            tabs[i].style.display = "none"
        }

        tabs[tab].style.display = "block"

    }

    render() {
        return(
            <div className="instructor-container">
                <InstructorLeft imgsrc={this.state.user_info.profile_image_source} name={this.state.user_info.display_name} shortbio={this.state.user_info.short_bio} />
                <InstructorNav handleNavChange={this.handleNavChange} />
                <InstructorBio className="instructor-tab" isshowing={this.state.tab1showing} bio1={this.state.user_info.bio_info} bio2={this.state.user_info.bio_exp} />
                <InstructorCourses className="instructor-tab" isshowing={this.state.tab2showing} courses={this.state.user_created_courses} />
                <InstructorCourses className="instructor-tab" isshowing={this.state.tab3showing} courses={this.state.user_courses} />
            </div>
        )
    }

}

export default withRouter(Instructor)