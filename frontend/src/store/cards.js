// ==== Types ==== //

const CREATE_CARDS = "cards/GET_CARDS";

const GET_CARDS = "cards/GET_CARDS";

const UPDATE_CARDS = "cards/GET_CARDS";

const DELETE_CARDS = "cards/GET_CARDS";

// ==== Actions ==== //

const actionCreateCard = (card) => {
  return {
    type: CREATE_CARDS,
    card,
  };
};

const actionGetCards = (stackId) => {
  return {
    type: CREATE_CARDS,
    stackId,
  };
};

const actionUpdateCard = (card) => {
  return {
    type: UPDATE_CARDS,
    card,
  };
};

const actionDeleteCard = (cardId) => {
  return {
    type: DELETE_CARDS,
    cardId,
  };
};

// ==== Thunks ==== //

// ==== Reducer ==== //
