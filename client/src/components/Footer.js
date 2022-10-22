import React from "react";
import BackButton from "./BackButton";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
    const { pathname } = useLocation();
    if(pathname === "/"){
        return
    }

    return (
    <div>
        <div className="bottom-margin"/>
        <footer>
            <Link to="/" className="footer-title">The Kempen Spirits</Link>
            <BackButton/>
        </footer>
    </div>
    )
}