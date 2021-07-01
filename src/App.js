import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import api from './api/connectToBD';
import { cardActions, productsActions } from "./actions/cardActions";

function App() {
  const dispatch = useDispatch();
  const openCard = useSelector((state) => state.ui.cardIsVisible);

  const getCartsItems = async() =>{
    await api.get('/shoppingCar')
    .then((res) => {
      let data = res.data;
      let total = 0;
      let quantityArray = data.map((q) => {
        return q.quantity
      })
      for(let i of quantityArray) total+=i
      dispatch(cardActions.getCarts(data));
      dispatch(cardActions.bouched(total))
    }).catch((err) => {
      console.error(err);
    })
  }

  const getProducts = async() =>{
    await api.get('/products')
    .then((res) =>{
      let data = res.data;
      dispatch(productsActions.getAllProducts(data))
    }).catch((err) => {
      console.error(err);
    })
  }

  useEffect(() => {
    getCartsItems();
    getProducts();
  })

  return (
    <Layout>
      {openCard && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
