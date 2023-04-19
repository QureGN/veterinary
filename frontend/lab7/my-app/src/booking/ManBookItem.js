import React, {useCallback, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import ButtonCart from "../button/buttoncart";
import {useDispatch, useSelector} from "react-redux";
import {deleteItemFromCart, setItemInCart, setItemInPut, Settime, Setpk1, Setservice} from "../redux/cart/reducer1";
import ButtonComponent from "../ButtonComponent";
import axios from "axios";
import ButtonPut from "../button1/buttonput";
import "../css/item.css"

export function ManBookItem(props){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const {booking} = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [timing, setTime] = useState([]);
    const [service2, setService] = useState([]);


    const handlePress = () => {
        const request = {
            method: 'DELETE',
            credentials:'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

                'X-CSRFToken': document.cookie
                    .split(';')
                    .filter(row => row.startsWith('csrftoken='))
                    .map(c => c.split('=')[1])[0]
            },
        }
        fetch(`http://127.0.0.1:8000/stocks2/${booking.pk}/`, request);

    };

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/stocks3/${booking.time1}/`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setTime(result);
                },
                // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                // чтобы не перехватывать исключения из ошибок в самих компонентах.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )

        fetch(`http://127.0.0.1:8000/stocks1/${booking.service1}/`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setService(result);
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
        <div>
            <div className="card">

                <h3>Услуга: {service2.service}</h3>
                <h4>Время: {timing.time2}</h4>
                <h5>Подтверждение: {booking.check1}</h5>
                {/*<Manbookingservice booking={booking}/>*/}

                {/*<button className="btn btn-primary"> Изменить</button>*/}
                <ButtonPut sign={booking}/>

            </div>
        </div>)
}

export default ManBookItem;