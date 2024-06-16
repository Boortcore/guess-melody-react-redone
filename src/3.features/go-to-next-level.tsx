import { useAppDispatch } from "../4.entities/game/game-slice";
import { goToNextLevelRequest } from "../4.entities/game/actions";
import { useSelector } from "react-redux";
import { getQuestion } from "../4.entities/game/game-slice";
import { GENRE_TYPE, ARTIST_TYPE } from "../5.shared/constants";

function GenreButton({ disabled, answers }) {
  const question = useSelector(getQuestion)
  const dispatch = useAppDispatch();
  const getAnswer = () => {
    const { genre } = question;
    return answers.every(
      (answer) =>
        (answer.genre !== genre && !answer.checked) ||
            (answer.genre === genre && answer.checked),
    );
  }

  const goToNextLevel = (answer) => dispatch(goToNextLevelRequest(answer))
  const onClickAnswer = (e) => {
    e.preventDefault();
    const answer = getAnswer();
    goToNextLevel(answer);
  };

  return <button
    disabled={disabled}
    onClick={onClickAnswer}
    className="genre-answer-send"
    type="submit"
  >
        Ответить
  </button>
}

const ArtistButton = ({ index, answer, onClick }) => {
  return (
    <div className="main-answer-wrapper">
      <input
        onClick={onClick}
        className="main-answer-r"
        type="radio"
        id={'answer-' + index}
        name="answer"
        value={answer.isCorrect}
      />
      <label className="main-answer" htmlFor={'answer-' + index}>
        <img className="main-answer-preview" src={answer.image.url} />
        {answer.title}
        <br />
        {answer.isCorrect.toString()}
      </label>
    </div>
  );
}

  
function ArtistButtons() {
  const question = useSelector(getQuestion)
  const dispatch = useAppDispatch();
  const goToNextLevel = (answer) => dispatch(goToNextLevelRequest(answer))
  const onClickAnswer = (e) => {
    e.preventDefault();
    const answer = e.target.value === 'true';
    goToNextLevel(answer);
  };
  return  <>
    {question.answers.map((answer, index) => {
      return (
        <ArtistButton
          key={index}
          index={index}
          answer={answer}
          onClick={onClickAnswer}
        />
      );
    })}
  </>
}

export const getToNextLevelControl = (type) => {
  switch (type) {
  case GENRE_TYPE:
    return GenreButton;
  case ARTIST_TYPE:
    return ArtistButtons;
  }   
};