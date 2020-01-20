import React, { Component } from 'react'

export default class CartColums extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-10 mx-auto col-lg-2 text-center">
                        <p className="text-uppercase">Products</p>
                    </div>
                    <div className="col-10 mx-auto col-lg-2 text-center">
                        <p className="text-uppercase">Name of the product</p>
                    </div>
                    <div className="col-10 mx-auto col-lg-2 text-center">
                        <p className="text-uppercase">price</p>
                    </div>
                    <div className="col-10 mx-auto col-lg-2 text-center">
                        <p className="text-uppercase">quantity</p>
                    </div>
                    <div className="col-10 mx-auto col-lg-2 text-center">
                        <p className="text-uppercase">remove</p>
                    </div>
                    <div className="col-10 mx-auto col-lg-2 text-center">
                        <p className="text-uppercase">Total</p>
                    </div>
                </div>
            </div>
        )
    }
}
