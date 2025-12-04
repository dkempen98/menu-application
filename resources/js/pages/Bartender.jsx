import axios from "axios";
import {useEffect, useState} from "react";

export default function Bartender() {
    const [orders, setOrders] = useState([])

    async function getOrders() {
        let orderFetch = await axios.get('/api/orders')
        console.log(orderFetch?.data?.orders);
        setOrders(orderFetch.data.orders);
    }
    useEffect(() => {
        getOrders()
        }, [])


    return (
        <div>
            {orders.map((order) => {
                return (
                    <div className="order-item">
                        <div className="order-item-header">
                            <div className="order-item-drink">{order.orderable_name}</div> for
                            <div className="order-item-name">{order.name}</div>
                            --
                        </div>
                    </div>
                )
            })}
        </div>
    )
}