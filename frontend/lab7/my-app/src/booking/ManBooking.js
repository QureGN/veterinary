import React, {useCallback, useEffect, useReducer, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import ButtonComponent from "../ButtonComponent"
import ButtonCart from "../button/buttoncart";
import {useDispatch, useSelector} from "react-redux";
import Status from "../Status";
import { FaDog } from "react-icons/fa";
import Header from "../header/header";
import {setItemInCart, setItemInPut, userprofile} from "../redux/cart/reducer1";
import ServiceItem from "../ServiceItem";
import {FaPlusCircle} from "react-icons/fa"
import Cookies from "js-cookie";
import axios from "axios";
import ManSerItem from "../Services/ManSerItem";
import ManBookItem from "./ManBookItem";




function ManSer() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [value,setValue] = useState('');
    const [order, setState] = useState([])
    const dispatch = useDispatch()
    const user = useSelector(state => state.cart.itemsUsers);
    const navigate = useNavigate();

    // Примечание: пустой массив зависимостей [] означает, что
    // этот useEffect будет запущен один раз
    // аналогично componentDidMount()
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/stocks2/?check1=0`)
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



    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <div>
                <Header  />

                <div className="cartItem">
                    {items.map(item => <ManBookItem booking = {item} key={item.pk} />
                    )}

                </div>


            </div>


        );
    }
}
export default ManSer;