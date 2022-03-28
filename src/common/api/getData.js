import axios from "axios";

const url = "https://tech-store-44eac-default-rtdb.firebaseio.com/";
export const getAllProduct = async () => {
  const requestUrl = url + "products.json";
  const response = await axios(requestUrl);

  const data = response.data;

  const p = [];

  for (const i in data) {
    p.push({
      id: i,
      name: data[i].name,
      brand: data[i].brand,
      category: data[i].category,
      createdDate: data[i].createdDate,
      discount: data[i].discount,
      image: data[i].image,
      inStock: data[i].inStock,
      price: data[i].price,
      slug: data[i].slug,
      rating: {
        number: 5,
        count: 87,
      },
    });
  }

  return p;
};

export const getAllCategories = async () => {
  const requestUrl = url + "categories.json";
  const response = await axios(requestUrl);

  const data = response.data;

  const c = [];

  for (const i in data) {
    c.push({
      id: i,
      name: data[i].name,
      slug: data[i].slug,
    });
  }

  return c;
};
