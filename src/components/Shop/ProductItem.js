import { useDispatch, useSelector } from "react-redux";
import { cardActions } from "../../actions/cardActions";
import api from "../../api/connectToBD";
import Card from "../UI/Card";
import classes from "./ProductItem.module.css";

const ProductItem = (props) => {
  const { id, title, price, description } = props;
  const cartItems = useSelector((state) => state.card.items);
  const dispatch = useDispatch();

  const filterAddOrUpdate = (p) =>{
    console.log(p);
    cartItems.map((card) => {
      if (  p.id === card.id) {
        let quantity =  card.quantity + 1
        let totalPrice = card.totalPrice + card.price

        addToUpdateHandler(quantity, totalPrice)
      }else{
        let quantity =  1 
        let totalPrice = price 
        addToCardHandler(quantity, totalPrice)
      }
    })
  }
  const addToUpdateHandler = (quantity, totalPrice) => {
    api.put(`/shoppingCar/${id}`, { id, name: title, price, description, quantity, totalPrice })
    .then((res) =>{
      dispatch(
        cardActions.addItemToCart({ id, title, price, description })
      );
    }).catch((err) =>{
      console.error(err);
    })
  };

  const addToCardHandler = (quantity, totalPrice) => {
    console.log(totalPrice);
    api.post(`/shoppingCar`, { id, name: title, price, description, quantity, totalPrice })
    .then((res) =>{
      dispatch(
        cardActions.addItemToCart({ id, title, price, description })
      );
    }).catch((err) =>{
      console.error(err);
    })
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={() => filterAddOrUpdate(props)}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
