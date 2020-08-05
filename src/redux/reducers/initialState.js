export default {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  totalTime: JSON.parse(localStorage.getItem("time")) || {
    hours: 8,
    minutes: 0,
  },
};
