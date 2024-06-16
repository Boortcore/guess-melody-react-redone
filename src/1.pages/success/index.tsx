import { useEffect } from 'react';
import { loadAllResultsRequest } from '../../4.entities/game/actions';
import { Preloader } from '../../4.entities/preloader';
import { getLoading, getResults } from '../../4.entities/game/game-slice'
import { getStatistic } from '../../5.shared/utils/index';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../4.entities/game/game-slice';
import { useParams } from 'react-router';

const getDescription = (id, results) => {
  const currentResult = results.find((result) => result.id == id);

  if (!currentResult)
    return (
      <div>
        <h2 className="title">
          Результата с заданным ID <br /> не существует
        </h2>
        <div className="main-stat">Введите корректный ID</div>
        <span className="main-comparison">
          или начните игру, нажав кнопку старт
        </span>
      </div>
    );

  const percent = getStatistic(results, currentResult.id);
  const { time, correctAnswers } = currentResult;
  //const minutes = String(time / 60).padStart(2, `0`);
  const minutes = String(parseInt(time / 60, 10)).padStart(2, `0`);
  const seconds = String(time % 60).padStart(2, `0`);
  return (
    <div>
      <h2 className="title">Вы настоящий меломан!</h2>
      <div className="main-stat">
        За&nbsp;{minutes}:{seconds}&nbsp;минуты вы&nbsp;отгадали{' '}
        {correctAnswers}&nbsp;мелодии
      </div>
      <span className="main-comparison">
        Это&nbsp;лучше чем у&nbsp;{percent}%&nbsp;игроков
      </span>
    </div>
  );
}

const SuccessScreen = ({ children }) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const loading = useSelector(getLoading);
  const results = useSelector(getResults);


  useEffect(() => {
    dispatch(loadAllResultsRequest());
  }, [])

  if (loading) return <Preloader />;
  return (
    <section className="main main--result">
      <section className="logo" title="Угадай мелодию">
        <h1>Угадай мелодию</h1>
      </section>
      {getDescription(id, results)}
      { children }
    </section>
  );
}

export default SuccessScreen
