import React, {useCallback, useEffect, useReducer, useState} from "react";

import {Link, useNavigate} from "react-router-dom";
import {Setcheck, setItemInBooking, Setnote, Setpk1, Setservice, Settime} from "../redux/cart/reducer1";
import {useDispatch} from "react-redux";
import {FaEdit} from "react-icons/fa";
import "../css/item.css"

export default function ButtonPut(props ){
    const {sign} = props;
    const dispatch =useDispatch();
    const navigate = useNavigate();
    const handleClick = useCallback(() => {
        // dispatch(Setpk1(pk))
        // dispatch(Setservice(service))
        // dispatch(Settime(timing))
        // dispatch(Setnote(notes))
        // dispatch(Setcheck(check))
        dispatch(setItemInBooking(sign))
        navigate('/formputbooking');
    }, [navigate]);

    return(
        <FaEdit className="icon" size={30} onClick={handleClick}  >Изменить</FaEdit>);


}