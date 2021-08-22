import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { Provider } from "react-redux";
import { ActionTypes } from "./store/reducers";
import { store } from './store';

export interface WindowWithGapi {
  gapi?: any;
}

function updateUserState(gapi: any) {
  const auth = gapi.auth2.getAuthInstance();
  const isSignedIn = auth.isSignedIn.get();
  if (!isSignedIn) {
    store.dispatch({ type: ActionTypes.UserSignedOut });
  } else {
    store.dispatch({
      type: ActionTypes.UserSignedIn,
      user: {
        name: auth.currentUser.get().getBasicProfile().getName(),
        avatar: auth.currentUser.get().getBasicProfile().getImageUrl(),
      },
    });
  }
}

function loadGapi() {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";
    script.addEventListener("load", () => {
      (window as WindowWithGapi).gapi.load("client", () => {
        (window as WindowWithGapi).gapi.client
          .init({
            clientId:
              "707661571297-0n3e77lf89s1i049naqkeb3c6l8v03n0.apps.googleusercontent.com",
            discoveryDocs: [
              "https://sheets.googleapis.com/$discovery/rest?version=v4",
            ],
            scope:
              "profile https://www.googleapis.com/auth/spreadsheets.readonly",
          })
          .then(() => {
            const gapi = (window as WindowWithGapi).gapi;
            console.log("gapi is ready");
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateUserState.bind(window, gapi));
            resolve(gapi);
          });
      });
    });

    document.body.appendChild(script);
  });
}

loadGapi().then((gapi) => {
  ReactDOM.render(
    <Provider store={store}>
      <App gapi={gapi} />
    </Provider>,
    document.getElementById("root")
  );
  updateUserState(gapi);
});
