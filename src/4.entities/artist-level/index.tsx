import { Player } from '../player';

export const ArtistLevel = ({ question, children }) => {

  return (
    <section className="main main--level main--level-artist">
      <div className="main-wrap">
        <h2 className="title main-title">Кто исполняет эту песню?</h2>
        <div className="player-wrapper">
          <Player src={question.src} />
        </div>
        <form className="main-list">
          {children()}
        </form>
      </div>
    </section>
  );
}

