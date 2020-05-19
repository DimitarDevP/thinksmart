import React from 'react'

import './LandingHero.css'

const LandingHero = () => {

    return (
        <div className="landing-hero part">

            <h1>{localStorage.getItem('lang') !== 'mkd' ? ('Welcome To ThinkSmart') : ('Добредојде Во ThinkSmart')}</h1>

            <img src="./test_assets/Logo-white.png" alt="landing"/>

            <h2>{localStorage.getItem('lang') !== 'mkd' ? ('One of the best online-learning platform on the internet.') : ('Една од најдобрите онлајн едукативна платформа')}</h2>

        </div>
    )
}

export default LandingHero