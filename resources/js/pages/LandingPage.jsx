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
                    <Link to={"/drinks/vodka/pumpkin-spice-white-russian"} className='pumpkin-spice-white-russian-featured'>
                        <div className="category-items">
                            <div>Pumpkin Spice White Russian</div>
                        </div>
                    </Link>
                    <Link to={"/drinks/vodka/zombie-smash"} className='zombie-smash-featured'>
                        <div className="category-items">
                            <div>Zombie Smash</div>
                        </div>
                    </Link>
                </div>
            </section>
        </div>
    )
}