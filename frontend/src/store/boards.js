// ==== Types ==== //

export const CREATE_BOARD = 'board/CREATE_BOARD';

export const GET_BOARD = 'board/GET_BOARD';

export const GET_BOARDS = 'board/GET_BOARDS';

export const UPDATE_BOARD = 'board/UPDATE_BOARD';

export const DELETE_BOARD = 'board/DELETE_BOARD';

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

const actionDeleteBoard = (boardId) => {
  return {
    type: DELETE_BOARD,
    boardId,
  };
};

// ==== Thunks ==== //

export const thunkCreateBoard = (board) => async (dispatch) => {
  const response = await fetch(`/api/b/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    const allUserBoards = await response.json();
    dispatch(actionGetUserBoards(allUserBoards));
  }
};

export const thunkGetBoard = (boardId) => async (dispatch) => {
  const response = await fetch(`/api/b/${boardId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    const board = await response.json();
    dispatch(actionGetBoard(board));
  }
};

export const thunkUpdateBoard = (board) => async (dispatch) => {
  const response = await fetch(`api/b/update`, {
    method: 'PUT',
    body: JSON.stringify(board),
  });

  if (response.ok) {
    const boardData = await response.json;
    dispatch(actionUpdateBoard(boardData));
  }
};

export const thunkDeleteBoard = (boardId) => async (dispatch) => {
  const response = await fetch(`/api/b/delete`, {
    method: 'DELETE',
    body: JSON.stringify(boardId),
  });

  if (response.ok) {
    dispatch(actionDeleteBoard(boardId));
  }
};

// ==== Reducers ==== //

const boards = (state = {}, action) => {
  let newState = {};

  switch (action.type) {
    case CREATE_BOARD:
      const brd = action.board;
      newState = { ...state };
      newState[brd.id] = {
        workspaceId: brd.workspaceId,
        username: brd.username,
        name: brd.name,
        color: brd.color,
      };
      return newState;

    case GET_BOARD:
      const board = action.board.board;
      newState[board.id] = board;
      return newState;

    case GET_BOARDS:
      const boards = action.board.board;
      boards.forEach((board) => {
        newState[board.id] = board;
      });
      return newState;

    case UPDATE_BOARD:
      newState = { ...state };
      const boardData = action.board.board;
      newState[boardData.id] = boardData;
      return newState;

    case DELETE_BOARD:
      newState = { ...state };
      delete newState[action.boardId];
      return newState;

    default:
      return state;
  }
};

export default boards;
