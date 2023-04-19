import React, {useEffect, useReducer, useState} from "react";
import reducer from "./reducer";
import {increm} from "./actions";
import { Link } from "react-router-dom";
import MyComponent from "./HomePage";
export function Order(props){
const {item} = props;
    return (
        <div>
            <p>{item.service}</p>
            <p>{item.price}</p>

        </div>);
}

export default Order;