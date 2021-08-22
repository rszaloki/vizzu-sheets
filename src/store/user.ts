import { Action, ActionTypes } from "./reducers";

export type User = {
  name: string;
  avatar: string;
};

export type UserState = {
  isSignedIn: boolean;
  user: null | User;
};

export type UserSignedOutAction = Action & {
  type: ActionTypes.UserSignedOut;
};
export type UserSignedInAction = Action & {
  type: ActionTypes.UserSignedIn;
  user: User;
};

export type UserActions = UserSignedInAction | UserSignedOutAction;

const initialState: UserState = {
  isSignedIn: false,
  user: null,
};

export default function (
  state: UserState = initialState,
  action: UserActions
): UserState {
  switch (action.type) {
    case ActionTypes.UserSignedOut:
      return {
        ...state,
        isSignedIn: false,
        user: null,
      };
    case ActionTypes.UserSignedIn:
        return {
            ...state,
            isSignedIn: true,
            user: action.user
        }
    default:
        return state
  }
}
