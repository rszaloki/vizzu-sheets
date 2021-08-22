import { Action, ActionTypes } from "./reducers";

export enum SheetType {
    GRID = "GRID",
    UNKNOWN = "UNKNOWN",
}

export type Sheet = {
    sheetId: number;
    title: string;
    index: number;
    sheetType: SheetType;
    gridProperties: {
        rowCount: number;
        columnCount: number;
    };
};

export type SheetState = {
    selectedSheetId: null | string;
    loading: boolean;
    sheets: Array<Sheet>;
    title: string;
    selectedTab: null | Sheet;
    tabLoading: boolean;
    header: string[];
    data: any[][];
};

const initialState: SheetState = {
    selectedSheetId: null,
    loading: false,
    sheets: [],
    title: "",
    selectedTab: null,
    tabLoading: false,
    header: [],
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

export type SheetSetData = Action & {
    type: ActionTypes.SheetSetData;
    title: string;
    sheets: Array<Sheet>;
};

export type SheetSelectTab = Action & {
    type: ActionTypes.SheetSelectTab;
    tab: Sheet;
};

export type SheetLoadTab = Action & {
    type: ActionTypes.SheetLoadTab;
};

export type SheetLoadTabDone = Action & {
    type: ActionTypes.SheetLoadTabDone;
};

export type SheetSetTabData = Action & {
    type: ActionTypes.SheetSetTabData;
    header: string[];
    data: any[][];
};

export type SheetActions =
    | SheetSetIdAction
    | SheetLoad
    | SheetLoadDone
    | SheetSetData
    | SheetSelectTab
    | SheetLoadTab
    | SheetLoadTabDone
    | SheetSetTabData;

export default function (
    state: SheetState = initialState,
    action: SheetActions
): SheetState {
    console.log(action);
    switch (action.type) {
        case ActionTypes.SheetSetId:
            return {
                ...initialState,
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
        case ActionTypes.SheetSetData:
            return {
                ...state,
                title: action.title,
                sheets: action.sheets,
            };
        case ActionTypes.SheetSelectTab:
            return {
                ...state,
                selectedTab: action.tab,
            };
        case ActionTypes.SheetLoadTab:
            return {
                ...state,
                tabLoading: true,
            };
        case ActionTypes.SheetLoadTabDone:
            return {
                ...state,
                tabLoading: false,
            };
        case ActionTypes.SheetSetTabData:
            return {
                ...state,
                header: action.header,
                data: action.data
            };
        default:
            return state;
    }
}
