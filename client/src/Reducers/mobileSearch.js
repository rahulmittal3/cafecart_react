const mobileSearch = (state = false, action) => {
  switch (action.type) {
    case "MOBILE_SEARCH_VISIBLE":
      return action.payload;
    default:
      return state;
  }
};

export default mobileSearch;
