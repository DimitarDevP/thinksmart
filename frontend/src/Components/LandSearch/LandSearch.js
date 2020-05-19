import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Search from '../GlobalComponents/Search'
import Course from '../GlobalComponents/Course'
import Footer from '../GlobalComponents/Footer'
import './LandSearch.css'

class LandSearch extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            search: this.props.match.params.query_string,
            result: null,
        }
    }

    getAllMatches = () => {
        axios.get('http://localhost/thinksmart/get_requests/search_query_results.php?query_string='+this.state.search)
        .then(res => {
            const courses = res.data
            const result = courses.map(course => {
                return(
                    <Course name={course.course_name}
                        img={course.course_thumbnail}
                        id={course.course_id}
                        key={course.course_id}
                    />
                )
            })

            this.setState({
                result
            })

        })
    }

    componentDidUpdate() {
        if(this.state.search !== this.props.match.params.query_string){
            this.setState({
                search: this.props.match.params.query_string
            })
        }
        this.getAllMatches()
    }

    componentDidMount(){
        this.getAllMatches()
    }

    search = (e) => {
        e.preventDefault()
        var str = e.target.parentElement.parentElement.children[1].value
        str = str.replace(/\s+/g, '-').toLowerCase()
        this.props.history.push('/results/'+str)
    }

    render(){
        return (
            <span>
                <div className="results-container">
                    <Search search={this.search}/>
                    <div className="results">
                        {this.state.result}
                    </div>
                </div>   
                <Footer />
            </span>
        )
    }

}

export default withRouter(LandSearch)