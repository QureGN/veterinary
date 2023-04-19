import React, {useCallback, useEffect, useState} from "react";

import Header from "../header/header";
import {useSelector} from "react-redux";

import {Link, useNavigate} from "react-router-dom";
import ItemBooking from "./ItemBooking";
import '../css/item.css'



export function Validate(){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [booktime, setTime] = useState([])
    const user = useSelector(state => state.cart.itemsUsers);
    const [check, setCheck]=useState('')
    const navigate = useNavigate();
    let [cartOpen, setCartOpen] = useState(false);


    useEffect(() => {
        fetch(`http://127.0.0.1:8000/stocks2/?client_user=${user.pk}&check1=1`)
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


    return (
        <div >
            <div>
                <Header />

            </div>

            <div className='cartItem'>
                {items.map(item => <ItemBooking service = {item} key={item.pk} />)}
            </div>


        </div>
    );
}

export default Validate;