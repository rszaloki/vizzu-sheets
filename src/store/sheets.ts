import { Action, ActionTypes } from "./reducers";

export type SheetState = {
  selectedSheetId: null | string;
  loading: boolean;
  data: Array<any>;
};

const initialState: SheetState = {
  selectedSheetId: null,
  loading: false,
  data: [],
};

export type SheetSetIdAction = Action & {
  type: ActionTypes.SheetSetId;
  id: string;
};

export type SheetLoad = Action & {
  type: ActionTypes.SheetLoad;
};

export type SheetLoadDone = Action & {
  type: ActionTypes.SheetLoadDone;
};

export type SheetActions = SheetSetIdAction | SheetLoad | SheetLoadDone;

export default function (
  state = initialState,
  action: SheetActions
): SheetState {
  switch (action.type) {
    case ActionTypes.SheetSetId:
      return {
        ...state,
        selectedSheetId: action.id,
      };
    case ActionTypes.SheetLoad:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.SheetLoadDone:
      return {
        ...state,
        loading: false,
      };
  }
  return state;
}
