import React, { useEffect, useState } from "react";
import IngredientList from "../components/IngredientList";
import drinkList from "../data/Recipe.json"
import axios from "axios";

export default function Drink() {
    const [drink, setDrink] = useState()
    const [description, setDescription] = useState()
    const [ingredients, setIngredients] = useState()
    const [amounts, setAmounts] = useState()
    const [customer, setCustomer] = useState()

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
                ingredTemp.push(item.ingredient)
                amountsTemp.push(item.ingredientAmount + " " + item.unitOfMeasure)
            }
        });

        if(drinkTemp === window.location.pathname.split('/').pop()) {
            window.location.href = "/error"
        }

        setDrink(drinkTemp)
        setDescription(descTemp)
        setIngredients(ingredTemp)
        setAmounts(amountsTemp)
    }

    function replaceImg() {
        document.getElementById("drinkImg").src = "/images/generic-drink.jpg"

    }

    function handleCustomerChange(e) {
        setCustomer(e.target.value);
    }

    function orderDrink() {
        console.log(drink);
        // axios.post('http://localhost:8000/api/orders', {
        //     drink_name: drink,
        //     quantity: 1,
        //     name: customer,
        // })
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
                amounts={amounts}
                />
            </article>
            <input type="text" placeholder="Name" onChange={handleCustomerChange} value={customer}>
            </input>
            <button onClick={() => orderDrink()}>
                Order
            </button>
        </section>
    )
}