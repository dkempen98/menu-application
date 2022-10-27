import React, { useEffect, useState } from "react";
import ListItems from "../components/ListItems";
import drinkList from "../data/RecipeSample.json"
import SetLiquorTypes from "../components/SetLiquorTypes";

export default function Drinks() {
    const [categories, setCategories] = useState()
    const [holiday, setHoliday] = useState('Halloween')

    useEffect(() => {
        init()
    }, [])

    // Find categories with at least one drink with the necessary ingredients in stock, if already in list skip evaluation
    // TODO: This will need additional logic to evaluate if a drink has all ingredients in stock once stock data is available

    function init() {
        let cats = SetLiquorTypes(drinkList)
        cats.unshift("All")
        if(holiday) {cats.unshift(holiday)};
        setCategories(cats)
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