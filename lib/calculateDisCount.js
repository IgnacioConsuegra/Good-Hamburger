export function calculateDiscount(currentCart) {
  const hasSandwich = currentCart.some(i => i.type === "Burger");
  const hasFries = currentCart.some(i => i.type === "Fries");
  const hasDrink = currentCart.some(i => i.type === "Drink");

  const totalPrice = Number(
    currentCart
      .reduce((accumulated, currentItem) => accumulated + currentItem.price, 0)
      .toFixed(2)
  );

  let discount = 0;

  if (hasSandwich && hasFries && hasDrink) {
    discount = 0.2;
  } else if (hasSandwich && hasDrink) {
    discount = 0.15;
  } else if (hasSandwich && hasFries) {
    discount = 0.1;
  }

  const finalPrice = Number((totalPrice - totalPrice * discount).toFixed(2));

  return {
    totalPrice,
    discountPercent: discount * 100,
    finalPrice,
  };
}
