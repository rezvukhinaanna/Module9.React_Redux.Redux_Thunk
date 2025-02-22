import React from "react";
import styles from "./Information.module.css";
import { useSelector} from "react-redux";
import {
  selectCurrentPlayer,
  selectIsDraw,
  selectIsGameEnded,
} from "../selectors";

const InformationLayout = ({ isDraw, isGameEnded, currentPlayer }) => {
  return (
    <div className={styles.tittle}>
      Текущий ход:{" "}
      {isDraw === true
        ? "Ничья"
        : isGameEnded
        ? `Победа ${currentPlayer === "0" ? "O" : "X"}`
        : `Ходит ${currentPlayer}`}
    </div>
  );
};

export const Information = () => {
  const isGameEnded = useSelector(selectIsGameEnded);
  const currentPlayer = useSelector(selectCurrentPlayer);
  const isDraw = useSelector(selectIsDraw);

  return (
    <InformationLayout
      isDraw={isDraw}
      isGameEnded={isGameEnded}
      currentPlayer={currentPlayer}
    />
  );
};
