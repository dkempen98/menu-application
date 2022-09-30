import React, { useEffect, useState } from "react";
import drinkList from "../data/RecipeSample.json"

export default function Drink() {
    const [drink, setDrink] = useState()
    const [description, setDescription] = useState()
    const [imageLink, setImageLink] = useState("/images/" + window.location.pathname.split('/').pop() + ".jpg")

    useEffect(() => {
        init()
    }, [])

    function init() {
        let drinkTemp = window.location.pathname.split('/').pop()
        let descTemp = ""
        drinkList.every(item => {
            let curDrink = item.drinkName
            curDrink = curDrink.toLowerCase().split(' ').join('-')
            if(curDrink === drinkTemp) {
                drinkTemp = item.drinkName
                descTemp = item.description
                return false
            }
            return true
        });

        if(drinkTemp === window.location.pathname.split('/').pop()) {
            window.location.href = "/error"
        }

        setDrink(drinkTemp)
        setDescription(descTemp)
    }

    function hideImg() {
        // document.getElementById("drinkImg").style.visibility = "hidden"
        setImageLink("/images/generic-drink.jpg")
    }

    return(
        <section>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/drinks">Drinks</a></li>
            </ul>
            <h1>
                {drink}
            </h1>
            <img id="drinkImg" src={imageLink} onError={() => hideImg()}/>
            <p>
                {description}
            </p>
        </section>
    )
}