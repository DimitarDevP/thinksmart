import React from 'react'
import UploadPartOne from './UploadPartOne'
import UploadPartTwo from './UploadPartTwo'
import './UploadCourseContainer.css'
import axios from 'axios';
import { withRouter } from 'react-router-dom'

class UploadCourseContainer extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            stepOneShowing: true,
            stepTwoShowing: false,
            res: null,
            videoCount: null
        }

    }

    changeVisibility = (res, videoCount) => {
        this.setState({
            stepOneShowing: false,
            stepTwoShowing: true,
            res: res,
            videoCount: videoCount
        })
    }

    componentDidMount() {
        axios.get('http://localhost/thinksmart/get_requests/users.php?id='+localStorage.getItem('user_id'))
        .then(response => {
            const user_type = response.data[0].user_type

            if(user_type !== 'instructor'){
                this.props.history.push('/home')
            }

        })
    }

    render() {
        return (
            <div>
                {this.state.stepOneShowing ? (<UploadPartOne changeVisibility={this.changeVisibility} />) : (<UploadPartTwo videoCount={this.state.videoCount + 1} course={this.state.res} />)}
            </div>
        )
    }

}

export default withRouter(UploadCourseContainer)