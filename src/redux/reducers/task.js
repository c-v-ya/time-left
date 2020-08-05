import * as types from "../actions/types";
import initialState from "./initialState";

export default function tasksReducer(state = initialState.tasks, action) {
  switch (action.type) {
    case types.ADD_TASK_SUCCESS:
      return [...state, action.task];

    case types.EDIT_TASK_SUCCESS:
      return [
        ...state.map((task) => {
          return task.id === action.task.id ? action.task : task;
        }),
      ];

    case types.DELETE_TASK_SUCCESS:
      return [
        ...state.filter((task) => {
          if (task.id !== action.task.id) return task;
        }),
      ];

    default:
      return state;
  }
}
