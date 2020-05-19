import React from 'react'
import axios from 'axios'
import './CourseHeader.css'

class CourseHeader extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            creatorName: null,
            
        }
    }

    callInstructorName = () => {
        axios.get('http://localhost:80/thinksmart/get_requests/users.php?id='+this.props.course.course_creator_id)
        .then(response => {
            const username = response.data[0].username
            this.setState({
                creatorName: username
            })
        })
    }

    changeOwnedStatus = () => {
        axios.get('http://localhost:80/thinksmart/get_requests/enroll_course.php?owner_id='+localStorage.getItem('user_id')+'&course_id='+this.props.course.course_id)
        .then(
            this.props.enrollCourse()
        )

    }

    componentDidMount = () => {
        this.callInstructorName()
    }

    render(){
        return(
            <div className="course-header">
                <div className="header-container">
                    <div className="left-colum colum">
                        <img src={this.props.course.course_thumbnail} alt="course_image" />
                        <h4>{this.props.course.date_added}</h4>
                        <h3>{this.state.creatorName}</h3>
                    </div>
        
                    <div className="right-colum colum">
                        <h2>{this.props.course.course_name}</h2>
                        <h4>{this.props.course.course_description}</h4>
                        <input type="submit" value={
                            this.props.userOwnsCourse ? (
                            localStorage.getItem('lang') !== 'mkd' ? ('Remove Course') : ('Избриши Курс')) : (
                                localStorage.getItem('lang') !== 'mkd' ? ('Add Course') : ('Додај Курс')
                            )} onClick={this.changeOwnedStatus} id="add-course"/>
                    </div>
                </div>
            </div>
        )
    }

}

export default CourseHeader