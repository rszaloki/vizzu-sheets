import React from 'react';
import { createStateful, ActionInterface } from './Stateful';
import type { ParseResult } from 'papaparse';
import { LoadCSV } from './LoadCSV';
import merge from 'deepmerge';

type VizzuState = {
    text: string;
};

export type CSVRow = { [key: string]: any };

type CSV = { isLoading: boolean } & (
    | { isLoaded: false }
    | ({ isLoaded: true } & ParseResult<CSVRow>)
);

type State = {
    csv: CSV;
    defaultVizzuState: VizzuState;
    timelineStates: VizzuState[];
};

interface ActionLoadCSV extends ActionInterface { type: 'loadCSV' };
interface ActionSetCSVData extends ActionInterface {
    type: 'setCSVData';
    parseResult: ParseResult<CSVRow>;
};
interface ActionAddState extends ActionInterface { type: 'addState' };

type Action = ActionLoadCSV | ActionSetCSVData | ActionAddState;

const initialState: State = {
    csv: {
        isLoading: false,
        isLoaded: false,
    },
    timelineStates: [],
    defaultVizzuState: { text: '' },
};

const { Stateful, hook } = createStateful<State, Action>(initialState, {
    addState: (state) => state,
    loadCSV: (state) => {
        return merge(state, { csv: { isLoading: true } });
    },
    setCSVData: (state, action) => {
        return merge(state, { csv: { isLoading: false, isLoaded: true, ...(action as ActionSetCSVData).parseResult } });
    },
});

export const Editor: React.FC = ({ children }) => (
    <Stateful>
        <LoadCSV />
    </Stateful>
);

export const useEditorState = hook;
