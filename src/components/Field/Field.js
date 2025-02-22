import React from "react";
import styles from "./Field.module.css";
import { store } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentPlayer,
  selectField,
  selectIsGameEnded,
  selectMassiveO,
  selectMassiveX,
} from "../selectors";
import {
  ADD_O_MOVE,
  ADD_X_MOVE,
  newGame,
  setCurrentPlayer,
  setField,
  setIsDraw,
  setIsGameEnded,
} from "../../actions";

const FieldLayout = ({ field, moveButton, resetGame }) => {
  return (
    <div className={styles.app}>
      <div className={styles.field}>
        {field.map((item, index) => (
          <button
            onClick={() => moveButton(index)}
            className={styles.moveButton}
            key={index}
          >
            {item}
          </button>
        ))}
      </div>
      <button onClick={resetGame} className={styles.buttonTryAgain}>
        Начать заново
      </button>
    </div>
  );
};

export const Field = () => {
  const isGameEnded = useSelector(selectIsGameEnded);
  const currentPlayer = useSelector(selectCurrentPlayer);
  const field = useSelector(selectField);
  const massiveO = useSelector(selectMassiveO);
  const massiveX = useSelector(selectMassiveX);

  const dispatch = useDispatch();

  const moveButton = (index) => {
    if (isGameEnded || field[index] !== "") {
      if (isGameEnded) {
        alert("Игра завершена! Нажмите 'Начать заново', чтобы сыграть снова.");
      }
      return;
    }

    const updatedField = field.map((item, i) =>
      i === index ? currentPlayer : item
    );

    const checkWinner = (moves) => {
      const WIN_PATTERNS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      return WIN_PATTERNS.some((pattern) =>
        pattern.every((idx) => moves.includes(idx))
      );
    };

    // Добавляем ход в массив и проверяем победителя
    if (currentPlayer === "X") {
      dispatch(ADD_X_MOVE(index));
      if (checkWinner([...massiveX, index])) {
        dispatch(setField(updatedField));
        setTimeout(
          () => dispatch(setIsGameEnded()),
          0
        );
        return;
      }
    } else {
      store.dispatch(ADD_O_MOVE(index));
      if (checkWinner([...massiveO, index])) {
        dispatch(setField(updatedField));
        setTimeout(
          () => dispatch(setIsGameEnded()),
          0
        );
        return;
      }
    }

    // Проверка на ничью
    if (updatedField.every((cell) => cell !== "")) {
      dispatch(setField(updatedField));
      setTimeout(() => dispatch(setIsDraw()), 0);
      return;
    }
    dispatch(setCurrentPlayer(currentPlayer));

    // Обновляем поле и переключаем игрока
    dispatch(setField(updatedField));
  };

  const resetGame = () => {
    dispatch(newGame());
  };

  return (
    <FieldLayout field={field} moveButton={moveButton} resetGame={resetGame} />
  );
};
