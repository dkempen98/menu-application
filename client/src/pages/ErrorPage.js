import React from "react";

export default function Error() {
    return(
        <section>
            <h1>
                Sorry, it looks like the item you're looking for doesn't exist or is currently unavailable
            </h1>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/drinks">Drinks</a></li>
            </ul>
        </section>
    )
}