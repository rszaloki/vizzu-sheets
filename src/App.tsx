import React from 'react';
import { Grommet, Main } from 'grommet';
import { Editor } from './Components/Editor';

const theme = {
    global: {
        font: {
            family: `-apple-system, BlinkMacSystemFont, sans-serif`,
        },
    },
};

export const App: React.FC = () => {
    return (
        <Grommet full theme={theme}>
            <Main pad="large">
                <Editor />
            </Main>
        </Grommet>
    );
};
