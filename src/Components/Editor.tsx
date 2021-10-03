import React from 'react';
import { createStateful } from './Stateful';
import type { ParseResult } from 'papaparse';
import { LoadCSV } from './LoadCSV';
import merge from 'deepmerge';
import { DefaultState } from './DefaultState';

export type CSVColumn = {
    fieldName: string;
    missing: boolean;
};

export type VizzuState = {
    columns: CSVColumn[];
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

type Action =
    | {
          type: 'loadCSV';
      }
    | {
          type: 'setCSVData';
          parseResult: ParseResult<CSVRow>;
      }
    | {
          type: 'addState';
      };

const initialState: State = {
    csv: {
        isLoading: false,
        isLoaded: false,
    },
    timelineStates: [],
    defaultVizzuState: { columns: [] },
};

const overwriteMerge = (_: any, sourceArray: any[]) => sourceArray;

const { Stateful, hook } = createStateful<State, Action>(initialState, {
    addState: (state) => state,
    loadCSV: (state) => {
        return merge(state, { csv: { isLoading: true } });
    },
    setCSVData: (state, action) => {
        const { meta } = action.parseResult;
        const csv = {
            isLoading: false,
            isLoaded: true,
            ...action.parseResult,
        };
        const columns = state.defaultVizzuState.columns.map((column) => ({
            ...column,
            missing: !meta.fields?.includes(column.fieldName),
        }));
        meta.fields?.forEach((fieldName) => {
            if (!columns.find((col) => col.fieldName === fieldName)) {
                columns.push({ fieldName, missing: false });
            }
        });
        return merge<State>(
            state,
            { csv, defaultVizzuState: { columns } },
            { arrayMerge: overwriteMerge }
        );
    },
});

export const Editor: React.FC = ({ children }) => (
    <Stateful>
        <LoadCSV />
        <DefaultState />
    </Stateful>
);

export const useEditorState = hook;
