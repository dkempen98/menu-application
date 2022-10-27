import React, { useEffect, useState } from "react";
import ListItems from "../components/ListItems";
import SetLiquorTypes from "../components/SetLiquorTypes";
import drinkList from "../data/RecipeSample.json"

export default function DrinkCategory() {
    const [drinks, setDrinks] = useState()
    const [category, setCategory] = useState()

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
                setCategory("All")
            }
        } else if(pageCategory === "halloween") {

            for (let i = 0; i < drinkList.length; i++) {
                if(! drinkNames.includes(drinkList[i].drinkName) && drinkList[i].holidayID === 1) {
                    drinkNames.push(drinkList[i].drinkName)
                }
                setCategory("Halloween")
            }
        } else {

            for (let i = 0; i < drinkList.length; i++) {
                let liquors = SetLiquorTypes([drinkList[i]])

                liquors.forEach(item => {
                    if((! drinkNames.includes(drinkList[i].drinkName) && item.toLowerCase().split(' ').join('-') === pageCategory)) {
                        drinkNames.push(drinkList[i].drinkName)
                    }
                });
            }
            drinkList.every(item => {
                let curCats = SetLiquorTypes([item])
                curCats.forEach(liquor => {
                    let slugged = liquor.toLowerCase().split(' ').join('-')
                    if(slugged === pageCategory) {
                        pageCategory = liquor
                        return false
                    }
                })
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