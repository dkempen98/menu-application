import React, { useEffect, useState } from "react";
import ListItems from "../components/ListItems";
import drinkList from "../data/RecipeSample.json"
import BackButton from "../components/BackButton";

export default function Drinks() {
    const [categories, setCategories] = useState()
    const [holiday, setHoliday] = useState('Halloween')

    useEffect(() => {
        init()
    }, [])

    // Find categories with at least one drink with the necessary ingredients in stock, if already in list skip evaluation
    // TODO: This will need additional logic to evaluate if a drink has all ingredients in stock once stock data is available

    function init() {
        let cats = []
        for (let i = 0; i < drinkList.length; i++) {
            if(! cats.includes(drinkList[i].category)) {
                cats.push(drinkList[i].category)
            }
        }
        cats.sort()
        // TODO: use unshift on this array to add a seasonal item if one exists
        cats.unshift("All")
        if(holiday != '') {cats.unshift(holiday)};
        setCategories(cats)
        console.log(window.history)
    }

    return(
        <section>
            <h1 className="page-header">
                Drink Types
            </h1>
            <ListItems
                items = {categories}
                currentPageRoute = {window.location.pathname}
                pageClass = "drinks"
                />
        </section>
    )
}