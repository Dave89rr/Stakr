// ==== Types ====//

const CREATE_WORKSPACE = "workspace/CREATE_WORKSPACE";

const GET_WORKSPACE = "workspace/GET_WORKSPACE";

const UPDATE_WORKSPACE = "workspace/UPDATE_WORKSPACE";

const DELETE_WORKSPACE = "workspace/DELETE_WORKSPACE";

// ==== Actions ====//
const actionCreateWS = (workspace) => {
  return {
    type: CREATE_WORKSPACE,
    workspace,
  };
};
const actionGetWS = (workspace) => {
  return {
    type: GET_WORKSPACE,
    workspace,
  };
};

// ==== Thunks ====//
// ==== Reducers ====//
