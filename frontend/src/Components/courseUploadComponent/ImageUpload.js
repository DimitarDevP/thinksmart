import React from 'react'

import firebase from 'firebase'

class ImageUpload extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            selectedFile: null
        }
    }

    handleFileChange = () => {
        const uploader = document.getElementById('uploader')
        const file = document.getElementsByClassName('file-upload')[0].files[0]
        var random_number = Math.random()
        var storageRef = firebase.storage().ref('course_pictures/'+ localStorage.getItem('user_id') + '_' + random_number + '.jpg')

        var task = storageRef.put(file)
        var self = this

        task.on('state_changed',
            function progress(snapshot) {
                var precentage = (snapshot.bytesTransferred / snapshot.totalBytes) *100
                uploader.value = precentage

            },

            function error(err) {

            },
            function complete(){
                firebase.storage().ref('course_pictures/'+ localStorage.getItem('user_id') + '_' + random_number + '.jpg').getDownloadURL().then((url) => {
                    self.props.loadData(url)
                })
            }
        )
    }
    render(){
        return (
            <div id="upload">
                <label id="upload-label" className='upload-course-image'>Choose Image<input required={true} type="file" name="profile_image_source" className="file-upload" onChange={this.handleFileChange} /></label>
                <progress className="progress-bar" value="0" max="100" id="uploader"></progress>
            </div>
        )
    }

}

export default ImageUpload