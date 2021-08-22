export enum ActionTypes {
    SheetSetId = 'SheetSetId',
    SheetLoad = 'SheetLoad',
    SheetLoadDone = 'SheetLoadDone',
    UserSignedIn = 'UserSignedIn',
    UserSignedOut = 'UserSignedOut',
}


export interface Action {
    type: ActionTypes
}