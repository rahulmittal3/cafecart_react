const directCheckout = (state = false, action) => {
  switch (action.type) {
    case "DIRECT_CHECKOUT":
      return action.payload;
    default:
      return state;
  }
};

export default directCheckout;
