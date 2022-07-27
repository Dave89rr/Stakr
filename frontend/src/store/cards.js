// ==== Types ==== //

export const CREATE_CARDS = "stack/CREATE_CARDS";

export const GET_CARDS = "stack/GET_CARDS";

const GET_CARD = "stack/GET_CARD";

export const UPDATE_CARD = "stack/UPDATE_CARD";

const DELETE_CARDS = "stack/GET_CARDS";

const DELETE_CARD = "stack/GET_CARD";

// ==== Actions ==== //

const actionCreateCard = (card, workspaceId) => {
  return {
    type: CREATE_CARDS,
    card,
    workspaceId,
  };
};

const actionGetCards = (cards, workspaceId) => {
  return {
    type: GET_CARDS,
    cards,
    workspaceId,
  };
};
const actionGetCard = (cardId) => {
  return {
    type: GET_CARD,
    cardId,
  };
};

const actionUpdateCard = (payload, workspaceId) => {
  return {
    type: UPDATE_CARD,
    payload,
    workspaceId,
  };
};

const actionDeleteCards = (stackId) => {
  return {
    type: DELETE_CARDS,
    stackId,
  };
};

const actionDeleteCard = (cardId) => {
  return {
    type: DELETE_CARD,
    cardId,
  };
};

// ==== Thunks ==== //

export const thunkCreateCard = (card) => async (dispatch) => {
  const workspaceId = card.workspaceId;
  const response = await fetch(`/api/c/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(card),
  });

  if (response.ok) {
    const card = await response.json();
    dispatch(actionCreateCard(card, workspaceId));
  }
};

export const thunkGetCards = (boardId, workspaceId) => async (dispatch) => {
  const response = await fetch(`/api/c/all/${boardId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const allStackCards = await response.json();
    dispatch(actionGetCards(allStackCards, workspaceId));
  }
};

export const thunkUpdateCard = (data, workspaceId) => async (dispatch) => {
  const response = await fetch(`/api/c/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const cardData = await response.json();
    return dispatch(actionUpdateCard(cardData, workspaceId));
  }
};

export const thunkDeleteCard = (cardId) => async (dispatch) => {
  const response = await fetch(`/api/c/delete`, {
    method: "DELETE",
    body: JSON.stringify(cardId),
  });

  if (response.ok) {
    dispatch(actionDeleteCard(cardId));
  }
};

export const thunkDeleteCards = (stackId) => async (dispatch) => {
  const response = await fetch(`/api/c/delete`, {
    method: "DELETE",
    body: JSON.stringify(stackId),
  });

  if (response.ok) {
    dispatch(actionDeleteCards(stackId));
  }
};

// ==== Reducer ?? ==== //
