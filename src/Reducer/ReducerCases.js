import {
  ADD_FOLLOWING,
  REMOVE_FOLLOWING,
  ADD_POST,
  GET_USERS,
  FETCH_POSTS,
  RESET_FOLLOW_STATUS,
  ADD_FOLLOWERS,
  EFFECT_TRIGGER,
  LOADING,
} from "Utils/Action";

export const ReducerCases = (state, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: !state.loading,
      };

    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case FETCH_POSTS:
      return {
        ...state,
        posts: action.payload,
      };

    case ADD_POST:
      return {
        ...state,
        posts: action.payload,
      };

    case ADD_FOLLOWERS:
      return {
        ...state,
        userFollowers: action.payload,
        userTrigger: !state.userTrigger,
      };

    case ADD_FOLLOWING:
      return {
        ...state,
        userFollowing: action.payload,
        userTrigger: !state.userTrigger,
      };

    case REMOVE_FOLLOWING:
      return {
        ...state,
        userFollowing: action.payload,
        userTrigger: !state.userTrigger,
      };

    case RESET_FOLLOW_STATUS:
      return {
        ...state,
        userFollowing: [],
        userFollowers: [],
      };

    case EFFECT_TRIGGER:
      return {
        ...state,
        effectTrigger: !state.effectTrigger,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
