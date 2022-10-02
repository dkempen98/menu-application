import React from "react";

export default function LandingPage() {
    return(
        <div>
            <h1 className="page-header">
                Kempen Spirits
            </h1>
            <div className="landing-container">
                <a href="/drinks">
                    <div className="landing-button">
                        <h3>Browse Drinks</h3>
                    </div>
                </a>
            </div>
        </div>
    )
}