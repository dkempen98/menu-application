import axios from "axios";
import {useEffect, useState} from "react";
import Drink from "./Drink.jsx";

export default function Bartender() {
    const [orders, setOrders] = useState([])

    async function getOrders() {
        let orderFetch = await axios.get('/api/orders')
        setOrders(orderFetch.data.orders);
    }
    useEffect(() => {
        getOrders()
        }, [])


    return (
        <div>
            {orders.map((order) => {
                return (
                    <div className="order-item" key={order.orderable_name + "-bartender-view"}>
                        <Drink
                            bartenderMode={true}
                            passedDrink={order.orderable_name.toLowerCase().split(' ').join('-')}
                            orderers={order.people}
                        />
                    </div>
                )
            })}
        </div>
    )
}