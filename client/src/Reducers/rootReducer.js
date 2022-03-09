import { combineReducers } from "redux";

import userReducer from "./userReducer.js";
import cartReducer from "./cartReducer.js";
import wishlistReducer from "./wishlistReducer.js";
import cartt from "./carttReducer.js";
import directCheckout from "./directCheckoutReducer.js";
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  cartt: cartt,
  directCheckout: directCheckout,
});
export default rootReducer;
