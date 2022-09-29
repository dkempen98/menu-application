import React, { useEffect, useState } from "react";
import ListItems from "../components/ListItems";
import drinkList from "../data/RecipeSample.json"

export default function Drink() {
    const [drink, setDrink] = useState()

    useEffect(() => {
        init()
    }, [])

    // Find categories with at least one drink with the necessary ingredients in stock, if already in list skip evaluation
    // TODO: This will need additional logic to evaluate if a drink has all ingredients in stock once stock data is available

    function init() {
        // let cats = []
        // for (let i = 0; i < drinkList.length; i++) {
        //     if(! cats.includes(drinkList[i].category)) {
        //         cats.push(drinkList[i].category)
        //     }
        // }
        // cats.sort()
        // TODO: use unshift on this array to add a seasonal item if one exists
        // cats.unshift("All")
        // setCategories(cats)
        let drinkName = window.location.pathname.split('/').pop().toUpperCase().split('-').join(' ')

        setDrink(drinkName)
    }

    return(
        <section>
            <h1>
                {drink}
            </h1>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/drinks">Drinks</a></li>
            </ul>
        </section>
    )
}