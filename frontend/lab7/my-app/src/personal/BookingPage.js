import React, {useCallback, useEffect, useState} from "react";

import Header from "../header/header";
import {useSelector} from "react-redux";
import OrderItem from "../Bag/OrderItem";
import CartItem from "../cartItem";
import {Link, useNavigate} from "react-router-dom";
import ItemBooking from "./ItemBooking";
import ServiceItem from "../ServiceItem";
import "../css/item.css"

export function BookingPage(){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [booktime, setTime] = useState([])
    const user = useSelector(state => state.cart.itemsUsers);
    const [check, setCheck]=useState('')
    const navigate = useNavigate();
    let [cartOpen, setCartOpen] = useState(false);


    useEffect(() => {
        fetch(`http://127.0.0.1:8000/stocks2/?client_user=${user.pk}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                // чтобы не перехватывать исключения из ошибок в самих компонентах.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])


        const validate = useCallback(() => {
            cartOpen = false;
            navigate('/validate');
        }, [navigate]);

    const notvalidate = useCallback(() => {
        cartOpen = false;
        navigate('/notvalidate');
    }, [navigate]);



    return (
        <div >
            <div>
                <Header />

            </div>
            <div className='but'>
                <div>
                    <button className="btn btn-primary" onClick={validate}> Показать подтвержденные записи</button>
                </div>
                <div>
                    <button className="btn btn-primary" onClick={notvalidate} > Показать неподтвержденные записи</button>
                </div>

            </div>




        </div>
    );
}

export default BookingPage;