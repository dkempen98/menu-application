import React from "react";

export default function LandingPage() {
    return(
        <div>
            <h1 className="page-header">
                The Kempen Spirits
            </h1>
            <div className="landing-container">
                <a href="/drinks">
                    <div className="landing-button button-flip">
                        Browse Drinks
                    </div>
                </a>
            </div>
        </div>
    )
}