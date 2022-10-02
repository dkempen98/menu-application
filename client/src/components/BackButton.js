import React from "react";
import { redirect } from "react-router-dom";

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
        window.location.href = prevPage
    }

    return (
        <button onClick={() => previousPage()} className="back-button">&#8617;</button>
    )
}