import React, {useEffect, useReducer, useState} from "react";
import reducer from "../reducer";
import {increm} from "../actions";
import { Link } from "react-router-dom";
import ButtonComponent from "../ButtonComponent"
import ButtonCart from "../button/buttoncart";
import {useDispatch} from "react-redux";
import Status from "../Status";
import { FaDog } from "react-icons/fa";
import Header from "../header/header";
import '../css/item.css';
import '../css/bag.css';

import {setItemInCart} from "../redux/cart/reducer1";
import ServiceItem from "../ServiceItem";


function SortItems(props) {
    const {min, max, title} = props;
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [value,setValue] = useState('');
    const [order, setState] = useState([]);
    const [sort1, setSort] = useState([]);


    const filterServices = items.filter(item => {
        return item.service.toLowerCase().includes(value.toLowerCase())
    })
    // Примечание: пустой массив зависимостей [] означает, что
    // этот useEffect будет запущен один раз
    // аналогично componentDidMount()
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/stocks1/?price_min=${min}&price_max=${max}&service=${title}`)
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

    const dispatch = useDispatch();
    const handleClick = (item) => {

        dispatch(setItemInCart(item));


    };

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <div >
                {items.map(item => (
                    <div className="card" key={item.pk}>
                        <p>
                            <Link to ={`/service/${item.pk}`}>{item.service} </Link>
                        </p>
                        <p> {item.price}</p>
                        <div>


                        </div>

                    </div>
                ))}

            </div>


        );
    }
}
export default SortItems;