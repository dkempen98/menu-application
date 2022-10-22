import React from "react";
import { Link, redirect } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMartiniGlass } from '@fortawesome/free-solid-svg-icons'

export default function BackButton() {
    function previousPage() {

        let prevPage = window.location.pathname.split('/')
        prevPage.pop()
        prevPage = prevPage.join("/")
        if(! prevPage) prevPage = "/"
        return prevPage
    }

    return (
        <div className="footer-buttons">
            <Link to="/drinks" className="back-button"><FontAwesomeIcon icon={ faMartiniGlass } /></Link>
            <Link to={previousPage()} className="back-button">&#8617;</Link>
        </div>
    )
}