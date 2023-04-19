import React from "react";
import {Link} from "react-router-dom";
import ButtonCart from "./button/buttoncart";
import {useDispatch, useSelector} from "react-redux";
import {deleteItemFromCart, setItemInCart} from "./redux/cart/reducer1";
import ButtonComponent from "./ButtonComponent";
import './css/item.css';


export function ServiceItem(props){


    const {service} = props;
    const dispatch = useDispatch();
    const handleClick = (e) => {
        e.stopPropagation();
        dispatch(setItemInCart(service));
    };


    return (
        <div>
            <div className="card">
                <p>
                    <Link to ={`/service/${service.pk}`}>{service.service} </Link>
                </p>
                <p> {service.price}</p>
                <div>

                    <button className="btn btn-primary" onClick={handleClick} >  Записаться</button>

                </div>
            </div>
        </div>)
}

export default ServiceItem;