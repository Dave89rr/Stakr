// ==== Types ==== //

const CREATE_STACK = "stack/CREATE_STACK";

const GET_STACK = "stack/GET_STACK";

const GET_STACKS = "stack/GET_STACKS";

const UPDATE_STACK = "stack/UPDATE_STACK";

const DELETE_STACK = "stack/DELETE_STACK";

// ==== Actions ==== //
const actionCreateStack = (stack) => {
  return {
    type: CREATE_STACK,
    stack,
  };
};

const actionGetUserStacks = (stack) => {
  return {
    type: GET_STACKS,
    stack,
  };
};
const actionGetStack = (stack) => {
  return {
    type: GET_STACK,
    stack,
  };
};

const actionUpdateStack = (stack) => {
  return {
    type: UPDATE_STACK,
    stack,
  };
};

const actionDeleteStack = (stack) => {
  return {
    type: DELETE_STACK,
    stack,
  };
};

// ==== Thunks ==== //

// ==== Reducers ==== //
const stacks = (state = {}, action) => {
  let newState = {};

  switch (action.type) {
    case CREATE_STACK:
      const stck = action.stack;
      newState = { ...state };
      newState[stck.id] = {
        boardId: stck.boardId,
        username: stck.username,
        name: stck.name,
        position: stck.position,
      };
      return newState;

    case GET_STACK:
      const stack = action.stack.stack;
      newState[stack.id] = stack;
      return newState;

    case GET_STACKS:
      const stacks = action.stack.stack;
      stacks.forEach((stack) => {
        newState[stack.id] = stack;
      });

      return newState;

    case UPDATE_STACK:
      newState = { ...state };
      const stackData = action.stack.stack;
      newState[stackData.id] = stackData;
      return newState;

    case DELETE_STACK:
      newState = { ...state };
      delete newState[action.stackId];
      return newState;

    default:
      return state;
  }
};

export default stacks;
