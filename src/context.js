import React, { Component } from 'react';
import {storeProducts, detailProduct} from './data';
import * as contentful from 'contentful';

const ProductContext = React.createContext();

class ProductProvider extends Component {

    state={
        products:[],
        detailProduct:detailProduct,
        cart:[],
        modalOpen:false,
        modalProduct:detailProduct,
        cartSubtotal:0,
        cartTax:0,
        cartTotal:0
    };
    client = contentful.createClient({
        space: '2b8kcidiw3m1',
        accessToken: 'UQkGsUHL-XZyRQujJgY-DcI9HyJGDl2DdQ-wEcXnylo' })
    componentDidMount() {
        this.fetchPosts().then(this.setPosts);
      }
    
    fetchPosts = () => this.client.getEntries()

    setPosts = response => {
    this.setState({
        products: response.items
    })
    console.log(this.state.products)
    }
    // componentDidMount(){
    //     this.setProducts();
    // }
    // setProducts = () =>{
        
    //     var client = contentful.createClient({
    //         space: '2b8kcidiw3m1',
    //         accessToken: 'UQkGsUHL-XZyRQujJgY-DcI9HyJGDl2DdQ-wEcXnylo' })
          
    //       client.getEntries().then(entries => {
    //         entries.items.forEach(entry => {
    //           if(entry.fields) {
    //             let cProducts = entry;
    //             console.log(cProducts)
    //           }
    //         })
    //       })    

    //     let cProducts = storeProducts;
    //     let tempProducts = [];
    //     cProducts.forEach(item=>{
    //         const singleItem = {...item};
    //         tempProducts = [...tempProducts, singleItem];
    //     })
    //     this.setState(()=>{
    //         return {products:tempProducts}
    //     })
            
            

        
    // };

    getItem = (id) =>{
        const product = this.state.products.find(item=> item.fields.id===id);
        return product;
    }

    handleDetail = (id) =>{
        const product=this.getItem(id);
        this.setState(()=>{
            return {detailProduct:product}
        })
    }
    addToCart = (id) =>{
        console.log(id)
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.fields.inCart = true;
        product.fields.count = 1;
        const price = product.fields.price;
        product.fields.total = price;

        this.setState(()=>{
            return {products:tempProducts, cart:[...this.state.cart, product]}
        }, ()=>{
            this.addTotals();
        })
    }
    openModal = (id) =>{
        const product = this.getItem(id);
        this.setState(()=>{
            return {modalProduct:product, modalOpen:true}
        })
    }
    closeModal = () =>{
        this.setState(()=>{
            return {modalOpen:false}
        })
    }
    increment = (id) =>{
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item=>item.fields.id ===id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        
        product.fields.count = product.fields.count + 1;
        product.fields.total = product.fields.count * product.fields.price;

        this.setState(()=>{
            return {
                cart: [...tempCart]
            }
        },
        ()=>{
            this.addTotals();
        }
        )
    }
    decrement = (id) =>{
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item=>item.fields.id ===id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        
        product.fields.count = product.fields.count - 1;
        if(product.fields.count === 0){
            this.removeItem(id)
        }
        else{
            product.fields.total = product.fields.count * product.fields.price;

            this.setState(()=>{
                return {
                    cart: [...tempCart]
                }
            },
            ()=>{
                this.addTotals();
            }
            )
        }
    }
    removeItem = (id)=>{
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];
        tempCart = tempCart.filter(item=>item.fields.id !== id);
        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.fields.inCart = false;
        removedProduct.fields.count = 0;
        removedProduct.fields.total = 0;

        this.setState(()=>{
            return{
                cart:[...tempCart],
                products: [...tempProducts]
            }
        }, ()=>{
            this.addTotals();
        })

    }
    clearCart=()=>{
        this.setState(()=>{
            return{
                cart:[]
            }
        }, ()=>{
            this.fetchPosts().then(this.setPosts);
            this.addTotals();
        })
    }
    addTotals=()=>{
        let subTotal = 0;
        this.state.cart.map((item)=>{
            return subTotal += item.fields.total;
        });
        const tempTax = subTotal*0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal+tax;
        this.setState(()=>{
            return{
                cartSubtotal:subTotal,
                cartTax:tax,
                cartTotal:total
            }
        })
    }
    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail:this.handleDetail,
                addToCart:this.addToCart,
                openModal:this.openModal,
                closeModal:this.closeModal,
                increment:this.increment,
                decrement:this.decrement,
                removeItem:this.removeItem,
                clearCart:this.clearCart
                }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};