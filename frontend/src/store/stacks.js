// ==== Types ==== //

export const CREATE_STACK = 'stack/CREATE_STACK';

export const GET_STACK = 'stack/GET_STACK';

export const GET_STACKS = 'stack/GET_STACKS';

export const UPDATE_STACK = 'stack/UPDATE_STACK';

export const UPDATE_STACK_ORDER = 'stack/UPDATE_STACK_ORDER';

export const DELETE_STACK = 'stack/DELETE_STACK';

// ==== Actions ==== //
const actionCreateStack = (stack) => {
  return {
    type: CREATE_STACK,
    stack,
  };
};

const actionGetUserStacks = (stacks, workspaceId) => {
  return {
    type: GET_STACKS,
    payload: { stacks, workspaceId },
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

const actionUpdateStackOrder = (stacks, workspaceId) => {
  return {
    type: UPDATE_STACK_ORDER,
    payload: { stacks, workspaceId },
  };
};

const actionDeleteStack = (payload) => {
  return {
    type: DELETE_STACK,
    payload,
  };
};

// ==== Thunks ==== //

export const thunkCreateStack = (stack) => async (dispatch) => {
  const response = await fetch(`/api/s/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(stack),
  });
  if (response.ok) {
    const stack = await response.json();
    dispatch(actionCreateStack(stack));
  }
};

export const thunkGetAllStacks = (boardId, workspaceId) => async (dispatch) => {
  const response = await fetch(`/api/s/all/${boardId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    const allUserStacks = await response.json();
    dispatch(actionGetUserStacks(allUserStacks.stacks, workspaceId));
  }
};

export const thunkGetStack = (stackId) => async (dispatch) => {
  const response = await fetch(`/api/s/${stackId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    const stack = await response.json();
    dispatch(actionGetStack(stack));
  }
};

export const thunkUpdateStack = (stack) => async (dispatch) => {
  const response = await fetch(`/api/s/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(stack),
  });

  if (response.ok) {
    const stackData = await response.json();
    return dispatch(actionUpdateStack(stackData));
  }
};

export const thunkUpdateStackOrder =
  (stacks, boardId, workspaceId) => async (dispatch) => {
    const response = await fetch(`/api/s/updateOrder`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ stacks, boardId }),
    });

    if (response.ok) {
      const data = await response.json();
      return dispatch(actionUpdateStackOrder(data.stacks, workspaceId));
    }
  };

export const thunkDeleteStack = (payload) => async (dispatch) => {
  const { stackId, workspaceId } = payload;
  const response = await fetch(`/api/s/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(stackId),
  });

  if (response.ok) {
    dispatch(actionDeleteStack(payload));
  }
};

// ==== Reducers ==== //
const stacks = (state = {}, action) => {
  let newState = {};

  switch (action.type) {
    case CREATE_STACK:
      const stck = action.stack;
      newState = { ...state };
      newState.workspaces[stck.id] = stck;
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
