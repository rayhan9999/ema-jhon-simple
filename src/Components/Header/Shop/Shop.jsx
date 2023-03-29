import React, { useEffect, useState } from 'react';
import Product from '../../../fakeData/Product/Product';
import { addToDb, getShoppingCart } from '../../../utilities/fakedb';
import Cart from '../Cart/Cart';
import './Shop.css';

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
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.id)


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
                <Cart cart={cart}></Cart>
            </div>

        </div>
    );
};

export default Shop;