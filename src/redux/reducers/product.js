const initialState = {
  product: [],
};

const ProductData = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PRODUCT_FULFILLED":
      return {
        ...state,
        product: action.payload,
      };
    default:
      return state;
  }
};

export default ProductData;
