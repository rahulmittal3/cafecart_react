import { combineReducers } from "redux";

import userReducer from "./userReducer.js";
import cartReducer from "./cartReducer.js";
import wishlistReducer from "./wishlistReducer.js";
import cartt from "./carttReducer.js";
import directCheckout from "./directCheckoutReducer.js";
import drawer from "./drawer.js";
import mobileSearch from "./mobileSearch.js";
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  cartt: cartt,
  directCheckout: directCheckout,
  drawer: drawer,
  mobileSearch: mobileSearch,
});
export default rootReducer;
