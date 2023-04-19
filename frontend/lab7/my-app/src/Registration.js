import React, {useCallback, useEffect, useState} from "react";
import Cookies from 'js-cookie'
import Header from "./header/header";
import {useSelector} from "react-redux";
import OrderItem from "./Bag/OrderItem";
import CartItem from "./cartItem";
import {Link, useNavigate} from "react-router-dom";
import {checkAuthenticated} from "./checkAuthenticated";
import {Setauther, Setpk, Setusername} from "./redux/cart/reducer1";
import axios from "axios";

export function Registration(){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItems] = useState([]);
    const [username1, setUsername] = useState('');
    const [password1, setPassword] = useState('')
    const [booktime, setTime] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        checkAuthenticated();
    },[]);

    const authLinks= useCallback(() => {
            navigate('/login');
        }, [navigate]
    )

    async function booking(){
        const request = {
            // method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            // body: JSON.stringify({username: username1, password: password1})
        }
        const body= JSON.stringify({username: username1, password: password1})
        const res = await axios.post(`http://127.0.0.1:8000/api/register/`,body, request)
         // fetch("http://127.0.0.1:8000/api/register/", request);
        if (res.data.success){
            console.log(res.data.success)
            authLinks()

        }
    };


    return (
        <div >

            <Header/>
            <div className='container mt-5'>
                <h1>Регистрация</h1>
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
                <button className="btn btn-primary mt-3" onClick={booking} > Зарегистрироваться</button>

                <p className='mt-3'>
                    Вы зарегистрированы? <Link to='/login'> Войти</Link>
                </p>
            </div>
        </div>
    );
}

export default Registration;