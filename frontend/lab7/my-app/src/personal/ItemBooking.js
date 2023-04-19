import React, {useEffect, useReducer, useState} from "react";
import reducer from "../reducer";
import {increm} from "../actions";
import {Link, useParams} from "react-router-dom";
import ButtonComponent from "../ButtonComponent";
import Header from "../header/header";
import {useDispatch} from "react-redux";
import {setItemInCart} from "../redux/cart/reducer1";
import Timingservice from "./timingservice";
import "../css/item.css"
import {FaTrash} from "react-icons/fa";

function ItemBooking(props) {
    const {service} = props;
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [timing, setTime] = useState([]);
    const [service1, setService] = useState([]);

    // Примечание: пустой массив зависимостей [] означает, что
    // этот useEffect будет запущен один раз
    // аналогично componentDidMount()
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/stocks2/${service.pk}/`)
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


    const remove = ()=>{

        const request = {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

                'X-CSRFToken': document.cookie
                    .split(';')
                    .filter(row => row.startsWith('csrftoken='))
                    .map(c => c.split('=')[1])[0]
            },
        }
        fetch(`http://127.0.0.1:8000/stocks2/${service.pk}/`, request)
            .then(response => {
                setItems(response)
            })
    }




    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <div>

                <ul >

                    <div className="card">

                        <Timingservice items={ items}/>
                        <h1>{items.note}</h1>
                        <FaTrash className='icon' size={30} onClick={remove}>Удалить</FaTrash>
                    </div>

                </ul>
            </div>

        );
    }
}
export default ItemBooking;