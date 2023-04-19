import React, {useEffect, useReducer, useState} from "react";

import { Link } from "react-router-dom";
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


function FormAdd() {
    const put = useSelector(state => state.cart.itemsInPut);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [value, setValue] = useState('');
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [order, setState] = useState([]);
    const [sort1, setSort] = useState([]);
    let [click, setclick] = useState(false);
    const [service1, setService] = useState(put.service);
    const [description1, setDescr] = useState(put.description)
    const [price1, setPrice] = useState(put.price)


    const putform = () => {
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
            body: JSON.stringify({service: service1, description: description1, price:price1})
        }
        fetch(`http://127.0.0.1:8000/stocks1/`, request);
    };


    // Примечание: пустой массив зависимостей [] означает, что
    // этот useEffect будет запущен один раз
    // аналогично componentDidMount()



    return (
        <div>
            <Header/>

            <div className='container mt-5'>
                <h1>Добавить услугу</h1>
                <form>
                    {/*<CSRFToken/>*/}
                    <div className="form-group">
                        <label className='form-label'>Название услуги </label>
                        <input name ="text" className="form-control"
                               placeholder='Услуга'
                               onChange ={(event) => setService(event.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label className='form-label'>Описание </label>

                        <input type ="text" className="form-control"
                               placeholder= "Описание"
                               onChange ={(event) => setDescr(event.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label className='form-label'>Цена </label>

                        <input type ="number" className="form-control"
                               placeholder= "цена"
                               onChange ={(event) => setPrice(event.target.value)}/>
                    </div>

                </form>
                <button className="btn btn-primary mt-3" onClick={putform} > Добавить</button>

            </div>
        </div>
    );
}
export default FormAdd;