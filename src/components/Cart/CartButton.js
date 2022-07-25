import classes from './CartButton.module.css';

const CartButton = (props) => {
  return (
    <button onClick={props.onClick} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{props.number}</span>
    </button>
  );
};

export default CartButton;
