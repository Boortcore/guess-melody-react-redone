import { useState } from 'react';
import { GenreAnswer } from './GenreAnswer';

export const GenreLevel = ({ question, children }) => {
  const [answers, setAnswers] = useState(
    question.answers.map((answer, index) => {
      return {
        id: index,
        genre: answer.genre,
        src: answer.src,
        checked: false,
      }
    })
  ) 
  
  const onSelectAnswer = ({ target }) => {
    const { id } = target;
    setAnswers((prevState) => {
      const newState = { ...prevState };
      const answer = newState[id];
      answer.checked = target.checked;
      return newState;
    });
  };

  const isDisabled = () => !answers.some((answer) => answer.checked);

  return (
    <section className="main main--level main--level-genre">
      <div className="main-wrap">
        <h2 className="title">{question.question}</h2>

        <form className="genre">
          {question.answers.map((answer, index) => {
            return (
              <GenreAnswer
                key={answer.src}
                answer={answers[index]}
                onClick={onSelectAnswer}
              />
            );
          })}

          { children({ disabled: isDisabled(), answers }) }

        </form>
      </div>
    </section>
  );
}

