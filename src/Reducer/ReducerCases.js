import { ADD_FOLLOWING, REMOVE_FOLLOWING, ADD_POST, GET_USERS } from "Utils/Action";

export const ReducerCases = (state, action) => {
  switch (action.type) {

    case GET_USERS:
      return {
        ...state,
        users: action.payload
      }

    case ADD_POST:
      return {
        ...state,
        effectTrigger: !state.effectTrigger,
      };

    case ADD_FOLLOWING:
      return {
        ...state,
        userFollowing: action.payload,
      };

    case REMOVE_FOLLOWING:
      return {
        ...state,
        userFollowing: action.payload,
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
