import React, {Fragment, useCallback, useEffect, useReducer, useState} from "react";

import {Link, NavLink} from "react-router-dom";
import {FaDog} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import CartItem from "../cartItem";

import Cookies from "js-cookie";
import axios from "axios";
import {Setauthernone} from "../redux/cart/reducer1";

export default function Managerheader(props){
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
        outlinks();
    }
    const handleClick = useCallback(() => {
        cartOpen = false;
        navigate('/order');
    }, [navigate]);


    const authLinks =(
        <Fragment>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/managerservices">Редактировать список услуг</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/managerbooking">Посмотреть записи</Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link active" onClick={logout} href='#'>Выйти</a>
                </li>



            </ul>

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
