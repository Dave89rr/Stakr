import {
  GET_STACKS,
  CREATE_STACK,
  UPDATE_STACK_ORDER,
  DELETE_STACK,
} from './stacks';
import {
  GET_CARDS,
  UPDATE_CARD,
  CREATE_CARDS,
  DELETE_CARD,
  UPDATE_CARD_DATA,
} from './cards';
import { CREATE_BOARD } from './boards';

// ==== Types ==== //

const LOGOUT_WORKSPACE = 'workspace/LOGOUT_WORKSPACE';

const CREATE_WORKSPACE = 'workspace/CREATE_WORKSPACE';

const GET_WORKSPACE = 'workspace/GET_WORKSPACE';

const GET_WORKSPACES = 'workspace/GET_WORKSPACES';

const UPDATE_WORKSPACE = 'workspace/UPDATE_WORKSPACE';

const DELETE_WORKSPACE = 'workspace/DELETE_WORKSPACE';

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
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    const allUserWorkspaces = await response.json();
    dispatch(actionGetUserWorkspaces(allUserWorkspaces.workspaces));
  }
};

export const thunkGetWorkspace = (workspaceId) => async (dispatch) => {
  const response = await fetch(`/api/w/${workspaceId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    const workspace = await response.json();
    dispatch(actionGetWorkspace(workspace));
  }
};

export const thunkUpdateWorkspace = (workspace) => async (dispatch) => {
  const response = await fetch(`/api/w/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
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
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
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

    case DELETE_STACK:
      const { stackData } = action;
      const wsId = parseInt(stackData.workspaceId, 10);
      delete newState[wsId].stacks[stackData.stackId];
      return newState;

    case UPDATE_STACK_ORDER:
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
    case GET_CARDS: {
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
    }
    case CREATE_CARDS: {
      const card = action.card;
      const workspaceId = action.workspaceId;

      let newCardObj = { ...state[workspaceId].cards };
      newCardObj[card.id] = card;
      newState[workspaceId].cards = newCardObj;
      return newState;
    }
    case UPDATE_CARD: {
      const card = action.payload.card;
      const orderList = action.payload.orderList;
      const otherCards = action.payload.otherCards;
      const id = action.workspaceId;

      let newCardObj = { ...state[id].cards };
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
      newState = { ...state };
      const { cardId, workspaceId } = action;
      delete newState[workspaceId].cards[cardId];
      return newState;
    }

    default:
      return state;
  }
};

export default workspaces;

/* action to get boards/stakcs in here create cases in reducer for them
reducer will copy state and call reducer
*/
