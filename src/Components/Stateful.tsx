import React, { useContext, useReducer } from 'react';
import type { Reducer, Dispatch } from 'react';

type ReducerFunction<State, Action> = (state: State, action: Action) => State;

export interface ActionInterface {
  type: string;
  [key:string]:any;
}

type HookResult<State, Action> = {
  state: State;
  dispatch: Dispatch<Action>;
};


export function createStateful<State, Action extends ActionInterface>(
  initialState: State,
  reducers: { [key:string]: ReducerFunction<State, ActionInterface> }
): {
  Stateful: React.FC;
  hook: () => HookResult<State, Action>;
} {
  const StatefulContext = React.createContext<HookResult<State, Action>>({
    state: initialState,
    dispatch: () => null,
  });

  const reducer = (state: State, action: Action) => {
    const type = action.type;
    if (reducers[type]) {
      return reducers[type](state, action);
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
