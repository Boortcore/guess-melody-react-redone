import { useEffect } from 'react';

import { getQuestion, getCurrentLevel, getLoading } from '../../4.entities/game/game-slice';
import { loadQuestionsRequest } from '../../4.entities/game/actions';
 
import { useAppDispatch } from '../../4.entities/game/game-slice';
import { getNextLevel } from '../../3.features/get-next-level';
import { Preloader } from '../../4.entities/preloader';
import { useSelector } from 'react-redux';
import { Timer } from '../../2.widgets/timer';
import { getToNextLevelControl } from '../../3.features/go-to-next-level';

type Props = {
  disabled: boolean;
  answers: any;
}

const GameScreen = () => {
  const question = useSelector(getQuestion)
  const levelNumber = useSelector(getCurrentLevel)
  const loading = useSelector(getLoading)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadQuestionsRequest())
  }, []);
  
  if (loading) return <Preloader />;
  const { type } = question;
  const NextLevel = getNextLevel(type); 
  const ToNextLevelControl = getToNextLevelControl(type);

  return (
    <>
      <Timer/>
      <NextLevel
        key={levelNumber}
        question={question}
      >
        { (props: Props) => <ToNextLevelControl {...props} />}
      </NextLevel>
    </>
  );

}
export default GameScreen