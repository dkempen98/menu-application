import React, { useState } from "react";


export default function ListItems({items, currentPageRoute, pageClass}) {
    if(! items) {
        return <div>Loading...</div>
    }

    function generateSlug(name) {
        return name.toLowerCase().split(' ').join('-')
    }
    
    const list = items.map((item) => {
        const slug = generateSlug(item)
        return (
            <a href={currentPageRoute + "/" + slug}>
                <div key={slug} className={pageClass + "-items " + slug}>
                    <div>{item}</div>
                </div>
            </a>
        )
    })
    console.log(list)
    return (
        <section className={pageClass + "-container"}>
            {list}
        </section>
    )
}