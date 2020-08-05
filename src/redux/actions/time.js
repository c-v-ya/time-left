import * as types from "./types";

export function updateTotalTime(time) {
  return async function (dispatch) {
    dispatch(updateTotalTimeSuccess(time));
  };
}

export function updateTotalTimeSuccess(time) {
  return { type: types.UPDATE_TIME_SUCCESS, time };
}
