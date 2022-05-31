import { combineReducers } from "redux";
import CartReducers from "./cart";
import ProductReducers from "./product";

const reducers = combineReducers({
  cart: CartReducers,
  product: ProductReducers,
});

export default reducers;
