import React, {useEffect, useState} from "react";

import Header from "./header/header";
import {useSelector} from "react-redux";
import OrderItem from "./Bag/OrderItem";
import CartItem from "./cartItem";
import {Link} from "react-router-dom";
export function Registration(){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItems] = useState([]);
    const [username1, setUsername] = useState();
    const [password1, setPassword] = useState()
    const [booktime, setTime] = useState([])



    const booking = () => {
        const request = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: username1, password: password1})
        }
        fetch("http://127.0.0.1:8000/account/", request);
    };


    return (
        <div >

            <Header/>
            <form>
                <div className="form-group">
                    <input type ="text" className="form-control"
                           placeholder= "login "
                           onChange ={(event) => setUsername(event.target.value)}/>
                </div>
                <div>
                    <input type ="password" className="form-control"
                           placeholder= "password"
                           onChange ={(event) => setPassword(event.target.value)}/>
                </div>

            </form>
            <button className="btn btn-primary" onClick={booking} > Войти</button>

        </div>
    );
}

export default Registration;