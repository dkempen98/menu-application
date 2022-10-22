import React from "react";
import { Link } from "react-router-dom";

export default function Error() {
    return(
        <section className="error-container">
            <h2 className="error-header">
                Sorry, it looks like the item you're looking for doesn't exist or is currently unavailable
            </h2>
            <div className="error-button-container">
                <Link to="/" className="error-button button-flip">Home</Link>
                <Link to="/drinks" className="error-button button-flip">Drinks</Link>
            </div>
        </section>
    )
}