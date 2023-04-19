import React from "react";

import Header from "../header/header";
import {useDispatch, useSelector} from "react-redux";
export function OrderItem(props){
    const {service} = props;
    const dispatch = useDispatch;


    return (
        <div className="card" >


            <h1>{service.service}</h1>
            <div>{service.price}</div>

        </div>
    );
}

export default OrderItem;