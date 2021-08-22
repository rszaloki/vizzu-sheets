import React from "react";
import { Box, Button, Grommet, Header, Main, Text, Avatar } from "grommet";
import { Sheet } from "./Sheet";
import { useAppSelector } from "./store";

const theme = {
  global: {
    font: {
      family: `-apple-system, BlinkMacSystemFont, sans-serif`,
    },
  },
};

export const App: React.FC<{ gapi: any }> = ({ gapi }) => {
  const auth = gapi.auth2.getAuthInstance();
  const user = useAppSelector((state) => state.user);

  return (
    <Grommet full theme={theme}>
      <Header pad="small" justify="between">
        {user.isSignedIn ? (
          <>
            <Box direction="row" align="center" gap="small">
              <Avatar src={user.user?.avatar} />
              <Text>{user.user?.name}</Text>
            </Box>
            <Button
              onClick={() => gapi.auth2.getAuthInstance().signOut()}
              label="Logout"
              size="small"
            />
          </>
        ) : (
          <>
            <Box align="center" />
            <Button
              onClick={() => gapi.auth2.getAuthInstance().signIn()}
              primary
              label="Login"
              size="small"
            />
          </>
        )}
      </Header>
      {auth?.isSignedIn.get() ? (
        <Main>
          <Sheet gapi={gapi} />
        </Main>
      ) : null}
    </Grommet>
  );
};
