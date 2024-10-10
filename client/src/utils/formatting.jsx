export const formatDate = (date) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Intl.DateTimeFormat("id-ID", options).format(new Date(date));
};

export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString("id-ID");
};
