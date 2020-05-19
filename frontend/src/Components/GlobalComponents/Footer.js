import React from 'react'
import { NavLink, Link, withRouter } from 'react-router-dom'

import './Footer.css'

class Footer extends React.Component {

    changeLanguage = (lang) => {
        localStorage.removeItem('lang')
        localStorage.setItem('lang', lang)
        this.props.history.push('/home')
    }

    render(){
        return (
            <div className="footer-body">
                <div className="footer-container">
                    
                    <div className="footer-upper">
                        <div className="footer-menu">
                            <h3>Menu</h3>
                            <ul>
                                <NavLink to="/home"><li>{localStorage.getItem('lang') !== 'mkd' ? ('Home') : ('Дома')}</li></NavLink>
                                <NavLink to={"/instructor-land/" + localStorage.getItem('user_id')}><li>{localStorage.getItem('lang') !== 'mkd' ? ('Profile') : ('Профил')}</li></NavLink>
                                <NavLink to='/add-course'><li>{localStorage.getItem('lang') !== 'mkd' ? ('Upload Course') : ('Подигни Курс')}</li></NavLink>
                                <NavLink to='/list-questions/'><li>Smart Support</li></NavLink>
                            </ul>
                        </div>

                        <div className="footer-social">
                            <h3>Social Media</h3>
                            <ul>
                                <li>
                                    <img src="/social_media/facebook.png" />
                                    <h4><Link to="https://www.facebook.com/ThinkSmart-290336568513090/">Facebook</Link></h4>
                                </li>
                                <li>
                                    <img src="/social_media/twitter.png" />
                                    <h4><Link to="https://twitter.com/SmartTechCEO">Twitter</Link></h4>
                                </li>
                                <li>
                                    <img src="/social_media/youtube.png" />
                                    <h4><Link to="">Youtube</Link></h4>
                                </li>
                            </ul>
                        </div>

                        <div className="footer-details">
                            <h3>{localStorage.getItem('lang') !== 'mkd' ? ('Announcements') : ('Изјавувања')}</h3>
                            <h4>{localStorage.getItem('lang') !== 'mkd' ? (
                                'Please note that this is a demo version. If you have any questions, remakrs, opinions, reviews, and tips, please contact us at the following email:'
                                ) : (
                                'Ве молиме запомнете дека страната е сеуште во демо верзија. Ако имате било какви прашања, ставово, совети или оцени, контактирајтене на следнава адреса:'
                            )}</h4>
                            <h4 className="footer-email">thinksmartfounders@gmail.com</h4>
                        </div>

                    </div>

                    <div className="footer-lower">
                        <img src="/test_assets/Logo-white.png" />
                        <h4 className="copyright">Copyright &copy; 2019 SmartTech, Inc</h4>
                        <div className="choose-language">
                            <ul>
                                <li onClick={() => {this.changeLanguage('mkd')}}>Македонски</li>
                                <li onClick={() => {this.changeLanguage('en')}}>English</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default withRouter(Footer)