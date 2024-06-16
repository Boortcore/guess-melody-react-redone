import { useAppDispatch } from "../../../4.entities/game/game-slice"
import { startGameRequest } from "../../../4.entities/game/actions";

export function StartGameButton() {
  const dispatch = useAppDispatch();
  return <button onClick={() => dispatch(startGameRequest())} className="main-play">
    Начать игру
  </button>
}

export function StartNewGameButton() {
  const dispatch = useAppDispatch();
  const onClickToNewGame = () => {
    dispatch(startGameRequest());
  };
    
  return <span
    onClick={onClickToNewGame}
    role="button"
    tabIndex={0}
    className="main-replay"
  >
        Сыграть ещё раз
  </span>
}