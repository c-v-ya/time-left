import { combineReducers } from "redux";
import tasks from "./task";
import totalTime from "./time";

const rootReducer = combineReducers({
  tasks,
  totalTime,
});

export default rootReducer;
