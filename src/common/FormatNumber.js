export const MoneyFormat = (number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);

export const NumberFormat = (number) => new Intl.NumberFormat().format(number);

export const DateFormat = (dateStr) => {
  let date = new Date(dateStr);
  return `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()} - ${
    date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()
  } - ${date.getFullYear()}`;
};
