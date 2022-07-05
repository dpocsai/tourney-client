const getFormattedDateString = (dateString) => {
  let date = new Date(dateString);
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear().toString().slice(2);
  return `${day}/${month}/${year}`;
};

export default getFormattedDateString;
