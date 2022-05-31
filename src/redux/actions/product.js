export const setCart = (product) => {
  return {
    type: "SET_CART_FULFILLED",
    payload: product,
  };
};

export const DelCart = () => {
  return {
    type: "DEL_CART_FULFILLED",
  };
};

export const setProduct = (product) => {
  return {
    type: "SET_PRODUCT_FULFILLED",
    payload: product,
  };
};
