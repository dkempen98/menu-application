import React, { useEffect, useState } from "react";
import ListItems from "../components/ListItems";
import drinkList from "../data/Recipe.json"
import SetLiquorTypes from "../components/SetLiquorTypes";
import { useStateContext } from "../StateContext";

export default function Drinks() {

    const {
        inStock,
        overrideStockCheck,
        holiday
    } = useStateContext()

    const [categories, setCategories] = useState()

    useEffect(() => {
        init()
    }, [])

    useEffect(() => {
        init()
    }, [inStock, overrideStockCheck])

    // Find categories with at least one drink with the necessary ingredients in stock, if already in list skip evaluation

    function init() {
        let cats

        if(overrideStockCheck) {
            cats = SetLiquorTypes(drinkList)
        } else {
            cats = SetLiquorTypes(inStock)
        }

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