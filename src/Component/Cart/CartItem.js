import React from 'react'

export default function CartItem({item, value}){
    const {id, title, img, price, total, count} = item.fields;
    
    const {increment, decrement, removeItem} = value;
    return (
        <div className="container">
            <div className="row my-1 text-capitalize text-center">
                <div className="col-10 mx-auto col-lg-2">
                    <img src={img.fields.file.url}
                    className="img-fluid"
                    alt="product"
                    />
                </div>
                <div className="col-10 mx-auto col-lg-2 text-center">
                    <span className="d-lg-none">product: </span>
                    {title}
                </div>
                <div className="col-10 mx-auto col-lg-2 text-center">
                    <span className="d-lg-none">price: </span>
                    {price}
                </div>
                <div className="col-10 mx-auto col-lg-2 text-center">
                    <div className="d-flex justify-content-center">
                        <span className="btn btn-black mx-1" onClick={()=>{decrement(id)}}>
                            -
                        </span>
                        <span className="btn btn-black mx-1" onClick={()=>{decrement(id)}}>
                            {count}
                        </span>
                        <span className="btn btn-black mx-1" onClick={()=>{increment(id)}}>
                            +
                        </span>
                    </div>
                </div>
                <div className="col-10 mx-auto col-lg-2 text-center">
                    <div className="cart-icon" onClick={()=>{removeItem(id)}}>
                        <i className='fas fa-trash'></i>
                    </div>
                </div>
                <div className="col-10 mx-auto col-lg-2 text-center">
                    <span className="d-lg-none">item total: </span>
                    {total}
                </div>
                
            </div>
        </div>
    )
    
}
