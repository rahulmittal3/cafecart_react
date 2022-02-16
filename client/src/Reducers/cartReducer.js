const cart = (state = [], action) => {
  switch (action.type) {
    case "CART":
      return action.payload;
    default:
      return [];
  }
};

export default cart;
