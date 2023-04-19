import React, {useEffect, useReducer, useState} from "react";
import reducer from "./reducer";
import {increm} from "./actions";
import { Link } from "react-router-dom";
import ButtonComponent from "./ButtonComponent"
import ButtonCart from "./button/buttoncart";
import {useDispatch, useSelector} from "react-redux";
import Status from "./Status";
import { FaDog } from "react-icons/fa";
import Header from "./header/header";
import './css/bag.css';
import {setItemInCart, userprofile} from "./redux/cart/reducer1";
import ServiceItem from "./ServiceItem";
import Cookies from "js-cookie";
import axios from "axios";



function MyComponent() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [value,setValue] = useState('');
    const [order, setState] = useState([])
    const dispatch = useDispatch()
    const user = useSelector(state => state.cart.itemsUsers);

    // Примечание: пустой массив зависимостей [] означает, что
    // этот useEffect будет запущен один раз
    // аналогично componentDidMount()
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/stocks1/?price_min=`)
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
        dispatch(userprofile(user.pk))
    }, [])


    async function checkAuthenticated (){
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            }
        };

        const res = await axios.get(`http://127.0.0.1:8000/authenticated`, config)
        console.log(res.data)

        // dispatch((Setauther(true)))

    }

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <div>
                   <Header  />
            <div className='cartItem'>
                {items.map(item => <ServiceItem service = {item} key={item.pk} />)}
            </div>

            </div>


        );
    }
}
export default MyComponent;