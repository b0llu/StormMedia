import { ADD_POST } from "Utils/Action";

export const ReducerCases = (state, action) => {
    switch (action.type) {
      case ADD_POST:
        return {
          ...state,
          effectTrigger: !state.effectTrigger,
        };

      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
}