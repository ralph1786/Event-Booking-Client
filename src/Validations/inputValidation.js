export const inputValidation = (title, poster, price, date, description) => {
  if (
    title.trim().length === 0 ||
    poster.trim().length === 0 ||
    parseFloat(price) <= 0 ||
    date.trim().length === 0 ||
    description.trim().length === 0
  ) {
    return true;
  }
};
