import * as types from "../actions/types";
import initialState from "./initialState";

export default function totalTimeReducer(
  state = initialState.totalTime,
  action
) {
  switch (action.type) {
    case types.UPDATE_TIME_SUCCESS:
      return { ...action.time };

    default:
      return state;
  }
}
