export const initialInformationState = {
  currentPlayer: "X",
  isGameEnded: false,
  isDraw: false,
};

export const informationReducer = (state = initialInformationState, action) => {
  switch (action.type) {
    case "SET_CURRENT_PLAYER":
      return { ...state, currentPlayer: action.payload };
    case "SET_IS_GAME_ENDED":
      return { ...state, isGameEnded: action.payload };
    case "SET_IS_DRAW":
      return { ...state, isDraw: action.payload };
    case "RESET_GAME":
      return {
        ...initialInformationState,
      };
    default:
      return state;
  }
};
