import { UNDOABLE_REDO, UNDOABLE_UNDO } from 'constants/actionTypes';

const initialState = {
  pastActions: [],
  futureActions: [],
  currentState: undefined
};

export default function undoable(reducer, options) {
  const { limit, resettingActions = [] } = options;

  return (state = initialState, action) => {
    const { type, reverseAction } = action;

    if (resettingActions.includes(type)) {
      return resetHitory(state, action);
    }

    if (type === UNDOABLE_UNDO) {
      return undo(state, action);
    }

    if (type === UNDOABLE_REDO) {
      return redo(state, action);
    }

    if (reverseAction) {
      return remember(state, action);
    }

    return {
      ...initialState,
      ...state,
      currentState: reducer(state.currentState, action)
    };
  };

  function remember(state, action) {
    let pastActions = [...state.pastActions, action];
    if (pastActions.length > limit) {
      pastActions = pastActions.slice(1);
    }

    return {
      ...initialState,
      pastActions,
      futureActions: [],
      currentState: reducer(state.currentState, action)
    };
  }

  function resetHitory(state, action) {
    return {
      ...initialState,
      currentState: reducer(state.currentState, action)
    };
  }

  function redo(state) {
    const nextAction = state.futureActions[0];

    return {
      ...initialState,
      pastActions: [...state.pastActions, nextAction],
      futureActions: state.futureActions.slice(1),
      currentState: reducer(state.currentState, nextAction)
    };
  }

  function undo(state) {
    const previousActionIndex = state.pastActions.length - 1;
    const previousAction = state.pastActions[previousActionIndex];

    return {
      ...initialState,
      pastActions: state.pastActions.slice(0, previousActionIndex),
      futureActions: [previousAction, ...state.futureActions],
      currentState: reducer(state.currentState, inverseAction(previousAction))
    };
  }

  function inverseAction(action) {
    const {
      reverseAction,
      ...actionAttributes
    } = action;

    return {
      ...reverseAction,
      reverseAction: actionAttributes
    };
  }
}
