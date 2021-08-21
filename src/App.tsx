import React from "react";
import { GoogleApiProvider, useGoogleApi } from "react-gapi";
import { Box, Button, Grommet, Header, Main, Text, Avatar } from "grommet";
import { Sheet } from "./Sheet";

const theme = {
  global: {
    font: {
      family: `-apple-system, BlinkMacSystemFont, sans-serif`,
    },
  },
};

function AuthComponent() {
  const gapi = useGoogleApi({
    scopes: [
      "profile",
      "https://www.googleapis.com/auth/spreadsheets.readonly",
    ],
    discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
  });

  const auth = gapi?.auth2.getAuthInstance();

  return (
    <Grommet full theme={theme}>
      <Header pad="small" justify="between">
        {!auth ? (
          <Text>Loading...</Text>
        ) : auth?.isSignedIn.get() ? (
          <>
            <Box direction="row" align="center" gap="small">
              <Avatar
                src={auth.currentUser.get().getBasicProfile().getImageUrl()}
              />
              <Text>{auth.currentUser.get().getBasicProfile().getName()}</Text>
            </Box>
            <Button
              onClick={() => auth.signOut()}
              label="Logout"
              size="small"
            />
          </>
        ) : (
          <>
            <Box align="center" />
            <Button
              onClick={() => auth.signIn()}
              primary
              label="Login"
              size="small"
            />
          </>
        )}
      </Header>
      {auth?.isSignedIn.get() ? <Main><Sheet gapi={gapi} /></Main> : null}
    </Grommet>
  );
}

function App() {
  return (
    <GoogleApiProvider clientId="707661571297-0n3e77lf89s1i049naqkeb3c6l8v03n0.apps.googleusercontent.com">
      <AuthComponent />
    </GoogleApiProvider>
  );
}

export default App;
