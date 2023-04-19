import React, {useCallback, useEffect, useState} from "react";
import Cookies from 'js-cookie'
import Header from "./header/header";
import {useDispatch, useSelector} from "react-redux";
import OrderItem from "./Bag/OrderItem";
import CartItem from "./cartItem";
import {Link, useNavigate} from "react-router-dom";

import {setItemInCart, Setauther, Setauthernone, Setusername, Setpk, SetisStaff} from "./redux/cart/reducer1";

import axios from "axios";

export function Auth(){
    const [error, setError] = useState(null);
    const users = useSelector(state => state.cart.itemsUsers);
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItems] = useState([]);
    const [username1, setUsername] = useState('');
    const [password1, setPassword] = useState('')
    const [booktime, setTime] = useState([])
    const navigate = useNavigate();

    async function checkAuthenticated (){
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            }
        };

        const res = await axios.get(`http://127.0.0.1:8000/authenticated`, config)
        console.log(res.data)

        // dispatch((Setauther(true)))

    }
    async function checkuser() {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            }
        };
        const res = await axios.get(`http://127.0.0.1:8000/profile`, config)
        console.log(res)
    }

    const authLinks= useCallback(() => {
            navigate('/');
        }, [navigate]
    )

    async function checklogin() {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),

            }
        };
        const body = JSON.stringify({username: username1, password: password1})

        const res = await axios.post(`http://127.0.0.1:8000/login`,body, config)

        if (res.data.success){
            console.log(res.data.success)
            dispatch(Setauther(true))
            dispatch(Setusername(res.data.username))
            dispatch(Setpk(res.data.pk))
            authLinks()
            // Cookies.set('name', 'value')
            var cookies = document.cookie;

            console.log(cookies)


        }
        else{
            console.log(res.data.error)
            dispatch(Setauther(false))
            dispatch(Setusername(''))

        }


    }


    // const booking = () => {
    //     const request = {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //             'X-CSRFToken': Cookies.get('csrftoken'),
    //         },
    //         body: JSON.stringify({username: username1, password: password1})
    //     }
    //     fetch("http://127.0.0.1:8000/login", request);
    //
    // };

    const dispatch = useDispatch();
    const handleClick = () => {

        // dispatch(Setusername(username1));
        // dispatch(Setauther(true));
        //booking()
        checklogin()


    };


    return (
        <div >

            <Header/>
            <div className='container mt-5'>
                <h1>Войти в аккаунт</h1>
                <form>
                    {/*<CSRFToken/>*/}
                    <div className="form-group">
                        <label className='form-label'>Username: </label>
                        <input type ="text" className="form-control"
                               placeholder= "username"
                               onChange ={(event) => setUsername(event.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label className='form-label'>Password: </label>

                        <input type ="password" className="form-control"
                               placeholder= "password"
                               onChange ={(event) => setPassword(event.target.value)}/>
                    </div>

                </form>
                <button className="btn btn-primary mt-3" onClick={handleClick} > войти</button>


                <p className='mt-6'>
                    Вы не зарегистрированы? <Link to='/register'> Зарегистрироваться</Link>
                </p>

            </div>

        </div>
    );
}

export default Auth;