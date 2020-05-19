import React from 'react'
import CourseHeader from '../GlobalComponents/CourseHeader'

import VideoUpload from './VideoUpload'

class UploadPartTwo extends React.Component {

    render() {
        const uploadFields = []
        for(let i = 1; i <= this.props.videoCount; i++){
            let field = (
                <VideoUpload videoId={i} courseId={this.props.course.course_id}/>
            )

            uploadFields.push(field)

        }

        return (
            <div className="upload-container">
                <CourseHeader course={this.props.course} />
                <div className="fields-wrapper">
                    {uploadFields}
                </div>
            </div>
        )
    }
}

export default UploadPartTwo