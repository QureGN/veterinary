import React, {useEffect, useReducer, useState} from "react";
import reducer from "./reducer";
import {increm} from "./actions";
import { Link } from "react-router-dom";
import MyComponent from "./HomePage";
import Order from "./Bag";
export function Status(props){
     const {sum} = props;
     return (
         <div>
             <h1>Сумма выбранных услуг: {sum.map(el =>
                 <div key = {el.pk}>
                     <Order item={el} />
                 </div>)}
             </h1>

         </div>);
 }

export default Status;