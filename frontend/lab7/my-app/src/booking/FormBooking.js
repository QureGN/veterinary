import React, {useCallback, useEffect, useReducer, useState} from "react";

import {Link, useNavigate} from "react-router-dom";
import ButtonComponent from "../ButtonComponent"
import ButtonCart from "../button/buttoncart";
import {useDispatch, useSelector} from "react-redux";
import Status from "../Status";
import { FaDog } from "react-icons/fa";
import Header from "../header/header";
import {setItemInCart} from "../redux/cart/reducer1";
import ServiceItem from "../ServiceItem";
import SortItems from "../Sort/SortItems";
import CartItem from "../cartItem";
import Cookies from "js-cookie";
import axios from "axios";


function FormBooking() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const put = useSelector(state => state.cart.itemsBooking);
    const [notes, setNote] = useState(put.note)
    const [check, setCheck] = useState(put.check1)
    const navigate = useNavigate();
    const [service, setService]=useState([])
    const [time, setTime]=useState([])

    const servlink= useCallback(() => {
            navigate('/managerservices');
        }, [navigate]
    )

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/stocks3/${put.time1}/`)
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

        fetch(`http://127.0.0.1:8000/stocks1/${put.service1}/`)
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

    const putform = () => {
        const request = {
            method: 'PUT',
            credentials:'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

                'X-CSRFToken': document.cookie
                    .split(';')
                    .filter(row => row.startsWith('csrftoken='))
                    .map(c => c.split('=')[1])[0]
            },
            body: JSON.stringify({time1: put.time1, service1: put.service1,client_user: put.client_user, check1: check, note: notes})
        }
        fetch(`http://127.0.0.1:8000/stocks2/${put.pk}/`, request);

    };


    // Примечание: пустой массив зависимостей [] означает, что
    // этот useEffect будет запущен один раз
    // аналогично componentDidMount()



    return (
        <div>
            <Header/>

            <div className='container mt-5'>
                <h1>Подтвердить</h1>
                <form>
                    {/*<CSRFToken/>*/}
                    <div className="form-group">
                        <label className='form-label'>Название услуги </label>
                        <input name ="text" className="form-control"
                               value={service.service}
                              />
                    </div>
                    <div className="form-group">
                        <label className='form-label'>Время </label>

                        <input type ="text" className="form-control"
                               value={time.time2}
                               placeholder= "description"
                               />
                    </div>
                    <div className="form-group">
                        <label className='form-label'>Подтверждение </label>

                        <input type ="number" className="form-control"
                               placeholder= "check"
                               value={check}
                               onChange ={(event) => setCheck(event.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label className='form-label'>Примечания </label>

                        <input type ="text" className="form-control"
                               value={notes}
                               onChange ={(event) => setNote(event.target.value)}/>
                    </div>

                </form>
                <button className="btn btn-primary mt-3" onClick={putform} > Подтвердить</button>

            </div>
        </div>
    );
}
export default FormBooking;