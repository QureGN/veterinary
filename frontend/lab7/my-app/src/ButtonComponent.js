import React, {useEffect, useReducer, useState} from "react";
import {increm} from "./actions";
import { Link } from "react-router-dom";
import MyComponent from "./HomePage";
import {setItemInCart} from "./redux/cart/reducer1";
import {useSelector} from "react-redux";

export default function ButtonComponent(props ){
    const {service, func} = props;
    const items = useSelector(state => state.cart.itemsInCart);

    return(
            <button className="btn btn-primary" onClick={func} >  Записаться</button>);


}