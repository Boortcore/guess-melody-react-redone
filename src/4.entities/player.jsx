import { useRef, useState } from 'react';

export const Player = (props) => {
  const [paused, setPaused] = useState(false);
  const player = useRef(null);
  const onClickPlay = (e) => {
    e.preventDefault();
    const { paused } = player;
    setPaused(paused);
    if (paused) {
      player.play();
    } else {
      player.pause();
    }
  };
  return (
    <div className="player">
      <audio
        ref={player}
        src={props.src}
      ></audio>
      <button onClick={onClickPlay} className="player-control">
        {paused ? 'Pause' : 'Play'}
      </button>
      <div className="player-track">
        <span className="player-status"></span>
      </div>
    </div>
  );
}
