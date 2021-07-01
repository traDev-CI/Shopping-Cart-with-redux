import classes from "./CartItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cardActions } from "../../actions/cardActions";
import api from "../../api/connectToBD";

const CartItem = (props) => {
  const { name, quantity, total, price, id } = props.item;
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.card.items);

  const addMoreProduct = ({ item }, action) => {
    console.log(item);
    cartItems.map((product) => {
      if (item.id === product.id) {
        if (action === "add") {
          let quantity = product.quantity + 1;
          let totalPrice = product.totalPrice + price;
          let description = product.description;
          console.log(totalPrice);
          moreProductAPI(quantity, totalPrice, description);
        } else {
          if (product.quantity <=1) {
            console.log("No stock");
            deleteFormCart(product.id);
          } else {
            console.log("Stock");
            let quantity = product.quantity - 1;
            let totalPrice = product.totalPrice - price;
            let description = product.description;
            removeItemHandler(quantity, totalPrice, description);
          }
        }
      }
    });
  };

  const moreProductAPI = async (quantity, totalPrice, description) => {
    let determinatedValue = {
      id,
      name,
      quantity,
      totalPrice,
      description,
      price,
    };
    await api
      .put(`/shoppingCar/${id}`, determinatedValue)
      .then(() => {
        dispatch(cardActions.addItemToCart({ id, name, price }));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteFormCart = async (id) => {
    await api
      .delete(`/shoppingCar/${id}`)
      .then(() => {
        dispatch(cardActions.removeItemFromCart(id));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const removeItemHandler = async (quantity, totalPrice, description) => {
    let determinatedValue = {
      id,
      name,
      quantity,
      totalPrice,
      description,
      price,
    };
    console.log(id);
    await api
      .put(`/shoppingCar/${id}`, determinatedValue)
      .then(() => {
        dispatch(cardActions.removeItemFromCart(id));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{name}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={() => addMoreProduct(props, "delete")}>-</button>
          <button onClick={() => addMoreProduct(props, "add")}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
