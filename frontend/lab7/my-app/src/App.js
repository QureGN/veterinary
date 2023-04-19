import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import MyComponent from "./HomePage";
import React, {useState, useReducer} from "react";
import InfServ from "./InfServ";
import {Provider} from "react-redux";
import {store} from "./redux";
import OrderPage from "./Bag/OrderPage";
import BookingPage from "./personal/BookingPage";
import Sort from "./Sort/Sort";
import Registration from "./Registration";
import Auth from "./auth";
import ManSer from "./Services/ManSer";
import Formput from "./form/formput";
import Formadd from "./form/formadd";
import ManBooking from "./booking/ManBooking";
import FormBooking from "./booking/FormBooking";

import Validate from "./personal/validate";
import NotValidate from "./personal/notvalidate";


function App() {

    return  (
        <Provider store={store}>
            < BrowserRouter basename="/" >
                <div>

                    <Routes>

                            <Route path ="/" element={<MyComponent/>}/>
                            <Route path ="/service/:pk" element={<InfServ />}/>
                            <Route path ="/order" element={<OrderPage/>}/>
                            <Route path ="/bookingpage" element={<BookingPage/>}/>
                            <Route path ="/sort" element={<Sort/>}/>
                            <Route path ="/register" element={<Registration/>}/>
                            <Route path ="/login" element={<Auth/>}/>
                            <Route path ="/managerservices" element={<ManSer/>}/>
                            <Route path ="/formput" element={<Formput/>}/>
                            <Route path ="/formadd" element={<Formadd/>}/>
                            <Route path ="/managerbooking" element={<ManBooking/>}/>
                            <Route path ="/formputbooking" element={<FormBooking/>}/>
                            <Route path ="/validate" element={<Validate/>}/>
                            <Route path ="/notvalidate" element={<NotValidate/>}/>
                        {/*<Route path ="/login" element={<Login/>}/>*/}
                        {/*<Route path ="/logout" element={<Logout/>}/>*/}
                    </Routes>
                </div>
            </BrowserRouter>
        </Provider>

    );
}

export default App;