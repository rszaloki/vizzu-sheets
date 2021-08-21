import React from 'react';
import { GoogleApiProvider, useGoogleApi } from 'react-gapi'

function AuthComponent() {
  const gapi = useGoogleApi({
    scopes:['profile']
  })

  const auth = gapi?.auth2.getAuthInstance()

  return <div>{
    !auth
      ? <span>Loading...</span>
      : auth?.isSignedIn.get()
        ? `Logged in as "${auth.currentUser.get().getBasicProfile().getName()}"`
        : <button onClick={() => auth.signIn()}>Login</button>
  }</div>
}

function App() {
  return (
  <GoogleApiProvider clientId="707661571297-0n3e77lf89s1i049naqkeb3c6l8v03n0.apps.googleusercontent.com">
    <AuthComponent />
  </GoogleApiProvider>)
}

export default App;
