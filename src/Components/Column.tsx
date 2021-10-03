import React from 'react';
import { Box, Button, Text } from "grommet";
import { CSVColumn } from "./Editor";

export const Column:React.FC<{column: CSVColumn }> = ({column}) => (
<Box border={{color:'brand'}} pad="small">
    <Text>{column.fieldName}</Text>
    {column.missing && <Button secondary label="remove" />}
</Box>)
