import React, {useEffect, useReducer, useState} from "react";
import reducer from "./reducer";
import {increm} from "./actions";
import {Link, useParams} from "react-router-dom";
import ButtonComponent from "./ButtonComponent";
import Header from "./header/header";
import {useDispatch} from "react-redux";
import {setItemInCart} from "./redux/cart/reducer1";

function InfServ() {
    const {pk} = useParams();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [booking, setState] = useState([])

    // Примечание: пустой массив зависимостей [] означает, что
    // этот useEffect будет запущен один раз
    // аналогично componentDidMount()
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/stocks1/${pk}/`)
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
    const handleClick = (e) => {
        e.stopPropagation();
        dispatch(setItemInCart(items))
    };

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <div>
                <Header  />
                <Link to ={`/`}>Услуги </Link> / <Link to ={`/service/${items.pk}`}>{items.service} </Link>


                <ul >

                        <div>
                            <h1>{items.service}</h1>
                            <p> {items.description}</p>
                            <ButtonComponent func = {handleClick} />

                        </div>

                </ul>
            </div>

        );
    }
}
export default InfServ;