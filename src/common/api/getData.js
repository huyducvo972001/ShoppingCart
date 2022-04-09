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

export const getAllUser = async () => {
  const requestUrl = url + "users.json";
  const response = await axios(requestUrl);

  const data = response.data;

  const u = [];

  for (const i in data) {
    u.push({
      id: i,
      active: data[i].active,
      address: data[i].address,
      avatar: data[i].avatar,
      dateOfBirth: data[i].dateOfBirth,
      email: data[i].email,
      fullName: data[i].fullName,
      gender: data[i].gender,
      phoneNumber: data[i].phoneNumber,
      role: data[i].role,
      username: data[i].username,
      password: data[i].password,
    });
  }

  return u;
};
export const getAllOrder = async () => {
  const requestUrl = url + "orders.json";
  const response = await axios(requestUrl);

  const data = response.data;

  const o = [];

  for (const i in data) {
    o.push({ id: i, ...data[i] });
  }

  return o;
};
