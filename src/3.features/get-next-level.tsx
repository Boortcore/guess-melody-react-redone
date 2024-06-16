import { GENRE_TYPE, ARTIST_TYPE } from '../5.shared/constants';
import { GenreLevel } from '../4.entities/genre-level';
import { ArtistLevel } from '../4.entities/artist-level';

export const getNextLevel = (type) => {
  switch (type) {
  case GENRE_TYPE:
    return GenreLevel;
  case ARTIST_TYPE:
    return ArtistLevel;
  }
};