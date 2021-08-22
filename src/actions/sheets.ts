import { store } from "../store";
import { WindowWithGapi } from "..";
import { ActionTypes } from "../store/reducers";
import { Sheet, SheetType } from "../store/sheets";

export function loadSheet(sheetId: string) {
    const gapi = (window as WindowWithGapi).gapi;
    store.dispatch({ type: ActionTypes.SheetLoad });
    gapi.client.sheets.spreadsheets
        .get({
            spreadsheetId: sheetId,
            ranges: [],
            includeGridData: false,
        })
        .then((response: any) => {
            const { result } = response;
            const sheets: Array<Sheet> = result.sheets.map((sheetProp: any) => {
                const properties = sheetProp.properties;
                return {
                    sheetId: properties.sheetId,
                    title: properties.title,
                    index: properties.index,
                    sheetType:
                        properties.sheetType === SheetType.GRID
                            ? SheetType.GRID
                            : SheetType.UNKNOWN,
                    gridProperties: properties.gridProperties || {},
                };
            });
            store.dispatch({
                type: ActionTypes.SheetSetData,
                title: result.properties.title,
                sheets,
            });
            store.dispatch({
                type: ActionTypes.SheetLoadDone,
            });
            if (sheets.length === 1) {
                loadTab(sheetId, sheets[0]);
            }
        });
}

export function loadTab(spreadsheetId: string, tab: Sheet) {
    if (tab.gridProperties.columnCount > 20) {
        throw new Error("too much columns");
    }
    const gapi = (window as WindowWithGapi).gapi;
    store.dispatch({
        type: ActionTypes.SheetSelectTab,
        tab,
    });
    store.dispatch({ type: ActionTypes.SheetLoadTab });
    const columnLetter = String.fromCharCode(
        64 + tab.gridProperties.columnCount
    );
    gapi.client.sheets.spreadsheets.values
        .get({
            spreadsheetId,
            range: `${tab.title}!A1:${columnLetter}${tab.gridProperties.rowCount}`,
        })
        .then((response: any) => {
            const values = response.result.values;
            store.dispatch({ type: ActionTypes.SheetLoadTabDone });
            const header = (values as string[][]).shift();
            store.dispatch({
                type: ActionTypes.SheetSetTabData,
                header: header || [],
                data: values,
            });
        });
}
