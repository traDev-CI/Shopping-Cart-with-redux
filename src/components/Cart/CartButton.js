import { uiActions } from '../../actions/uiAction';
import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';

const CartButton = (props) => {
  const badge = useSelector((state) => state.card.totalQuantity)
  const dispatch = useDispatch();

  const toggleCartHandler = () =>{
    dispatch(uiActions.setOpenToggle())
  }

  return (
    <button className={classes.button} onClick={toggleCartHandler} >
      <span>My Cart</span>
      <span className={classes.badge}>{badge}</span>
    </button>
  );
};

export default CartButton;
