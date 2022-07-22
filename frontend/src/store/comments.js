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

// ==== Thunks ==== //
