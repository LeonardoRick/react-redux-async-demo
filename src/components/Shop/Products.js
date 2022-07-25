import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart';
import ProductItem from './ProductItem';
import classes from './Products.module.css';

const dummyProducts = [
  {
    id: 1,
    title: 'Test',
    price: 6,
    description: 'This is a first product - amazing!',
  },
  {
    id: 2,
    title: 'BATATA',
    price: 8,
    description: 'Batata is the best item to add to your meal',
  },
];

const Products = (props) => {
  const dispatch = useDispatch();
  const addToCartHandler = (id) => {
    const item = dummyProducts.find((prod) => prod.id === id);
    if (item) {
      dispatch(cartActions.addItem(item));
    }
  };

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {dummyProducts.map((product) => (
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
