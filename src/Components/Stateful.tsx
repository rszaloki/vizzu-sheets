import React, { useContext, useReducer } from 'react';
import type { Reducer, Dispatch } from 'react';

type HookResult<State, Action> = {
  state: State;
  dispatch: Dispatch<Action>;
};

export function createStateful<State, Action extends {type:string}>(
  initialState: State,
  reducers: { [key in Action['type']]: (state: State, action: Extract<Action,{type:key}>) => State }
): {
  Stateful: React.FC;
  hook: () => HookResult<State, Action>;
} {
  const StatefulContext = React.createContext<HookResult<State, Action>>({
    state: initialState,
    dispatch: () => null,
  });

  const isValid = (key:string): key is Action['type'] => reducers.hasOwnProperty(key)

  const reducer = (state: State, action: Action) => {
    const type = action.type;
    if (isValid(type)) {
      return reducers[type](state, action as Extract<Action,{type:typeof type}>);
    } else {
      return state;
    }
  };

  const Stateful: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer<Reducer<State, Action>>(
      reducer,
      initialState
    );

    return (
      <StatefulContext.Provider value={{ state, dispatch }}>
        {children}
      </StatefulContext.Provider>
    );
  };

  const hook = () => useContext(StatefulContext);

  return {
    Stateful,
    hook,
  };
}
