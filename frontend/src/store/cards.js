// ==== Types ==== //

export const CREATE_CARDS = 'card/CREATE_CARDS';

export const GET_CARDS = 'card/GET_CARDS';

const GET_CARD = 'card/GET_CARD';

export const UPDATE_CARD = 'card/UPDATE_CARD';

export const UPDATE_CARD_DATA = 'card/UPDATE_CARD_DATA';

const DELETE_CARDS = 'card/DELETE_CARDS';

export const DELETE_CARD = 'card/DELETE_CARD';

// ==== Actions ==== //

const actionCreateCard = (card, workspaceId) => {
  return {
    type: CREATE_CARDS,
    payload: { card, workspaceId },
  };
};

const actionGetCards = (cards, workspaceId) => {
  return {
    type: GET_CARDS,
    payload: { cards, workspaceId },
  };
};
const actionGetCard = (cardId) => {
  return {
    type: GET_CARD,
    cardId,
  };
};

//current
const actionUpdateCard = (payload) => {
  return {
    type: UPDATE_CARD,
    payload,
  };
};

const actionUpdateCardData = (card, workspaceId) => {
  return {
    type: UPDATE_CARD_DATA,
    card,
    workspaceId,
  };
};

const actionDeleteCards = (stackId) => {
  return {
    type: DELETE_CARDS,
    stackId,
  };
};

const actionDeleteCard = (cardId, workspaceId) => {
  return {
    type: DELETE_CARD,
    cardId,
    workspaceId,
  };
};

// ==== Thunks ==== //

export const thunkCreateCard = (card) => async (dispatch) => {
  const workspaceId = card.workspaceId;
  const response = await fetch(`/api/c/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(card),
  });

  if (response.ok) {
    const card = await response.json();
    dispatch(actionCreateCard(card, workspaceId));
    return card;
  }
};

export const thunkGetCards = (boardId, workspaceId) => async (dispatch) => {
  const response = await fetch(`/api/c/all/${boardId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    const allStackCards = await response.json();
    dispatch(actionGetCards(allStackCards.cards, workspaceId));
  }
};

export const thunkUpdateCard = (data, workspaceId) => async (dispatch) => {
  const response = await fetch(`/api/c/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const cardData = await response.json();
    return dispatch(actionUpdateCard({ ...cardData, id: workspaceId }));
  }
};

export const thunkUpdateCardData = (data, workspaceId) => async (dispatch) => {
  const response = await fetch(`/api/c/updatedata`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const card = await response.json();
    return dispatch(actionUpdateCardData(card, workspaceId));
  }
};

export const thunkDeleteCard = (cardId, workspaceId) => async (dispatch) => {
  const response = await fetch(`/api/c/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cardId),
  });

  if (response.ok) {
    dispatch(actionDeleteCard(cardId, workspaceId));
  }
};

export const thunkDeleteCards = (stackId) => async (dispatch) => {
  const response = await fetch(`/api/c/delete`, {
    method: 'DELETE',
    body: JSON.stringify(stackId),
  });

  if (response.ok) {
    dispatch(actionDeleteCards(stackId));
  }
};

// ==== Reducer ?? ==== //
