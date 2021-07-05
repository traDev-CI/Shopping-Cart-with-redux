import cartSlice from "../reducer/cartSlice";
import api from '../api/connectToBD';
import { products } from "../reducer/productsSlice";


export const getProducts =  () =>{
    return async (dispatch) => {
         await api.get('/products')
        .then((res) =>{
          let data = res.data;
          console.log(data);
          dispatch(productsActions.getAllProducts(data))
        }).catch((err) => {
          console.error(err);
        })
    }
}

export const cardActions = cartSlice.actions;
export const productsActions = products.actions;
