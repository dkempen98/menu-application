import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import IngredientList from "../components/IngredientList";
import drinkList from "../data/RecipeSample.json"

export default function Drink() {
    const [drink, setDrink] = useState()
    const [description, setDescription] = useState()
    const [ingredients, setIngredients] = useState()
    const [imageLink, setImageLink] = useState("/images/" + window.location.pathname.split('/').pop() + ".jpg")

    useEffect(() => {
        init()
    }, [])

    function init() {
        let drinkTemp = window.location.pathname.split('/').pop()
        let drinkPath = window.location.pathname.split('/').pop()
        let descTemp = ""
        let ingredTemp = []
        let amountsTemp = []
        drinkList.forEach(item => {
            let curDrink = item.drinkName
            curDrink = curDrink.toLowerCase().split(' ').join('-')
            if(curDrink === drinkPath) {
                drinkTemp = item.drinkName
                descTemp = item.description
                ingredTemp.push(item.ingredientAmount + " " + item.unitOfMeasure + " " + item.ingredient)
            }
        });

        if(drinkTemp === window.location.pathname.split('/').pop()) {
            window.location.href = "/error"
        }

        setDrink(drinkTemp)
        setDescription(descTemp)
        setIngredients(ingredTemp)
    }

    function replaceImg() {
        document.getElementById("drinkImg").src = "/images/generic-drink.jpg"

    }

    return(
        <section>
            <article className="drink-image-container">
            <h1 className="page-header">
                {drink}
            </h1>
                <img className='drink-image' id="drinkImg" src={"/images/" + window.location.pathname.split('/').pop() + ".jpg"} onError={() => replaceImg()}/>
                <span className="gradient-bottom-border-l"/>
                <p className="drink-desc">
                    {description}
                </p>
                <span className="gradient-bottom-border-r"/>
                <IngredientList
                ingredients={ingredients}
                />
            </article>
            <BackButton/>
        </section>
    )
}