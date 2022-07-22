// ==== Types ==== //
const CREATE_COMMENT = "card/CREATE_COMMENT";

const GET_COMMENT = "card/GET_COMMENT";

const GET_COMMENTS = "card/GET_COMMENTS";

const UPDATE_COMMENT = "card/UPDATE_COMMENT";

const DELETE_COMMENT = "card/DELETE_COMMENT";

// ==== Actions ==== //

const actionCreateComment = (comment) => {
  return {
    type: CREATE_COMMENT,
    comment,
  };
};

const actionGetComments = () => {
  return {
    type: GET_COMMENTS,
  };
};

const actionGetComment = (commentId) => {
  return {
    type: GET_COMMENT,
    commentId,
  };
};

const actionUpdateComment = (comment) => {
  return {
    type: UPDATE_COMMENT,
    comment,
  };
};

const actionDeleteComment = (commentId) => {
  return {
    type: DELETE_COMMENT,
    commentId,
  };
};

// ==== Thunks ==== //

export const thunkCreateComment = (comment) => async (dispatch) => {
  const response = await fetch(`/api/comment/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });

  if (response.ok) {
    const comment = await response.json();
    dispatch(actionCreateComment(comment.comment));
  }
};

export const thunkGetComment = (commentId) => async (dispatch) => {
  const response = await fetch(`api/commentId`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentId),
  });

  if (response.ok) {
    const comment = await response.json();
    dispatch(actionGetComment(comment));
  }
};

export const thunkGetAllComments = (stackId) => async (dispatch) => {
  const response = await fetch(`/api/comment/all/${stackId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const allStackComments = await response.json();
    dispatch(actionGetComments(allStackComments));
  }
};

export const thunkUpdateComment = (comment) => async (dispatch) => {
  const response = await fetch(`api/comment/update`, {
    method: "PUT",
    body: JSON.stringify(comment),
  });

  if (response.ok) {
    const commentData = await response.json;
    dispatch(actionUpdateComment(commentData));
  }
};

export const thunkDeleteComment = (commentId) => async (dispatch) => {
  const response = await fetch(`/api/comment/delete`, {
    method: "DELETE",
    body: JSON.stringify(commentId),
  });

  if (response.ok) {
    dispatch(actionDeleteComment(commentId));
  }
};
