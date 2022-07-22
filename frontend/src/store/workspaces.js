import {
  GET_STACKS,
} from "./stacks";

// ==== Types ==== //

const CREATE_WORKSPACE = "workspace/CREATE_WORKSPACE";

const GET_WORKSPACE = "workspace/GET_WORKSPACE";

const GET_WORKSPACES = "workspace/GET_WORKSPACES";

const UPDATE_WORKSPACE = "workspace/UPDATE_WORKSPACE";

const DELETE_WORKSPACE = "workspace/DELETE_WORKSPACE";

// const GET_ALL_BS = "workspace/GET_ALL_BS";

// ==== Actions ==== //

const actionCreateWorkspace = (workspace) => {
  return {
    type: CREATE_WORKSPACE,
    workspace,
  };
};

const actionGetUserWorkspaces = (workspace) => {
  return {
    type: GET_WORKSPACES,
    workspace,
  };
};
const actionGetWorkspace = (workspace) => {
  return {
    type: GET_WORKSPACE,
    workspace,
  };
};

const actionUpdateWorkspace = (workspace) => {
  return {
    type: UPDATE_WORKSPACE,
    workspace,
  };
};

const actionDeleteWorkspace = (workspace) => {
  return {
    type: DELETE_WORKSPACE,
    workspace,
  };
};

// const actionGetAllBS = (userId) => {
//   return {
//     type: GET_ALL_BS,
//     userId,
//   };
// };

// ==== Thunks ==== //

export const thunkCreateWorkspace = (workspace) => async (dispatch) => {
  const response = await fetch(`/api/w/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(workspace),
  });

  if (response.ok) {
    const workspace = await response.json();
    dispatch(actionCreateWorkspace(workspace.workspace));
  }
};

export const thunkGetAllWorkspaces = (ownerId) => async (dispatch) => {
  const response = await fetch(`/api/w/all/${ownerId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const allUserWorkspaces = await response.json();
    dispatch(actionGetUserWorkspaces(allUserWorkspaces));
    // dispatch(actionGetUserBoards());
  }
};

export const thunkGetWorkspace = (workspaceId) => async (dispatch) => {
  const response = await fetch(`/api/w/${workspaceId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const workspace = await response.json();
    dispatch(actionGetWorkspace(workspace));
  }
};

export const thunkUpdateWorkspace = (workspace) => async (dispatch) => {
  const response = await fetch(`api/w/update`, {
    method: "PUT",
    body: JSON.stringify(workspace),
  });

  if (response.ok) {
    const workspaceData = await response.json;
    dispatch(actionUpdateWorkspace(workspaceData));
  }
};

export const thunkDeleteWorkspace = (workspaceId) => async (dispatch) => {
  const response = await fetch(`/api/w/delete`, {
    method: "DELETE",
    body: JSON.stringify(workspaceId),
  });

  if (response.ok) {
    dispatch(actionDeleteWorkspace(workspaceId));
  }
};

// ==== Reducers ==== //
const initialState = {
  stacks: null,
  boards: null,
};

const workspaces = (state = initialState, action) => {
  let newState = {};

  switch (action.type) {
    case CREATE_WORKSPACE:
      const ws = action.workspace;
      newState = { ...state };
      newState[ws.id] = {
        ownerId: ws.ownerId,
        name: ws.name,
      };
      return newState;

    case GET_WORKSPACE:
      const workspace = action.workspace.workspaces;
      newState[workspace.id] = workspace;
      return newState;

    case GET_WORKSPACES:
      const workspaces = action.workspace.workspaces;
      workspaces.forEach((workspace) => {

        newState[workspace.id] = workspace;
      });

      return newState;

    case UPDATE_WORKSPACE:
      newState = { ...state };
      const workspaceData = action.workspace.workspaces;
      newState[workspaceData.id] = workspaceData;
      return newState;

    case DELETE_WORKSPACE:
      newState = { ...state };
      delete newState[action.workspaceId];
      return newState;

    case GET_STACKS:
      newState = { ...state };
      const stacks = action.stack.stacks;

      const stacksObj = {}
      stacks.forEach(stack => {
        stacksObj[stack.id] = stack;
      });

      if (stacks[0]) {
        newState[stacks[0].boardId].stacks = stacksObj;
      }

      return newState;

    default:
      return state;
  }
};

export default workspaces;

/* action to get boards/stakcs in here create cases in reducer for them
reducer will copy state and call reducer
*/
