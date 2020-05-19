import React from 'react'
import './Home.css'
import CourseGroup from './CourseGroup'
import axios from 'axios';
import {withRouter} from 'react-router-dom'
import Search from '../GlobalComponents/Search'
import Footer from '../GlobalComponents/Footer'


class Home extends React.Component {

    constructor(){
        
        super()

        this.state = {
            quote: '"Develop a passion for learning. Once you do, you will never cease to grow!"',
            courses: [],
            webCourses:[],
            gameCourses: [],
            mobileCourses: [],
            generalCourses: [],
        }

        this.getAllCourses = this.getAllCourses.bind(this)

    }

    componentDidMount = () => {
        this.getAllCourses()
        this.setCourseGroups()
    }

    getAllCourses = () => {
        axios.get('http://localhost:80/thinksmart/get_requests/courses.php')
        .then(response => {
            const courses = response.data
            this.setState({
                courses
            })
        })
    }

    setCourseGroups = () => {
        const gameKeywords = 'ue4-unreal-engine-c++-game'
        this.setCourseGroup(gameKeywords, 'gameCourses')
        const webKeywords = 'web-react-javascript-html-css-php-website'
        this.setCourseGroup(webKeywords, 'webCourses')
        const mobileKeywords = 'android-ios-mobile'
        this.setCourseGroup(mobileKeywords, 'mobileCourses')
        const generalKeywords = 'c++-python-basic-c sharp-c-visualbasic'
        this.setCourseGroup(generalKeywords, 'generalCourses')

    }

    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    setCourseGroup = (keywords, set) => {
        axios.get('http://localhost/thinksmart/get_requests/search_query_results.php?query_string='+keywords)
        .then(result => {
            const res = result.data

            if(set === 'webCourses'){
                this.setState({
                    webCourses: res
                })
            } else if(set === 'generalCourses'){
                this.setState({
                    generalCourses: res
                })
            }else if(set === 'mobileCourses'){
                this.setState({
                    mobileCourses: res
                })
            }else if(set === 'gameCourses'){
                this.setState({
                    gameCourses: res
                })
            }

        })
    }

    search = (e) => {
        e.preventDefault()
        var str = e.target.parentElement.parentElement.children[1].value
        str = str.replace(/\s+/g, '-').toLowerCase()
        this.props.history.push('/results/'+str)
    }

    render() {
        return(
            <span>
                <div className="home-container">
                    <div className="home-image">
                        <h1 className="home-quote">{this.state.quote}</h1>
                    </div>
                    <div className="home-main">
                        <Search search={this.search}/>
                        {this.state.generalCourses.length < 5 ? ('') : (<CourseGroup courses={this.state.generalCourses} groupTitle={"Courses to get you started with General Programming"} />) }
                        {this.state.webCourses.length < 5 ? ('') : (<CourseGroup courses={this.state.webCourses} groupTitle={"Courses to get you started with Web Development"} />) }
                        {this.state.gameCourses.length < 5 ? ('') : (<CourseGroup courses={this.state.gameCourses} groupTitle={"Courses to get you started with Game Development"} />) }
                        {this.state.mobileCourses.length < 5 ? ('') : (<CourseGroup courses={this.state.mobileCourses} groupTitle={"Courses to get you started with Mobile Applications Development"} />) }
                    </div>
                </div>
                <Footer />
            </span>
        )
    }


}
export default withRouter(Home)