import React from 'react';
import {Link} from 'react-router-dom';
import PaypalButton from '../PaypalButton';

function CartTotals({value, history}) {
    
    const { cartSubtotal, cartTax, cartTotal, clearCart} = value;
    console.log(value, history)
    
    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                        <Link to="/">
                            <button className="btn btn-outline-danger text-uppercase mb-3 px-5" onClick={()=>clearCart()}>
                                clear cart
                            </button>
                        </Link>
                        <h5>Subtotal: {cartSubtotal}</h5>
                        <h5>tax: {cartTax}</h5>
                        <h5>Subtotal: {cartTotal}</h5>
                        <PaypalButton total={cartTotal} clearCart={clearCart} history={history}  />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}



export default CartTotals;
