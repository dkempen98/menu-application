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
                {/* <div className="minor-landing-items">
                    <Link>sdfgergf</Link>
                    <Link>a;sdf</Link>
                </div> */}
            </section>
        </div>
    )
}