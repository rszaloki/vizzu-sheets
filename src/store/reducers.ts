export enum ActionTypes {
    SheetSetId = 'SheetSetId',
    SheetLoad = 'SheetLoad',
    SheetLoadDone = 'SheetLoadDone',
    SheetSetData = 'SheetSetData',
    SheetSelectTab = 'SheetSelectTab',
    SheetLoadTab = 'SheetLoadTab',
    SheetLoadTabDone = 'SheetLoadTabDone',
    SheetSetTabData = 'SheetSetTabData',
    UserSignedIn = 'UserSignedIn',
    UserSignedOut = 'UserSignedOut',
}


export interface Action {
    type: ActionTypes
}