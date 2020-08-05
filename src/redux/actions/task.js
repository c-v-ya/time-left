import * as types from "./types";

export function addTask(task) {
  return async function (dispatch) {
    dispatch(addTaskSuccess(task));
  };
}

export function addTaskSuccess(task) {
  return { type: types.ADD_TASK_SUCCESS, task };
}

export function editTask(task) {
  return async function (dispatch) {
    dispatch(editTaskSuccess(task));
  };
}

export function editTaskSuccess(task) {
  return { type: types.EDIT_TASK_SUCCESS, task };
}

export function deleteTask(task) {
  return async function (dispatch) {
    dispatch(deleteTaskSuccess(task));
  };
}

export function deleteTaskSuccess(task) {
  return { type: types.DELETE_TASK_SUCCESS, task };
}
