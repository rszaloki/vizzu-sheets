import React, { useState } from 'react';
import {
    FileInput,
    Form,
    FormField,
    Button,
    Spinner,
    Box,
    Text,
} from 'grommet';
import { parse, ParseResult } from 'papaparse';
import { CSVRow, useEditorState } from './Editor';

export const LoadCSV: React.FC = () => {
    const { state: editorState, dispatch: editorDispatch } = useEditorState();
    const [editMode, setEditMode] = useState(!editorState.csv.isLoaded);

    const onSubmit = ({ value }: { value: { file: File[] } }) => {
        const { file } = value;
        editorDispatch({ type: 'loadCSV' });
        parse(file[0], {
            complete: (results: ParseResult<CSVRow>) => {
                editorDispatch({ type: 'setCSVData', parseResult: results });
            },
            header: true,
            skipEmptyLines: 'greedy',
        });
        setEditMode(false);
    };

    if (editorState.csv.isLoading) {
        return <Spinner />;
    }

    if (editMode) {
        return (
            <Form validate="submit" onSubmit={onSubmit}>
                <FormField
                    label="File Input With Max Size"
                    name="file"
                    htmlFor="file"
                    required
                    component={FileInput}
                    multiple={false}
                />
                <Box gap="medium" direction="row">
                    <Button
                        label="Submit"
                        primary
                        type="submit"
                    />
                    {editorState.csv.isLoaded && (
                        <Button
                            label="Cancel"
                            secondary
                            onClick={() => {
                                setEditMode(false);
                            }}
                        />
                    )}
                </Box>
            </Form>
        );
    } else if (editorState.csv.isLoaded) {
        return (
            <Box>
                <Text>Meta: {JSON.stringify(editorState.csv.meta)}</Text>
                <Text>Rows: {JSON.stringify(editorState.csv.data.length)}</Text>
                <Box direction="row">
                    <Button
                        label="Edit"
                        secondary
                        onClick={() => {
                            setEditMode(true);
                        }}
                    />
                </Box>
            </Box>
        );
    }

    return null;
};
