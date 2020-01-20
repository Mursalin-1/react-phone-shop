import React, { Component } from 'react';
import CartColumns from './CartColumns';
import EmptyCart from './EmptyCart';
import {ProductConsumer} from '../../context';
import CartList from './CartList';
import CartTotals from './CartTotals';

export default class Cart extends Component {
    render() {
        return (
            <ProductConsumer>
            {(value)=>{
                const {cart} = value;
                if(cart.length>0){
                    return(
                        <div>
                            <h3 className="text-title text-center text-capitalize">
                                Cart
                            </h3>
                            <CartColumns />
                            <CartList value={value} />
                            <CartTotals value={value} /> 
                            
                        </div>
                    )
                }
                else{
                    return <EmptyCart />
                }
            }}
            </ProductConsumer>
            
        )
    }
}
