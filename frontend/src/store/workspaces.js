import {
  GET_STACKS,
  CREATE_STACK,
  UPDATE_STACK_ORDER,
  DELETE_STACK,
} from "./stacks";
import {
  GET_CARDS,
  UPDATE_CARD,
  CREATE_CARDS,
  DELETE_CARD,
  UPDATE_CARD_DATA,
} from "./cards";
import { CREATE_BOARD, UPDATE_BOARD, DELETE_BOARD } from "./boards";

// ==== Types ==== //

const LOGOUT_WORKSPACE = "workspace/LOGOUT_WORKSPACE";

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

const actionDeleteWorkspace = (workspaceId) => {
  return {
    type: DELETE_WORKSPACE,
    workspaceId,
  };
};

export const actionLogoutWorkspace = () => {
  return {
    type: LOGOUT_WORKSPACE,
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
    const workspaceRes = await response.json();
    dispatch(actionCreateWorkspace(workspaceRes));
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
    dispatch(actionGetUserWorkspaces(allUserWorkspaces.workspaces));
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
  const response = await fetch(`/api/w/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(workspace),
  });

  if (response.ok) {
    const workspace = await response.json();
    dispatch(actionUpdateWorkspace(workspace));
  }
};

export const thunkDeleteWorkspace = (workspaceId) => async (dispatch) => {
  const response = await fetch(`/api/w/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ workspaceId }),
  });

  if (response.ok) {
    dispatch(actionDeleteWorkspace(workspaceId));
  }
};

//**************** Reducer **********************************//
const workspaces = (state = {}, action) => {
  let newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case CREATE_WORKSPACE: {
      const { workspace } = action;
      newState[workspace.id] = { ...workspace, boards: {} };
      return newState;
    }

    case GET_WORKSPACE: {
      const { workspace } = action;
      newState[workspace.id] = workspace;
      return newState;
    }

    case GET_WORKSPACES: {
      const { workspaces } = action;
      workspaces.forEach((workspace) => {
        newState[workspace.id] = workspace;
      });
      return newState;
    }

    case UPDATE_WORKSPACE: {
      const { workspace } = action;
      newState[workspace.id] = { ...newState[workspace.id], ...workspace };
      return newState;
    }

    case DELETE_WORKSPACE:
      delete newState[action.workspaceId];
      return newState;

    case LOGOUT_WORKSPACE:
      return {};

    // ==== boards ==== //
    case CREATE_BOARD: {
      const { workspaceId } = action.board;
      newState[workspaceId].boards[action.board.id] = action.board;
      return newState;
    }

    case UPDATE_BOARD: {
      const { board } = action;
      newState[board.workspaceId].boards[board.id] = board;
      return newState;
    }

    case DELETE_BOARD: {
      const { id, workspaceId } = action.board;
      delete newState[workspaceId].boards[id];
      return newState;
    }

    // ==== stacks ==== //
    case GET_STACKS: {
      newState = { ...state };
      const { stacks, workspaceId } = action.payload;
      if (stacks.length) {
        let stacksObj = { ...newState[workspaceId].stacks };
        stacks.forEach((stack) => {
          stacksObj[stack.id] = stack;
        });
        newState[workspaceId].stacks = stacksObj;
      }
      return newState;
    }

    case CREATE_STACK: {
      const { stack } = action;
      let stacksObj = { ...newState[stack.workspaceId].stacks };
      stacksObj[stack.id] = stack;
      newState[stack.workspaceId].stacks = stacksObj;
      return newState;
    }

    case DELETE_STACK: {
      const { stackId, workspaceId } = action.payload;
      delete newState[workspaceId].stacks[stackId];
      return newState;
    }

    case UPDATE_STACK_ORDER: {
      const { stacks, workspaceId } = action.payload;
      if (stacks.length) {
        let obj = newState[workspaceId].stacks;
        stacks.forEach((stack) => {
          obj[stack.id].position = stack.position;
        });
        newState[workspaceId].stacks = obj;
      }
      return newState;
    }

    // ==== cards ==== //
    case GET_CARDS: {
      newState = { ...state };
      const { cards, workspaceId } = action.payload;
      if (cards.length) {
        let cardsObj = { ...newState[workspaceId].cards };
        cards.forEach((card) => {
          cardsObj[card.id] = card;
        });
        if (cards.length) {
          newState[workspaceId].cards = cardsObj;
        }
      }
      return newState;
    }

    case CREATE_CARDS: {
      const { card, workspaceId } = action.payload;
      if (newState[workspaceId].cards) {
        newState[workspaceId].cards[card.id] = card;
      } else {
        const cardObj = {};
        cardObj[card.id] = card;
        newState[workspaceId].cards = cardObj;
      }
      return newState;
    }

    case UPDATE_CARD: {
      const { card, orderList, otherCards, id } = action.payload;
      let newCardObj = { ...newState[id].cards };
      newCardObj[card.id] = card;
      if (otherCards.length && !orderList.includes(otherCards[0])) {
        otherCards.forEach((id, i) => {
          newCardObj[id].position = i;
        });
        orderList.forEach((id, i) => {
          newCardObj[id].position = i;
        });
      } else {
        orderList.forEach((id, i) => {
          newCardObj[id].position = i;
        });
      }
      newState[id].cards = newCardObj;
      return newState;
    }

    case UPDATE_CARD_DATA: {
      const { card, workspaceId } = action;
      newState[workspaceId].cards[card.id] = card;
      return newState;
    }

    case DELETE_CARD: {
      const { cardId, workspaceId } = action;
      delete newState[workspaceId].cards[cardId];
      return newState;
    }

    default:
      return state;
  }
};

export default workspaces;
