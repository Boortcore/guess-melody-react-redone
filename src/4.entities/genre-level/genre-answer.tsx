import { Player } from '../player';

export const GenreAnswer = ({ answer, onClick }) => {
  return (
    <div className="genre-answer">
      <div className="player-wrapper">
        <Player src={answer.src} />
      </div>
      <input
        type="checkbox"
        name="answer"
        value={answer.genre}
        id={answer.id}
        checked={answer.checked}
        onClick={onClick}
      />
      <label className="genre-answer-check" htmlFor={answer.id}>
        {answer.genre}
      </label>
    </div>
  );
}
