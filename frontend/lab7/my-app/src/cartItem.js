import React from "react";


export function CartItem(props){
    const {title, price, id}= props;

    return (
        <div className='cartItem'>
            <span> {title}</span>
            <span>{price} руб.</span>
        </div>);
}

export default CartItem;