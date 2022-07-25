import {
  GET_STACKS,
  CREATE_STACK,
  UPDATE_STACK_ORDER,
  DELETE_STACK,
} from "./stacks";
import { GET_CARDS } from "./cards";

// ==== Types ==== //

const LOGOUT_WORKSPACE = "workspace/LOGOUT_WORKSPACE";

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

const actionLogoutWorkspace = () => {
  return {
    type: LOGOUT_WORKSPACE,
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

export const thunkLogoutWorkspace = () => async (dispatch) => {
  dispatch(actionLogoutWorkspace());
};

// ==== Reducers ==== //

const workspaces = (state = {}, action) => {
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

    case LOGOUT_WORKSPACE:
      newState = {};

      return newState;

    // ==== stacks ==== //
    case GET_STACKS:
      newState = { ...state };

      const stacks = action.stack.stacks;
      if (stacks.length) {
        let stacksObj = { ...state[stacks[0].workspaceId].stacks };

        stacks.forEach((stack) => {
          stacksObj[stack.id] = stack;
        });

        newState[stacks[0].workspaceId].stacks = stacksObj;
      }

      return newState;

    case CREATE_STACK:
      newState = { ...state };
      const stck = action.stack;
      let stacksObj = { ...state[stck.workspaceId].stacks };
      stacksObj[stck.id] = stck;
      newState[stck.workspaceId].stacks = stacksObj;
      return newState;

    case UPDATE_STACK_ORDER:
      newState = { ...state };

      const updatedStacks = action.stacks;

      if (updatedStacks.length) {
        let obj = newState[updatedStacks[0].workspaceId].stacks;
        updatedStacks.forEach((stack) => {
          obj[stack.id].position = stack.position;
        });
        newState[updatedStacks[0].workspaceId].stacks = obj;
      }

      return newState;

    // ==== cards ==== //
    case GET_CARDS:
      newState = { ...state };

      const cards = action.cards.cards;
      const workspaceId = action.workspaceId;

      if (cards.length) {
        let cardsObj = { ...state[workspaceId].cards };

        cards.forEach((card) => {
          cardsObj[card.id] = card;
        });

        if (cards.length) {
          newState[workspaceId].cards = cardsObj;
        }
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
