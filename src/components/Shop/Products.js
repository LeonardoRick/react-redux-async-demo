import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart';
import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/products');
      const productsList = await response.json();
      setProducts(productsList);
    };
    fetchProducts();
  }, []);

  const addToCartHandler = (id) => {
    const item = products.find((prod) => prod.id === id);
    if (item) {
      dispatch(cartActions.addItem(item));
    }
  };

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {products.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
            addToCart={addToCartHandler}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
