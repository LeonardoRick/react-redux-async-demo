import { useDispatch, useSelector } from 'react-redux';
import { toggleCartActions } from '../../store/toggle-cart';
import CartButton from '../Cart/CartButton';
import classes from './MainHeader.module.css';

const MainHeader = (props) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  return (
    <header className={classes.header}>
      <h1>Redux Cart</h1>
      <nav>
        <ul>
          <li>
            <CartButton
              number={cart.totalQuantity}
              onClick={() => dispatch(toggleCartActions.toggle())}
            />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
