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
    const [drinkDetails, setDrinkDetails] = useState(null)
    const [description, setDescription] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [amounts, setAmounts] = useState([])
    const [customer, setCustomer] = useState(localStorage.getItem("name"))
    const [localOrderers, setLocalOrderers] = useState([])
    const [batchMode, setBatchMode] = useState(false);
    const [ordered, setOrdered] = useState(false);
    const [flOzs, setFlOzs] = useState(0);

    useEffect(() => {
        let drinkName = passedDrink ?? window.location.pathname.split('/').pop()
        axios.get('/api/drinks/' + drinkName + '/details').then(res => {
            setDrinkDetails(res.data.drink)
            setBatchMode(!!res.data.drink.group_on_orders)
        })
    }, [])

    useEffect(() => {
        if(orderers.length === 0) return;
        setLocalOrderers(prev => orderers.map(o => {
            const existing = prev.find(p => p.id === o.id)
            return { ...o, completed: existing ? existing.completed : true }
        }));
    }, [orderers]);

    useEffect(() => {
        init()
    }, [localOrderers, batchMode, drinkDetails]);


    async function init() {
        let drinkName = passedDrink ?? window.location.pathname.split('/').pop()
        let drinkTemp = "";
        let descTemp = ""
        let ingredTemp = []
        let amountsTemp = []
        let amountMultiplier = 1;
        let useMultiplyDrinks = batchMode;
        let flOzTotal = 0;

        // const drinkData = await axios.get('/api/drinks/'+drinkName+'/details');
        // let drink = drinkData.data.drink;

        if(bartenderMode && useMultiplyDrinks) {
            amountMultiplier = localOrderers?.filter(orderer => orderer?.completed).length;
            amountMultiplier = amountMultiplier > 0 ? amountMultiplier : 1;
        }

        drinkTemp = drinkDetails.name
        descTemp = drinkDetails.description

        drinkDetails.recipes?.forEach((ingredient) => {
            if(ingredient.unit_name === "fl oz") {
                flOzTotal += ingredient.amount * amountMultiplier;
            }
            ingredTemp.push(ingredient.ingredient_name)
            amountsTemp.push((ingredient.amount * amountMultiplier) + " " + (ingredient.unit_name === "Count" ? '' : ingredient.unit_name))
        })


        // drinkList.forEach(item => {
        //     let curDrink = item.drinkName
        //     curDrink = curDrink.toLowerCase().split(' ').join('-')
        //     if(curDrink === drinkPath) {
        //         if(bartenderMode && useMultiplyDrinks) {
        //             amountMultiplier = localOrderers?.filter(orderer => orderer?.completed).length;
        //             amountMultiplier = amountMultiplier > 0 ? amountMultiplier : 1;
        //         }
        //         if(item.unitOfMeasure === "fl oz") {
        //             flOzTotal += item.ingredientAmount * amountMultiplier;
        //         }
        //         drinkTemp = item.drinkName
        //         descTemp = item.description
        //         ingredTemp.push(item.ingredient)
        //         amountsTemp.push((item.ingredientAmount * amountMultiplier) + " " + item.unitOfMeasure)
        //     }
        // });

        if(drinkTemp === drinkName) {
            window.location.href = "/error"
        }

        setDrink(drinkTemp)
        setDescription(descTemp)
        setIngredients(ingredTemp)
        setAmounts(amountsTemp)
        setFlOzs(flOzTotal)
    }

    function toggleOrdererComplete(id) {
        setLocalOrderers(prev =>
            prev.map(orderer =>
                orderer.id === id
                    ? { ...orderer, completed: !orderer.completed }
                    : orderer
            )
        );
        // init();
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
        let storedName = localStorage.getItem("name")
        if(storedName !== customer) {
            localStorage.setItem("name", customer);
        }
        axios.post('/api/orders', {
            orderable_name: drink,
            quantity: 1,
            name: customer,
        })
        setCustomer('');
        setOrdered(true);
    }

    return(
        <section>
            <article className="drink-image-container">
            <h1 className="page-header">
                {drink}
            </h1>
                {bartenderMode && localOrderers?.length > 1 && (
                    <button
                        onClick={() => setBatchMode(!batchMode)}
                        className="toggle-button"
                    >
                        {batchMode ? "Unbatch" : "Batch"}
                    </button>
                )}
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
                    flOzs={flOzs}
                />
                <span className="gradient-bottom-border-l"/>
                {!bartenderMode && (
                    <div className="order-container">
                        <input
                            type="text"
                            placeholder={ordered ? 'Your order has been placed!' : 'Add a Name for the Order'}
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