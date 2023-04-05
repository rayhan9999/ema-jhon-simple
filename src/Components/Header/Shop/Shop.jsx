import React, { useEffect, useState } from 'react';
import Product from '../../../fakeData/Product/Product';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../../utilities/fakedb';
import Cart from '../Cart/Cart';
import './Shop.css';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    useEffect(() => {
        const savedCart = [];
        const storedCart = getShoppingCart();

        //step 1:get id of the added product 
        for (const id in storedCart) {
            //step 2:get product from products state by using by id
            const addedProduct = products.find(product => product.id === id)
            if (addedProduct) {
                //step 3:add quantity 
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                //step 4: add the added product to the saved cart 
                savedCart.push(addedProduct);




            }
            //console.log('added product', addedProduct)
            //step 5:set the cart 
            setCart(savedCart);

        }

    }, [products])

    // useEffect(() => {

    //     const storedCart = getShoppingCart();
    //     const savedCart = [];
    //     //step 1: get id
    //     for (const id in storedCart) {
    //         //step 2:get the product by using id:
    //         const addedProduct = products.find(product =>
    //             product.id === id)
    //         console.log(addedProduct)
    //         //step 3:get quantity of the product 
    //         const quantity = storedCart[id];
    //         addedProduct.quantity = quantity;
    //         console.log(addedProduct)

    //     }
    // }, [products])

    const handleAddToCart = (product) => {
        //cart.push(product)
        let newCart = [];
        //const newCart = [...cart, product];
        //if product does not exist in the cart ,then set quantity =1
        //if exist update quantity by 1

        const exists = cart.find(pd => pd.id === product.id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product]
        } else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart = [...remaining, exists];
        }


        setCart(newCart);
        addToDb(product.id)


    }


    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }


    return (
        <div className='shop-container'>

            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    >

                    </Product>)
                }

            </div>

            <div className="cart-container">
                <Cart
                    cart={cart}
                    handleClearCart={handleClearCart}

                >
                    <Link className='proceed-link' to="/orders">
                        <button className='btn-proceed'>Review Order</button>

                    </Link>
                </Cart>
            </div>

        </div>
    );
};

export default Shop;