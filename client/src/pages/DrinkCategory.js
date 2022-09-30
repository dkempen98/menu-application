import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListItems from "../components/ListItems";
import drinkList from "../data/RecipeSample.json"

export default function DrinkCategory() {
    const [drinks, setDrinks] = useState()
    const [category, setCategory] = useState("All")

    useEffect(() => {
        init()
    }, [])

    // Find categories with at least one drink with the necessary ingredients in stock, if already in list skip evaluation
    // TODO: This will need additional logic to evaluate if a drink has all ingredients in stock once stock data is available

    
    function init() {
        let drinkNames = []
        let pageCategory = window.location.pathname.split('/').pop()
        
        if(pageCategory === "all") {
            for (let i = 0; i < drinkList.length; i++) {
                if(! drinkNames.includes(drinkList[i].drinkName)) {
                    drinkNames.push(drinkList[i].drinkName)
                }
            }
        } else {
            for (let i = 0; i < drinkList.length; i++) {
                let drinkCategory = drinkList[i].category.toLowerCase().split(' ').join('-')
    
                if((! drinkNames.includes(drinkList[i].drinkName) && drinkCategory === pageCategory)) {
                    drinkNames.push(drinkList[i].drinkName)
                }
            }
            drinkList.every(item => {
                let curCat = item.category
                curCat = curCat.toLowerCase().split(' ').join('-')
                if(curCat === pageCategory) {
                    pageCategory = item.category
                    return false
                }
                return true
            });
            setCategory(pageCategory)
        }


        if(drinkNames.length == 0) {
            window.location.href = "/error"
        }

        drinkNames.sort()
        setDrinks(drinkNames)
    }

    return(
        <section>
            <h1>
                {category}
            </h1>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/drinks">Drinks</a></li>
                <ListItems
                    items = {drinks}
                    currentPageRoute = {window.location.pathname}
                />
            </ul>
        </section>
    )
}