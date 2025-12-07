import { calculateDiscount } from "../lib/calculateDiscount";
describe("Discount calculation", () => {
  test("applies 20% discount for sandwich + fries + drink", () => {
    const cart = [
      { type: "Burger", price: 10 },
      { type: "Fries", price: 5 },
      { type: "Drink", price: 3 },
    ];

    const result = calculateDiscount(cart);

    expect(result.discountPercent).toBe(20);
    expect(result.finalPrice).toBe(Number(((10 + 5 + 3) * 0.8).toFixed(2)));
  });

  test("applies 15% discount for sandwich + drink", () => {
    const cart = [
      { type: "Burger", price: 10 },
      { type: "Drink", price: 3 },
    ];

    const result = calculateDiscount(cart);

    expect(result.discountPercent).toBe(15);
    expect(result.finalPrice).toBe(Number(((10 + 3) * 0.85).toFixed(2)));
  });

  test("applies 10% discount for sandwich + fries", () => {
    const cart = [
      { type: "Burger", price: 10 },
      { type: "Fries", price: 5 },
    ];

    const result = calculateDiscount(cart);

    expect(result.discountPercent).toBe(10);
    expect(result.finalPrice).toBe(Number(((10 + 5) * 0.9).toFixed(2)));
  });

  test("no discount if rules are not met", () => {
    const cart = [
      { type: "Fries", price: 5 },
      { type: "Drink", price: 3 },
    ];

    const result = calculateDiscount(cart);

    expect(result.discountPercent).toBe(0);
    expect(result.finalPrice).toBe(5 + 3);
  });
});
