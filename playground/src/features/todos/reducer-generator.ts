import { ActionType } from 'typesafe-actions';

import { Todo } from './models';
import * as actions from './actions';

export type TodosAction = ActionType<typeof actions>;

function createReducer<S, A extends { type: string }>(
  initialState: S,
  handlers: {
    [P in A['type']]?: A extends { type: P }
      ? (state: S, action: A) => S
      : never
  }
) {
  return (state: S = initialState, action: A): S => {
    if (handlers.hasOwnProperty(action.type)) {
      return (handlers as any)[action.type](state, action);
    } else {
      return state;
    }
  };
}

export const todos = createReducer<Todo[], TodosAction>([], {
  ['todos/ADD']: (state, action) => {
    return [...state, action.payload];
  },
});
