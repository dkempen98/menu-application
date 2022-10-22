import React from "react";
import { Link, redirect } from "react-router-dom";

export default function BackButton() {
    function previousPage() {
        // if(window.history.back(1).includes(window.location.hostname)) {
        //     window.history.back(1)
        // } else {
        //     redirect("/")
        // }

        let prevPage = window.location.pathname.split('/')
        prevPage.pop()
        prevPage = prevPage.join("/")
        if(! prevPage) prevPage = "/"
        return prevPage
    }

    return (
        <Link to={previousPage()} className="back-button button-flip">&#8617;</Link>
    )
}