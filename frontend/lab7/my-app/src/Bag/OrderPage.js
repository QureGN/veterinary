import React, {useEffect, useState} from "react";

import Header from "../header/header";
import {useDispatch, useSelector} from "react-redux";
import OrderItem from "./OrderItem";
import CartItem from "../cartItem";
import {Link} from "react-router-dom";
import {resetCart} from "../redux/cart/reducer1";
export function OrderPage(){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItems] = useState([]);
    const [booktime, setTime] = useState([])
    const dispatch=useDispatch();


    let [cartOpen, setCartOpen] = useState(false);

    const items = useSelector(state => state.cart.itemsInCart);
    const user = useSelector(state => state.cart.itemsUsers);
    const totalPrice = items.reduce((acc, service ) => acc += service.price, 0);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/stocks3/")
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

    const booking = (items) => {
        const request = {
            method: 'POST',
            credentials:'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

                'X-CSRFToken': document.cookie
                    .split(';')
                    .filter(row => row.startsWith('csrftoken='))
                    .map(c => c.split('=')[1])[0]
            },
            body: JSON.stringify({time1: booktime.pk,
                service1: items.pk,
                client_user: user.pk,
                check1: 0,
                note: "Запись не подтверждена"
            })
        }
        fetch("http://127.0.0.1:8000/stocks2/", request);
        dispatch(resetCart());
    };

    const handleClick = (items)=>{
        items.map(ser => booking(ser));
    }


    return (
        <div >
            <div>
                <Header />
            </div>

            <div>
                {items.map( item => <OrderItem key={ item.pk} service={item}/>)}
            </div>
            <h1>Итого сумма:{totalPrice}</h1>
            <button className="btn btn-primary" onClick ={() => setCartOpen(cartOpen = !cartOpen)}  >Выбрать время</button>


            {cartOpen && (<div className= "book-card">
                {item.map(item => (
                    <div key={item.pk}>
                        <button onClick={() => setTime(item)}>{item.time2} </button>


                    </div>
                ))}
            </div>)
            }

            <div><button className="btn btn-primary"  onClick={()=>{handleClick(items)}} >Записаться на: {booktime.time2}  </button></div>
            <Link to ={`/bookingpage`}>Посмотреть записанные услуги </Link>



        </div>
    );
}

export default OrderPage;