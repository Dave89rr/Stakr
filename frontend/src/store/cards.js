// ==== Types ==== //

const CREATE_CARDS = "cards/GET_CARDS";

const GET_CARDS = "cards/GET_CARDS";

const GET_CARD = "cards/GET_CARD";

const UPDATE_CARDS = "cards/GET_CARDS";

const DELETE_CARDS = "cards/GET_CARDS";

const DELETE_CARD = "cards/GET_CARD";

// ==== Actions ==== //

const actionCreateCard = (card) => {
  return {
    type: CREATE_CARDS,
    card,
  };
};

const actionGetCards = (stackId) => {
  return {
    type: GET_CARDS,
    stackId,
  };
};
const actionGetCard = (cardId) => {
  return {
    type: GET_CARD,
    stackId,
  };
};

const actionUpdateCard = (card) => {
  return {
    type: UPDATE_CARDS,
    card,
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

// ==== Reducer ==== //
