import React, {Fragment, useCallback, useEffect, useReducer, useState} from "react";
import {increm} from "../actions";
import {Link, NavLink} from "react-router-dom";
import Order from "../Bag"
import MyComponent from "../HomePage";
import {FaDog} from "react-icons/fa";
import Status from "../Status";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import CartItem from "../cartItem";
import {Setauther, Setauthernone, setItemInCart, Setusername} from "../redux/cart/reducer1";
import Cookies from "js-cookie";
import '../css/item.css'
import {checkAuthenticated} from "../checkAuthenticated";
import axios from "axios";

export default function Userheader(props){
    const items = useSelector(state => state.cart.itemsInCart);
    const users = useSelector(state => state.cart.itemsUsers);
    const totalPrice = items.reduce((acc, service ) => acc += service.price, 0);
    let [cartOpen, setCartOpen] = useState(false);
    const navigate = useNavigate();


    async function checklogout() {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        };

        const res = await axios.post(`http://127.0.0.1:8000/logout`, config)
        console.log(res.data)
    }

    const booking = () => {
        const request = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
        }
        fetch("http://127.0.0.1:8000/logout", request);

    };

    const outlinks = useCallback(() => {
        cartOpen = false;
        navigate('/login');
    }, [navigate]);


    const dispatch = useDispatch();
    const logout =()=>{

        dispatch(Setauthernone(false));
        checklogout();
        outlinks()
    }
    const handleClick = useCallback(() => {
        cartOpen = false;
        navigate('/order');
    }, [navigate]);



    const authLinks =(
        <Fragment>
            <li className="nav-item">
                <a className="nav-link active" onClick={logout} href='#'>Выйти</a>
            </li>

            <li className="nav-item">
                <Link className="nav-link active" to ='/bookingpage'>Личный кабинет</Link>
            </li>
            <FaDog onClick ={() => setCartOpen(cartOpen = !cartOpen)} className = 'booking'/>
            {cartOpen && (
                <div className= "book-card">
                    <div>
                        {
                            items.length >0 ? items.map( service => <CartItem key={ service.service}
                                                                              price ={ service.price}
                                                                              title={service.service}
                                                                              id = {service.pk}/>)
                                : 'Корзина пуста'
                        }
                    </div>
                    <div>
                        {
                            items.length > 0 ?
                                <div>
                                    <span>Итого:</span>
                                    <span>{totalPrice} руб.</span>

                                    <button onClick={handleClick}> Оформить </button>
                                </div>
                                :null
                        }
                    </div>

                </div>
            )}
            <span className = 'booking'>{totalPrice} руб.</span>

        </Fragment>
    )

    const guestLinks =(
        <Fragment>
            <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/login">Войти</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to='/register'>Регистрация</Link>
            </li>

        </Fragment>
    )




    return(
        <header>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">

                    <div className="collapse navbar-collapse" id="navbarNav">

                        {users.isAuthenticated ? authLinks : guestLinks}
                    </div>
                </div>
            </nav>

        </header>
    )
}
