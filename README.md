## Good hamburger

> **Frontend demo** of a food-ordering app (Next.js + React + Tailwind).
> Includes a cart with business rules, combo discounts, order history, loading delay simulation, and unit tests for discount logic.

---

<p align="center">
  <img alt="Good Hamburger" src="https://res.cloudinary.com/djhvdnjpz/image/upload/v1765139298/Screenshot_164_xvgl8y.jpg" width="640"/>
</p>

<hr>

## 📌 Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Core Files](#core-files)
- [Discount Logic Explained](#discount-logic-explained)
- [Unit Testing (Jest)](#unit-testing-jest)
- [Troubleshooting](#troubleshooting)
- [Best Practices Used](#best-practices-used)
- [Requirements & Project Guidelines](#Requirements-&-Project-Guidelines)
- [Contributing](#contributing)
- [Contact](#contact)
- [Images](#Images)

---

## 🔥 Overview

**GOOD HAMBURGER** is a frontend demo designed to simulate a real-world ordering system:

- Displays menu items (fetched from a local JSON file with a 1-second simulated network delay).

- Items can be added to the cart (rule: only 1 item per `type`).

- Applies discounts based on selected combinations:

  | Combo                  | Discount |
  | ---------------------- | -------- |
  | Burger + Fries + Drink | **20%**  |
  | Burger + Drink         | **15%**  |
  | Burger + Fries         | **10%**  |

- Modal to collect a customer name before placing an order.

- Order history page saving all previous orders.

- Fully responsive design with:

  - **Sticky top navbar**
  - **Fixed mobile bottom navigation**

- Includes **unit tests** for discount logic (using Jest).

---

## 📁 Project Structure

```
/app
/cart
 page.jsx
/components
  Card.jsx
  Cart.jsx
  Menu.jsx
  NavBar.jsx
  Orders.jsx
/context
  UserContext.jsx
/data
  menu.json
/home
  page.jsx
/orders
  OrderItem.jsx
  page.jsx
/lib
  calculateDiscount.js


/__tests__
  calculateDiscount.test.js
  menuService.js

```

---

## ⚙️ Installation

Make sure you have **Node.js ≥ 16** installed.

All test-related dev dependencies are already included in the `package.json`.  
Just run:

```bash
npm install
```

---

## 🏃 Available Scripts

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "test": "jest"
}
```

---

## 🚀 Running the Project

### 🔧 Development Mode

To run the project in development:

```bash
npm run dev
```

---

### 🏭 Production Build

To run the project in production:

```bash
npm run build
npm run start
```

**OR**:

```bash
npm run init
```

### 🧪 Running Unit Tests

To execute all unit tests:

```
npm test
```

This will automatically run Jest and display the test results in your terminal.

---

## 📦 Core Files

Below are the most important files that make the project work.

---

### **1. `/data/menu.json`** — local mocked menu

```json
[
  {
    "type": "Burger",
    "name": "Burger",
    "price": 5,
    "image": "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=1115&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "lorem",
    "id": 1
  },
  {
    "type": "Burger",
    "name": "Egg",
    "price": 4.5,
    "image": "https://plus.unsplash.com/premium_photo-1733306506331-adaca500eaf2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "lorem",
    "id": 2
  },
  {
    "type": "Burger",
    "name": "Bacon",
    "price": 7,
    "image": "https://plus.unsplash.com/premium_photo-1675283476222-6a1a01d6a0ba?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "lorem",
    "id": 3
  },
  {
    "type": "Fries",
    "name": "Fries",
    "price": 2,
    "image": "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "lorem",
    "id": 4
  },
  {
    "type": "Drink",
    "name": " Soft drink",
    "price": 2.5,
    "image": "https://plus.unsplash.com/premium_photo-1725075086631-b21a5642918b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "lorem",
    "id": 5
  }
]
```

---

### **2. `/lib/menuService.js`** — mock fetch with delay

```js
import menu from "../data/menu.json";

export const fetchMenu = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve(menu), 1000); // 1 second simulated delay
  });
};
```

---

### **3. `/lib/calculateDiscount.js`** — pure logic for unit tests

```js
export function calculateDiscount(currentCart) {
  const hasSandwich = currentCart.some(i => i.type === "Burger");
  const hasFries = currentCart.some(i => i.type === "Fries");
  const hasDrink = currentCart.some(i => i.type === "Drink");

  const totalPrice = currentCart.reduce((acc, cur) => acc + cur.price, 0);
  let discount = 0;

  if (hasSandwich && hasFries && hasDrink) discount = 0.2;
  else if (hasSandwich && hasDrink) discount = 0.15;
  else if (hasSandwich && hasFries) discount = 0.1;

  const finalPrice = totalPrice - totalPrice * discount;

  return {
    totalPrice,
    discountPercent: discount * 100,
    finalPrice,
  };
}
```

---

### **4. `UserContext.jsx`** — global state manager

Includes:

- Products in cart
- Orders made
- Order submission
- Toast notifications
- Reset state after placing an order

---

## 🎯 Discount Logic Explained

The discount rules work in the following order:

1. If the cart contains:

   - **Burger**
   - **Fries**
   - **Drink**
     ➜ Apply **20%** discount.

2. Else, if it contains:

   - **Burger**
   - **Drink**
     ➜ Apply **15%** discount.

3. Else, if it contains:

   - **Burger**
   - **Fries**
     ➜ Apply **10%** discount.

4. Otherwise:

   - No discount.

The highest matching discount is always selected.

---

## 🧪 Unit Testing (Jest)

### `/__tests__/calculateDiscount.test.js`

```js
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
```

---

### Jest Config

`jest.config.js`

```js
module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};
```

`.babelrc`

```json
{
  "presets": ["next/babel"]
}
```

---

## 🩹 Troubleshooting

| Issue                          | Solution                                              |
| ------------------------------ | ----------------------------------------------------- |
| `menu undefined`               | Fix the import path or use `@/data/menu.json`.        |
| Toast not showing              | Ensure `Toaster` is inside a `"use client"` file.     |
| SetState not updating in time  | Pass the updated array directly to discount function. |
| Bottom nav covering buttons    | Add padding: `pb-24`.                                 |
| Discount shows `0` incorrectly | Use `percentDiscount > 0 && (...)`.                   |
| Jest error: jsdom not found    | Install: `npm install jest-environment-jsdom -D`.     |

---

## 🧠 Best Practices Used

- Pure logic extracted for testability.
- UI decoupled from business logic.
- Toast feedback for UX.
- Loading simulation for realistic behavior.
- Responsive layout with mobile-first considerations.
- Semantic naming, structured folder architecture.

---

# 📋 Requirements & Project Guidelines

## ✅ **Project Requirements**

This application was built following all specifications requested in the assignment:

### **🛒 Ordering Rules**

1. If the customer selects a **sandwich + fries + soft drink**, they receive a **20% discount**.
2. If the customer selects a **sandwich + soft drink**, they receive a **15% discount**.
3. If the customer selects a **sandwich + fries**, they receive a **10% discount**.
4. Each order can contain **only one** sandwich, **one** fries, and **one** soft drink.

   - If the user attempts to add duplicates, the UI displays an **error message**.

---

### **📦 Functional Requirements**

The application includes the following features:

| Requirement                                         | Status                           |
| --------------------------------------------------- | -------------------------------- |
| Display all sandwiches and extras                   | ✅ Completed                     |
| Filter to show only sandwiches                      | ✅ Completed                     |
| Filter to show only extras                          | ✅ Completed                     |
| Add items to the cart                               | ✅ Completed                     |
| Display items in the cart                           | ✅ Completed                     |
| Submit an order and show final total                | ✅ Completed                     |
| No payment entry required                           | ✅ Implemented                   |
| Request customer's name before submitting the order | ✅ Implemented                   |
| Display all submitted orders                        | ✅ Completed                     |
| Responsive + clean UI                               | ✅ Implemented with Tailwind CSS |

---

### 💡 **Bonus Requirement (Optional)**

This project includes:

✅ Unit Tests

This project includes a complete unit test suite for validating the discount calculation logic.

The suite contains four tests, covering all pricing rules:

### Test

20% discount — when the cart includes:
sandwich + fries + drink

15% discount — when the cart includes:
sandwich + drink

10% discount — when the cart includes:
sandwich + fries

0% discount — when none of the rules apply

These tests ensure the pricing system behaves correctly under all scenarios.

---

## 🛠 Project Guidelines

### **Technology**

- Built using **React (Next.js)**
- Styled with **Tailwind CSS**
- Fully responsive, clean, and modern UI

---

### **Data Storage**

No external database was used:

- Cart and submitted orders are stored **in memory**.
- Menu data is loaded from a **local JSON file**.

---

### **Data Fetching**

The menu is loaded using a mock service:

- Retrieves items from a **local JSON file**.
- Includes a **1-second artificial delay** to simulate a real API request.
- The UI displays a **"Loading..."** message during this delay.

---

### **Authentication**

- ❌ Not required
- The project contains **no login or account system**.

---

### **Deliverables**

This repository contains everything required:

- ✔️ Complete source code
- ✔️ Full README with setup instructions
- ✔️ Sample `menu.json` data
- ✔️ Optional unit tests included

---

## 🤝 Contributing

1. Fork this repo
2. Create a new branch: `feature/my-change`
3. Commit your modifications
4. Open a Pull Request

---

## 📬 Contact

If you have any questions, feedback, or want to connect, feel free to reach out!

### 🔗 **Links**

- **🌐 Website:**
  [https://www.ignacioconsuegra.com/](https://www.ignacioconsuegra.com/)
- **💼 LinkedIn:**
  [https://www.linkedin.com/in/ignacio-consuegra-b8a9691b1/](https://www.linkedin.com/in/ignacio-consuegra-b8a9691b1/)
- **🐙 GitHub:**
  [https://github.com/IgnacioConsuegra](https://github.com/IgnacioConsuegra)

### 📧 **Email**

**[ignacioandresconsuegradelacruz@gmail.com](mailto:ignacioandresconsuegradelacruz@gmail.com)**

### 📱 **Phone**

**+57 315 295 0340**

---

## 📸 Images

<p align="center">
  <img alt="Good Hamburger" src="https://res.cloudinary.com/djhvdnjpz/image/upload/v1765139298/Screenshot_164_xvgl8y.jpg" width="640"/>
</p>

<hr>
<p align="center">
  <img alt="Good Hamburger" src="https://res.cloudinary.com/djhvdnjpz/image/upload/v1765139297/Screenshot_165_ylrjiz.jpg" width="640"/>
</p>
<hr>

<p align="center">
  <img alt="Good Hamburger" src="https://res.cloudinary.com/djhvdnjpz/image/upload/v1765139297/Screenshot_166_s9xwk9.jpg" width="640"/>
</p>
<hr>

<p align="center">
  <img alt="Good Hamburger" src="https://res.cloudinary.com/djhvdnjpz/image/upload/v1765140017/WhatsApp_Image_2025-12-07_at_15.39.50_07d47ae3_arpl7c.jpg" width="640"/>
</p>
<hr>

<p align="center">
  <img alt="Good Hamburger" src="https://res.cloudinary.com/djhvdnjpz/image/upload/v1765139837/WhatsApp_Image_2025-12-07_at_15.36.27_e1b01a59_elz4wk.jpg" width="640"/>
</p>

<hr>

<p align="center">
  <img alt="Good Hamburger" src="https://res.cloudinary.com/djhvdnjpz/image/upload/v1765139837/WhatsApp_Image_2025-12-07_at_15.36.38_c7a421f1_pxrold.jpg" width="640"/>
</p>
<hr>
