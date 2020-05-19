import React from 'react'
import { withRouter } from 'react-router-dom'
import ImageUpload from './ImageUpload'
import axios from 'axios'

class UploadPartOne extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            videoCount: null,
            thumbnailUploaded: false,
            errors: null,
            imageurl: null,
            categories: [],
            selectedCategories: [],
            course:null,
            
        }
    }
    
    componentDidMount() {
        if(localStorage.getItem('user_id') === null || localStorage.getItem('is_logged_in') === null){
            this.props.history.push('/')
        }
        this.getAllCategories()
        this.setState({
            
        })
    }

    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    processData = (e) => {
        e.preventDefault()
        var i = 0
        while(!this.state.thumbnailUploaded || i === 10){
            this.sleep(500)
            i++;
        }
        const course_name = document.getElementsByClassName('course-name-input')[0].value
        const course_description = document.getElementsByClassName('course-desc-input')[0].value
        const course_creator_id = localStorage.getItem('user_id')
        const course_thumbnail = this.state.imageurl
        const categories = this.state.selectedCategories

        const fd = new FormData()
        fd.append('course_name', course_name)
        fd.append('course_description', course_description)
        fd.append('course_creator_id', course_creator_id)
        fd.append('course_thumbnail', course_thumbnail)
        fd.append('categories', categories)

        const api = axios.create({baseURL: 'http://localhost:80'})
        api.post('/thinksmart/post_requests/upload_course_one.php', fd)
        .then(response => {
            const res = response.data[0]

            this.props.changeVisibility(res, this.state.videoCount)
        })
    }

    getAllCategories = () => {
        axios.get('http://localhost:80/thinksmart/get_requests/get_all_categories.php')
        .then(response => {
            this.setState({
                categories: response.data
            })
        })
    }

    getUrl = (url) => {
        this.setState({
            imageurl: url,
            thumbnailUploaded: true
        })
    }

    setVideoCount = (e) => {
        this.setState({
            videoCount: e.target.selectedIndex
        })
    }

    pushCategory = (e) => {
        const newCategories = []
        for(let i = 0; i < 20; i++){
            if(e.target.parentElement.parentElement.children[i].children[0].checked){
                const category = e.target.parentElement.parentElement.children[i].children[1].innerHTML
                if(!newCategories.includes(category)){
                    newCategories.push(category)
                }   
            }
        }
        this.setState({
            selectedCategories: newCategories
        })
    }

    render() {
        var options = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

        const ops = options.map(option => {
            return (
                <option value={option}>{option} Video(s)</option>
            )
        })

        const selectCategories = this.state.categories.map(category => {
            return (
                <div className="category-container">
                    <input type="checkbox" onClick={this.pushCategory} name={category.category_name} value={category.category_id} className="category-check"/>
                    <h4>{category.category_name}</h4>
                </div>
            )
        })

        return (
            <div className="upload-course">
                <form className="upload-course-initial">
                    <div className="form-left form-part">
                        <img src={this.state.imageurl} alt="course_thumbnail"/>
                        <ImageUpload loadData={this.getUrl} />
                        <select name="number_of_videos" onChange={this.setVideoCount}>
                            {ops}
                        </select>
                    </div>

                    <div className="form-right form-part">
                        <div className="form-part-contain">
                            <label htmlFor="course_name">{localStorage.getItem('lang') !== 'mkd' ? ('Course Name:') : ('Име на курсот')}</label>
                            <input required={true} type="text" name="course_name" className="course-name-input" />
                        </div>
                        <div className="form-part-contain">
                            <label htmlFor="course_description">{localStorage.getItem('lang') !== 'mkd' ? ('Course Description:') : ('Објаснување на курсот')}</label>
                            <textarea required={true} name="course_description" className="course-desc-input" />
                        </div>
                        <div className="categories">
                            {selectCategories}
                        </div>
                        <input type="submit" name="send_data" value={localStorage.getItem('lang') !== 'mkd' ? ('Create Course') : ('Направи Курс')} id="create-course" onClick={this.processData} />
                    </div>
                </form>
            </div>
        )
    }

}

export default withRouter(UploadPartOne)
