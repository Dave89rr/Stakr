// ==== Types ==== //

export const CREATE_BOARD = "board/CREATE_BOARD";

export const GET_BOARD = "board/GET_BOARD";

export const GET_BOARDS = "board/GET_BOARDS";

export const UPDATE_BOARD = "board/UPDATE_BOARD";

export const DELETE_BOARD = "board/DELETE_BOARD";

// ==== Actions ==== //

const actionCreateBoard = (board) => {
  return {
    type: CREATE_BOARD,
    board,
  };
};

export const actionGetUserBoards = (board) => {
  return {
    type: GET_BOARDS,
    board,
  };
};

const actionGetBoard = (board) => {
  return {
    type: GET_BOARD,
    board,
  };
};

const actionUpdateBoard = (board) => {
  return {
    type: UPDATE_BOARD,
    board,
  };
};

const actionDeleteBoard = (board) => {
  return {
    type: DELETE_BOARD,
    board,
  };
};

// ==== Thunks ==== //

export const thunkCreateBoard = (board) => async (dispatch) => {
  const response = await fetch(`/api/b/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(board),
  });

  if (response.ok) {
    const board = await response.json();
    dispatch(actionCreateBoard(board));
  }
};

export const thunkGetAllBoards = (username) => async (dispatch) => {
  const response = await fetch(`/api/b/all/${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const allUserBoards = await response.json();
    dispatch(actionGetUserBoards(allUserBoards));
  }
};

export const thunkGetBoard = (boardId) => async (dispatch) => {
  const response = await fetch(`/api/b/${boardId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const board = await response.json();
    dispatch(actionGetBoard(board));
  }
};

export const thunkUpdateBoard = (board) => async (dispatch) => {
  const response = await fetch(`/api/b/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(board),
  });

  if (response.ok) {
    console.log(response.json);
    const board = await response.json();
    dispatch(actionUpdateBoard(board));
  }
};

export const thunkDeleteBoard = (board) => async (dispatch) => {
  const response = await fetch(`/api/b/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(board),
  });

  if (response.ok) {
    dispatch(actionDeleteBoard(board));
  }
};
