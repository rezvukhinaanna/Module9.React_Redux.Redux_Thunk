export const initialFieldState = {
  field: Array(9).fill(""),
  massiveX: [],
  massiveO: [],
};

export const fieldReducer = (state = initialFieldState, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, field: action.payload };
    case "ADD_X_MOVE":
      return { ...state, massiveX: [...state.massiveX, action.payload] };
    case "ADD_O_MOVE":
      return { ...state, massiveO: [...state.massiveO, action.payload] };
    case "RESET_GAME":
      return {
        ...initialFieldState,
      };
    default:
      return state;
  }
};
