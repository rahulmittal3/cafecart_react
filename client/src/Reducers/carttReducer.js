const cartt = (state = [], action) => {
  switch (action.type) {
    case "CART_CHANGED":
      return action.payload;
    default:
      return state;
  }
};

export default cartt;
