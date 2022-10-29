import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
    return(
        <div>
            <h1 className="page-header">
                The Kempen Spirits
            </h1>
            <section className="landing-container">
                <Link to="/drinks" className="primary-landing-container">
                    <div className="landing-button button-flip">
                        Browse Drinks
                    </div>
                </Link>
                <div className="minor-landing-items">
                    <Link to={"/drinks/tequila/witches-brew"} className='witches-brew'>
                        <div>Witches Brew</div>
                    </Link>
                    <Link to={"/drinks/rum/poison-apple"} className='poison-apple'>
                        <div>Poison Apple</div>
                    </Link>
                </div>
            </section>
        </div>
    )
}