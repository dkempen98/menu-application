import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
    return(
        <div>
            <h1 className="page-header">
                The Kempen Spirits
            </h1>
            <div className="landing-container">
                <Link to="/drinks">
                    <div className="landing-button button-flip">
                        Browse Drinks
                    </div>
                </Link>
            </div>
        </div>
    )
}