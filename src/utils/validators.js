export const validateHours = (event) => {
  const hours = parseInt(event.target.value || 0);
  if (hours < 0 || hours > 24) {
    event.target.classList.add("is-invalid");
    return 0;
  }
  event.target.classList.remove("is-invalid");
  return hours;
};

export const validateMinutes = (event) => {
  const minutes = parseInt(event.target.value || 0);
  if (minutes < 0 || minutes > 60) {
    event.target.classList.add("is-invalid");
    return 0;
  }
  event.target.classList.remove("is-invalid");
  return minutes;
};
