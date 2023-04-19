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
import '../css/bag.css';
import {setItemInCart} from "../redux/cart/reducer1";
import ServiceItem from "../ServiceItem";
import SortItems from "./SortItems";
import '../css/item.css'
import CartItem from "../cartItem";


function Sort() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [value,setValue] = useState('');
    const [value1,setValue1] = useState('');
    const [value2,setValue2] = useState('');
    const [order, setState] = useState([]);
    const [sort1, setSort] = useState([]);
let [click, setclick]= useState(false);

    const filterServices = items.filter(item => {
        return item.service.toLowerCase().includes(value.toLowerCase())
    })
    // Примечание: пустой массив зависимостей [] означает, что
    // этот useEffect будет запущен один раз
    // аналогично componentDidMount()
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/stocks1/?price_min=${value}`)
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


    const sort = (items) => {
        {items.map(item => <ServiceItem service = {item} key={item.pk} />)}
    };

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <div>
                <Header  />

                <form>
                    <div className="form-group">
                        <label className='form-label'>Min: </label>
                        <input type ="number" className="form-control"
                               placeholder= "Введите min "
                               onChange ={(event) => setValue(event.target.value)}/>
                    </div>

                    <div className="form-group">
                        <label className='form-label'>Max: </label>
                        <input type ="number" className="form-control"
                               placeholder= "Введите max "
                               onChange ={(event) => setValue1(event.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label className='form-label'>Название: </label>
                        <input type ="text" className="form-control"
                               placeholder= "Введите название "
                               onChange ={(event) => setValue2(event.target.value)}/>

                    </div>
                </form>



                <button className="btn btn-primary mt-3 button" onClick ={() => setclick(click = !click)}> Найти </button>

                {click && (
                        <div className='cartItem'>
                            <SortItems min ={value} max ={value1} title ={value2}/>

                        </div>
               )}

                {!click && (
                    <div className='cartItem' >
                        <SortItems min ={value} max ={value1} title ={value2}/>

                    </div>
                )}

            </div>


        );
    }
}
export default Sort;