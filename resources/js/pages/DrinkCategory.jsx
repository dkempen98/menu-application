import React, { useEffect, useState } from "react";
import ListItems from "../components/ListItems";
import SetLiquorTypes from "../components/SetLiquorTypes";
import drinkList from "../data/Recipe.json"
import { useStateContext } from "../StateContext.jsx";
import axios from "axios";

export default function DrinkCategory() {
    const {
        checkStock
    } = useStateContext()

    const [drinks, setDrinks] = useState([])
    const [category, setCategory] = useState('')

    useEffect(() => {
        init()
    }, [])

    // Find categories with at least one drink with the necessary ingredients in stock, if already in list skip evaluation

    
    async function init() {
        // let drinkNames = []
        let pageCategory = window.location.pathname.split('/').pop()

        // if(pageCategory === "all") {
        //     for (let i = 0; i < drinkList.length; i++) {
        //         console.log(checkStock(drinkList[i].drinkName))
        //         if(!drinkNames.includes(drinkList[i].drinkName) && checkStock(drinkList[i].drinkName)) {
        //             drinkNames.push(drinkList[i].drinkName)
        //         }
        //         setCategory("All")
        //     }
        // } else if(pageCategory === "halloween") {
        //
        //     for (let i = 0; i < drinkList.length; i++) {
        //         if(! drinkNames.includes(drinkList[i].drinkName) && drinkList[i].holidayID === 1  && checkStock(drinkList[i].drinkName)) {
        //             drinkNames.push(drinkList[i].drinkName)
        //         }
        //         setCategory("Halloween")
        //     }
        // } else {
        //
        //     for (let i = 0; i < drinkList.length; i++) {
        //         let liquors = SetLiquorTypes([drinkList[i]])
        //
        //         liquors.forEach(item => {
        //             if((! drinkNames.includes(drinkList[i].drinkName) && item.toLowerCase().split(' ').join('-') === pageCategory  && checkStock(drinkList[i].drinkName))) {
        //                 drinkNames.push(drinkList[i].drinkName)
        //             }
        //         });
        //     }
        //     drinkList.every(item => {
        //         let curCats = SetLiquorTypes([item])
        //         curCats.forEach(liquor => {
        //             let slugged = liquor.toLowerCase().split(' ').join('-')
        //             if(slugged === pageCategory) {
        //                 pageCategory = liquor
        //                 return false
        //             }
        //         })
        //         return true
        //     });
        //     setCategory(pageCategory)
        // }
        //
        //
        // if(drinkNames.length == 0) {
        //     window.location.href = "/error"
        // }
        //
        // drinkNames.sort()

        const drinksData = await axios.get('/api/drinks/liquor/'+pageCategory);
        setCategory(pageCategory)
        console.log(drinksData.data.drinks);

        setDrinks(drinksData.data.drinks)
    }

    return(
        <section>
            <h1 className="page-header">
                {category}
            </h1>
            <ListItems
                items = {drinks}
                currentPageRoute = {window.location.pathname}
                pageClass = "category"
            />
        </section>
    )
}