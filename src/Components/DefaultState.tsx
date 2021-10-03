import React, { useState } from 'react';
import { CSVRow, useEditorState } from './Editor';
import { Box, Button, Text } from "grommet";
import { Column } from './Column';

export const DefaultState:React.FC = () => {
    const { state: editorState, dispatch: editorDispatch } = useEditorState();
    return (
        <Box>
            <Box direction="row" gap="medium" pad="medium">
                {editorState.defaultVizzuState.columns.map(column => <Column column={column} /> )}
            </Box>
        </Box>)
}