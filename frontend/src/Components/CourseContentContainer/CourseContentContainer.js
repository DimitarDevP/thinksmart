import React from 'react'
import axios from 'axios'

import CourseHeader from '../GlobalComponents/CourseHeader'
import './CourseContentContainer.css'

class CourseContentContainer extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            course: null,
            courseContent: [],
            userOwnsCourse: false,
            courseId: null,
            courseLoaded: false,
            courseContentLoaded: false,
            ownedLoaded: false,
            
        }
    }

    fetchCourse = (courseId) => {
        axios.get('http://localhost:80/thinksmart/get_requests/courses.php?course_id='+courseId)
        .then(res => {
            const courses = res.data[0]
            this.setState({
                course: courses,
                courseLoaded: true
            })
        })
    }

    fetchCourseContent = (courseId) => {
        axios.get('http://localhost:80/thinksmart/get_requests/course_content.php?course_id='+courseId)
        .then(response => {
            const data = response.data
            this.setState({
                courseContent: data,
                courseContentLoaded: true
            })
        })
    }

    userOwnsCourse = (courseId) => {
        axios.get('http://localhost/thinksmart/get_requests/check_ownership.php?owner_id=' + localStorage.getItem('user_id') + '&course_id=' + courseId)
                .then(res => {
                    const isOwned = res.data.course_found

                    this.setState({
                        userOwnsCourse: isOwned,
                        ownedLoaded: true
                    })
                })
    }

    enrollCourse = () => {
        this.setState({
            userOwnsCourse: !this.state.userOwnsCourse
        })
    }

    componentDidMount() {
        if(localStorage.getItem('user_id') === null || localStorage.getItem('is_logged_in') === null){
            this.props.history.push('/')
        }
        const courseId = this.props.match.params.course_id
        this.setState({
            courseId: courseId
        })

        this.fetchCourse(courseId)
        this.fetchCourseContent(courseId)
        this.userOwnsCourse(courseId)
    }

    // toggleVideo = (e) => {
    //     e.target.parentElement.nextElementSibling.classList.toggle('hidden-video')
    // } attempt eden so child nodes! Utre da vidam ako mozam da go napram *note to self*

    // attempt dva so class based array selection
    toggleVideo = (index) => {
        const i = index - 1

        const element = document.getElementsByClassName('video')[i]
        element.classList.toggle('hidden-video')

    }

    render() {

        const coursecontent = this.state.courseContent.map(video => {
            return(
                <div key={video.content_id} className="content-part">
                    <div onClick={() => {this.toggleVideo(video.content_id)}} className="toggler">
                        <h2>{video.content_id}</h2>
                        <h3>{video.video_name}</h3>
                        <h2>{'▼'}</h2>
                    </div>
                    <video src={video.video_source} controls className="video hidden-video">
                        <source src={video.video_source} type="video/mp4" />
                    </video>
                </div>
            )
        })

        return(
            <div>
                { this.state.courseLoaded && this.state.ownedLoaded && this.state.ownedLoaded ? (<CourseHeader userOwnsCourse={this.state.userOwnsCourse} enrollCourse={this.enrollCourse} course={this.state.course} />) : ('')}
                <div className="course-content-container">
                    { this.state.userOwnsCourse ? 
                        coursecontent : (<h2 className="centered-text">{
                            localStorage.getItem('lang') !== 'mkd' ? 
                            ('You must own the course to view its content') : 
                            ('Мораш да го поседуваш курсот за да ги гледаш видеата!')
                        }</h2>)
                    }
                </div>
            </div>
        )
    }

}

export default CourseContentContainer