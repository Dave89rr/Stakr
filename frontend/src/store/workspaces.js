// ==== Types ==== //

const CREATE_WORKSPACE = "workspace/CREATE_WORKSPACE";

const GET_WORKSPACE = "workspace/GET_WORKSPACE";

const GET_WORKSPACES = "workspace/GET_WORKSPACES";

const UPDATE_WORKSPACE = "workspace/UPDATE_WORKSPACE";

const DELETE_WORKSPACE = "workspace/DELETE_WORKSPACE";

// ==== Actions ==== //

const actionCreateWorkspace = (workspace) => {
  return {
    type: CREATE_WORKSPACE,
    workspace,
  };
};

const actionGetUserWorkspaces = (workspaces) => {
  return {
    type: GET_WORKSPACES,
    workspaces,
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
// ==== Reducers ==== //
