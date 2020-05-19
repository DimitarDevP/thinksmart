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
        var storageRef = firebase.storage().ref('profile_pictures/'+ localStorage.getItem('registered_user') + '.jpg')

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
                firebase.storage().ref('profile_pictures/'+ localStorage.getItem('registered_user') + '.jpg').getDownloadURL().then((url) => {
                    self.props.loadData(url)
                })
            }
        )
    }
    render(){
        return (
            <div id="upload">
                <label id="upload-label">Choose Image<input type="file" name="profile_image_source" className="file-upload" onChange={this.handleFileChange} /></label>
                <progress id="uploader" className="progress-bar" value="0" max="100"></progress>
            </div>
        )
    }

}

export default ImageUpload