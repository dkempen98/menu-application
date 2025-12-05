import React, { useEffect, useState } from "react";
import IngredientList from "../components/IngredientList.jsx";
import drinkList from "../data/Recipe.json"
import axios from "axios";

export default function Drink(
    {
        bartenderMode = false,
        passedDrink = null,
        orderers = [],
    })
{
    const [drink, setDrink] = useState('')
    const [description, setDescription] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [amounts, setAmounts] = useState([])
    const [customer, setCustomer] = useState('')

    useEffect(() => {
        init()
    }, [])

    function init() {
        let drinkName = passedDrink ?? window.location.pathname.split('/').pop()
        let drinkTemp = drinkName;
        let drinkPath = drinkName;
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

        if(drinkTemp === drinkName) {
            window.location.href = "/error"
        }

        setDrink(drinkTemp)
        setDescription(descTemp)
        setIngredients(ingredTemp)
        setAmounts(amountsTemp)
    }

    function displayTime(timeString) {
        let displayDate = new Date(timeString)
        let today = new Date();
        let display = displayDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        if(displayDate.getDate() !== today.getDate()) {
            display += " - " + displayDate.toLocaleDateString();
        }
        return display;
    }

    function replaceImg() {
        document.getElementById("drinkImg").src = "/images/generic-drink.jpg"

    }

    function handleCustomerChange(e) {
        setCustomer(e.target.value);
    }

    function orderDrink() {
        axios.post('/api/orders', {
            drink_name: drink,
            quantity: 1,
            name: customer,
        })
        setCustomer('');
    }

    return(
        <section>
            <article className="drink-image-container">
            <h1 className="page-header">
                {drink}
            </h1>
                {!bartenderMode && (
                    <img className='drink-image' id="drinkImg" src={"/images/" + (passedDrink ?? window.location.pathname.split('/').pop()) + ".jpg"} onError={() => replaceImg()}/>
                )}
                <span className="gradient-bottom-border-l"/>
                <p className="drink-desc">
                    {description}
                </p>
                <span className="gradient-bottom-border-r"/>
                <IngredientList
                ingredients={ingredients}
                amounts={amounts}
                />
                <span className="gradient-bottom-border-l"/>
                {!bartenderMode && (
                    <div className="order-container">
                        <input
                            type="text"
                            placeholder="Add a Name To Order"
                            name="name"
                            className="order-input"
                            onChange={handleCustomerChange}
                            value={customer}
                        />
                        <button
                            disabled={!customer}
                            className={"order-button" + (customer ? "" : " disabled")}
                            onClick={() => orderDrink()}
                        >
                            Order
                        </button>
                    </div>
                )}
                {orderers.length > 0 && (
                    <div className="orderer-container">
                        {orderers.map((orderer) => {
                            return (
                                <div>{orderer.name} @ {displayTime(orderer.created_at)}</div>
                            )
                        })}
                    </div>
                )}
            </article>
        </section>
    )
}