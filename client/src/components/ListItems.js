import React, { useState } from "react";
import { Link } from "react-router-dom";


export default function ListItems({items, currentPageRoute, pageClass}) {
    if(! items) {
        return <div>Loading...</div>
    }

    function generateSlug(name) {
        return name.toLowerCase().split(' ').join('-')
    }
    

    const list = items.map((item) => {
        const slug = generateSlug(item)
        let imageLink = "/images/" + slug + ".jpg"
        
        function replaceImg(name) {
            document.getElementById("drinkImg" + name).src = "/images/generic-drink.jpg"
        }
        
        if(pageClass === "category") {
            return (
                <Link to={slug} href={currentPageRoute + "/" + slug} className="category-drink-container">
                    <img id={"drinkImg" + slug} className="category-images" src={imageLink} onError={() => replaceImg(slug)}/>
                    <div className={pageClass + "-items " + slug}>
                        <div>{item}</div>
                    </div>
                </Link>
            )
        }
        return (
            <Link to={slug} href={currentPageRoute + "/" + slug}>
                <div className={pageClass + "-items card-hover " + slug}>
                    <div>{item}</div>
                </div>
            </Link>
        )
    })
    console.log(list)
    return (
        <section className={pageClass + "-container"}>
            {list}
        </section>
    )
}