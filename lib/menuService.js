import menu from "../app/data/menu.json";

export const fetchMenu = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(menu);
    }, 1000); // 1 segundo de delay
  });
};
