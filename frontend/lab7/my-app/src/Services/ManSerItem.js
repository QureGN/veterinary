import React, {useCallback} from "react";
import {Link, useNavigate} from "react-router-dom";
import ButtonCart from "../button/buttoncart";
import {useDispatch, useSelector} from "react-redux";
import {deleteItemFromCart, setItemInCart, setItemInPut} from "../redux/cart/reducer1";
import ButtonComponent from "../ButtonComponent";
import axios from "axios";
import {FaEdit, FaTrash} from "react-icons/fa"
import "../css/item.css"

export function ManSerItem(props){

    const {service} = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = useCallback(() => {
        dispatch(setItemInPut(service));
        navigate('/formput');
    }, [navigate]);

    // async function handlePress() {
    //     const config = {
    //         credentials:'include',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //
    //             'X-CSRFToken': document.cookie
    //                 .split(';')
    //                 .filter(row => row.startsWith('csrftoken='))
    //                 .map(c => c.split('=')[1])[0]
    //         }
    //     };
    //
    //     const res = await axios.delete(`http://127.0.0.1:8000/stocks1/${service.pk}/`, config)
    //
    // }

    const handlePress = () => {
        const request = {
            method: 'DELETE',
            credentials:'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

                'X-CSRFToken': document.cookie
                    .split(';')
                    .filter(row => row.startsWith('csrftoken='))
                    .map(c => c.split('=')[1])[0]
            },
        }
        fetch(`http://127.0.0.1:8000/stocks1/${service.pk}/`, request);

    };


    return (
        <div>
            <div className="card">
                <h1>{service.service}</h1>
                <div className="button">
                    <div className='but'>
                        <FaEdit className='but' size={30} onClick={handleClick}> Изменить</FaEdit>
                        <FaTrash className='but' size={30} onClick={handlePress}>Удалить услугу</FaTrash>

                    </div>

                </div>

            </div>
        </div>)
}

export default ManSerItem;