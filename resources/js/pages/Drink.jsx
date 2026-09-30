import React, { useEffect, useState } from "react";
import IngredientList from "../components/IngredientList.jsx";
import drinkList from "../data/Recipe.json"
import axios from "axios";

export default function Drink(
    {
        bartenderMode = false,
        passedDrink = null,
        orderers = [],
        refreshFunction = ()=> {},
    })
{
    const [drink, setDrink] = useState('')
    const [description, setDescription] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [amounts, setAmounts] = useState([])
    const [customer, setCustomer] = useState('')
    const [localOrderers, setLocalOrderers] = useState([])
    const [batchMode, setBatchMode] = useState(false);

    useEffect(() => {
        init()
    }, [])

    useEffect(() => {
        if(orderers.length === 0) return;
        setLocalOrderers(orderers.map(o => ({ ...o, completed: true })));
    }, [orderers]);

    useEffect(() => {
        init()
    }, [localOrderers]);


    function init() {
        let drinkName = passedDrink ?? window.location.pathname.split('/').pop()
        let drinkTemp = drinkName;
        let drinkPath = drinkName;
        let descTemp = ""
        let ingredTemp = []
        let amountsTemp = []
        let amountMultiplier = 1;
            drinkList.forEach(item => {
            let curDrink = item.drinkName
            curDrink = curDrink.toLowerCase().split(' ').join('-')
            if(curDrink === drinkPath) {
                if(batchMode !== item.multiply_ingredients) {
                    setBatchMode(!!item.multiply_ingredients);
                }
                if(bartenderMode && item.multiply_ingredients) {
                    amountMultiplier = localOrderers?.filter(orderer => orderer?.completed).length;
                    amountMultiplier = amountMultiplier > 0 ? amountMultiplier : 1;
                }
                drinkTemp = item.drinkName
                descTemp = item.description
                ingredTemp.push(item.ingredient)
                amountsTemp.push((item.ingredientAmount * amountMultiplier) + " " + item.unitOfMeasure)
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

    function toggleOrdererComplete(id) {
        setLocalOrderers(prev =>
            prev.map(orderer =>
                orderer.id === id
                    ? { ...orderer, completed: !orderer.completed }
                    : orderer
            )
        );
        init();
    }

    async function completeOrder() {
        let completedOrderers = localOrderers.filter(orderer => orderer.completed)
        let orderIds = completedOrderers.map(orderer => orderer.id)
        await axios.put("/api/complete-orders", {
            orderIds: orderIds
        })
        await refreshFunction();
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
                    bartenderMode={bartenderMode}
                    batch={ (bartenderMode && batchMode && localOrderers.length > 1 && localOrderers?.filter(orderer => orderer?.completed).length > 1) ? localOrderers?.filter(orderer => orderer?.completed).length : 1 }
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
                {localOrderers.length > 0 && bartenderMode && (
                    <div>
                        <div className="orderer-container">
                            {localOrderers.map((orderer) => {
                                return (
                                    <label key={orderer.id} className="orderer-item clickable">
                                        <input
                                            name="orderer"
                                            type="checkbox"
                                            checked={orderer.completed}
                                            onChange={() => toggleOrdererComplete(orderer.id)}
                                            className="clickable"
                                        />
                                        <span>
                                            {orderer.name} @ {displayTime(orderer.created_at)}
                                        </span>
                                    </label>

                                )
                            })}
                        </div>
                        <button
                            className="order-submit-button"
                            onClick={() => completeOrder()}
                        >
                            Complete Order
                        </button>
                    </div>
                )}
            </article>
        </section>
    )
}