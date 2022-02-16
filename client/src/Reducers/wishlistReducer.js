const wishlistReducer = (state = [], action) => {
  switch (action.type) {
    case "WISHLIST":
      return action.payload;
    default:
      return state;
  }
};
export default wishlistReducer;
