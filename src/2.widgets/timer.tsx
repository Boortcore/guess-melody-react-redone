import { useEffect } from 'react';
import { RADIUS } from '../5.shared/constants';
import { useTimer } from '../5.shared/hooks/useTimer';
import { useSelector } from 'react-redux';
import { getMaxTime, getStartTime, getTime, useAppDispatch } from '../4.entities/game/game-slice';
import { changeTimeRequest } from '../4.entities/game/actions';
const lengthRound = Math.round(2 * Math.PI * RADIUS);

export const Timer = () => {
  const startTime = useSelector(getStartTime);
  const leftTime = useSelector(getTime);
  const maxTime = useSelector(getMaxTime);
  const dispatch = useAppDispatch();
  const { value } = useTimer(startTime);
  const shadowRound = lengthRound / maxTime;
  const timerView = shadowRound * (maxTime - leftTime);
  
  const minutes = String(Math.floor(leftTime / 60)).padStart(2, `0`);
  const seconds = String(Math.floor(leftTime % 60)).padStart(2, `0`);

  useEffect(() => {
    dispatch(changeTimeRequest(Math.floor(value / 1000)));
  }, [value]);

  return (
    <div className="main-timer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="timer"
        viewBox="0 0 780 780"
        strokeDasharray={lengthRound}
        strokeDashoffset={timerView}
      >
        <circle
          cx="390"
          cy="390"
          r="370"
          className="timer-line"
          style={{
            filter: 'url(#blur)',
            transform: 'rotate(-90deg) scaleY(-1)',
            transformOrigin: 'center',
          }}
        ></circle>
      </svg>
      <div className="timer-value">
        <span className="timer-value-mins">{minutes}</span>
        <span className="timer-value-dots">:</span>
        <span className="timer-value-secs">{seconds}</span>
      </div>
    </div>
  );
}
