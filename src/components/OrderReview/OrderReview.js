import React, { useEffect, useState } from 'react';
import { Link,useHistory } from 'react-router-dom';
import { clearTheCart, removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import useCart from '../hooks/useCard';
import useProducts from '../hooks/useProduct';
import ReviewItem from '../ReviewItem/ReviewItem';

const OrderReview = () => {
    const [products,setproducts]=useProducts();
    const [cart, setCart]=useCart(products);
    const history=useHistory();
    const handleRemove=key=>{
        const newCart=cart.filter(product=>product.key!==key);
        setCart(newCart);
        removeFromDb(key);
    }
    const handleOrderReview=()=>{
        history.push('/placeorder');
        setCart([]);
        clearTheCart();
    }
   
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map(product=><ReviewItem
                    key={product.key}
                    product={product}
                    handleRemove={handleRemove}
                    ></ReviewItem>)
                }

            </div>
            <div className="cart-container">
                    <Cart cart={cart}>
                        <Link>
                        <button onClick={handleOrderReview} className="btn-regular">Place Order</button>
                        </Link>
                    </Cart>
            </div>

           
        </div>
    );
};

export default OrderReview;