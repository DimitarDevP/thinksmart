import React from 'react'
import './VideoUpload.css'
import firebase from 'firebase'
import axios from 'axios'

class VideoUpload extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            videUrl: null,
            error: null,
            file: null,
            video_name: null,
            fileExtention: null,
            fileUploaded: false
        }
    }
    
    validateVideo = (e, index) => {
        const file = document.getElementsByClassName('video-upload-input')[index-1].files[0]
        const fileName = file.name

        const allowedExtensions = ['avi', 'mov', 'mkv', 'mp4', 'flv']
        const fileExtention = fileName.split('.').pop();

        if(!(allowedExtensions.includes(fileExtention))){
            this.setState({
                error: "Please select a supported file type"
            })
            return
        }

        this.setState({
            error: null,
            fileExtention,
            file
        })

    }

    uploadVideo = () => {
        const index = this.props.videoId

        const uploader = document.getElementsByClassName('uploader')[index-1]
        var storageRef = firebase.storage().ref('course_videos/'+ localStorage.getItem('user_id') + '_' + this.props.courseId + '_' + this.props.videoId + this.state.fileExtention)
        var task = storageRef.put(this.state.file)
        var self = this

        task.on('state_changed',
            function progress(snapshot) {
                var precentage = (snapshot.bytesTransferred / snapshot.totalBytes) *100
                uploader.value = precentage
            },

            function error(err) {

            },
            function complete(){
                firebase.storage().ref('course_videos/'+ localStorage.getItem('user_id') + '_' + self.props.courseId + '_' + self.props.videoId + self.state.fileExtention).getDownloadURL().then((url) => {
                    self.setState({
                        videUrl: url,
                        fileUploaded: true,
                        error: null
                    })
                    self.uploadData()
                })
            }
        )
    }

    uploadData = () => {
        const under_course_id = this.props.courseId
        const video_name = this.state.video_name
        const video_source = this.state.videUrl
        const content_id = this.props.videoId

        const video = new FormData()

        video.append('under_course_id', under_course_id)
        video.append('video_name', video_name)
        video.append('video_source', video_source)
        video.append('content_id', content_id)

        const api = axios.create({baseURL: 'http://localhost:80'})
        api.post("thinksmart/post_requests/upload_course_video.php", video)

    }

    validateData = (e, index) => {
        e.preventDefault()
        const videoName = e.target.videoName.value
        const file = document.getElementsByClassName('video-upload-input')[index-1].files[0]

        if(videoName.length < 8) {
            this.setState({
                error: "Please enter a more descriptive video name"
            })
            return
        }

        if(videoName.length > 32) {
            this.setState({
                error: "Please enter a shorter video name"
            })
            return
        }

        this.setState({
            video_name: videoName
        })

        if(typeof(file) == 'undefined'){
            this.setState({
                error: "Please select a file"
            })
            return
        }

        this.uploadVideo()
    }

    componentDidMount(){
    }



    render() {
        return (
            <div>
                <form className="upload-video" onSubmit={(event) => {this.validateData(event, this.props.videoId)}}>
                    <div className="fields">
                        <label id="file-label">
                            Choose File
                            <input id="file" className="video-upload-input" type="file" onChange={(event) => {this.validateVideo(event, this.props.videoId)}}/>
                        </label>
                        <input id="name" name="videoName" type="text" placeholder="Video Name" />
                        <input type="submit" value=">" id="submit" />
                    </div>
                    <progress value="0" max="100" className="video-progress uploader"/>
                </form>

                {this.state.error !== null ? (<h1 className="video-error">{this.state.error}</h1>) : ('') }

            </div>
        )
    }
}

export default VideoUpload