// The currency is in USD.

const products = [
  {
    id: "pri_01j30gpbandt6x1hh1jf881wdy",
    name: "Watercolor Brushes (Basic)",
    maximumQuantity: 1,
    minimumQuantity: 1,
    price: 4,
  },
  {
    id: "pri_01j30gqm006t8qperkn0h3v1h7",
    name: "Watercolor Brushes (Professional Set)",
    maximumQuantity: 1,
    minimumQuantity: 1,
    price: 14,
  },
  {
    id: "pri_01j30gx2zmeban9z2tr265k3d7",
    name: "Watercolor Co Membership",
    maximumQuantity: 1,
    minimumQuantity: 1,
    price: 4,
  },
];

export const productsDAO = {
  getAllProducts: () => {
    return products;
  },

  getProductsById: (ids: string[]) => {
    return products.filter((product) => ids.includes(product.id));
  },
};
