import React, { useState } from "react";
import { Box, Form, Text, TextInput, Button } from "grommet";
import { loadSheet } from "./actions/sheets";

interface Props {
    gapi: any;
}

export const Sheet: React.FC<Props> = ({ gapi }) => {
    return (
        <Form
            onSubmit={({ value }: { value: { sheetId: string } }) => {
                loadSheet(value.sheetId);
            }}
        >
            <Box
                direction="row"
                align="center"
                gap="small"
                justify="center"
                pad="small"
            >
                <Text wordBreak="normal">Sheet Id:</Text>
                <TextInput id="sheet-id" name="sheetId" />
                <Button type="submit" label="Load" primary size="small" />
            </Box>
        </Form>
    );
};
