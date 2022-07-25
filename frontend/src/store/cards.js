// ==== Types ==== //

const CREATE_CARDS = "stacks/GET_CARDS";

const GET_CARDS = "stacks/GET_CARDS";

const GET_CARD = "stacks/GET_CARD";

const UPDATE_CARDS = "stacks/GET_CARDS";

const DELETE_CARDS = "stacks/GET_CARDS";

const DELETE_CARD = "stacks/GET_CARD";

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
    cardId,
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

    export const thunkCreateCard = (card) => async (dispatch) => {
        const response = await fetch(`/api/c/create`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(card),
        });

        if (response.ok) {
            const card = await response.json();
            dispatch(actionCreateCard(card.card));
        }
        };

    export const thunkGetCards = (stackId) => async (dispatch) => {
        const response = await fetch(`/api/c/all/${stackId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const allStackCards = await response.json();
          dispatch(actionGetCards(allStackCards));
        }
      };

    export const thunkUpdateCard = (card) => async (dispatch) => {
    const response = await fetch(`api/c/update`, {
        method: "PUT",
        body: JSON.stringify(card),
    });

    if (response.ok) {
        const cardData = await response.json;
        dispatch(actionUpdateCard(cardData));
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
