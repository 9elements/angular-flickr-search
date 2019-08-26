import { focusPhoto, search, searchResultsLoaded } from '../actions/photos.actions';
import {
  initialState,
  photo1,
  photos,
  searchTerm,
  stateWithCurrentPhoto,
  stateWithPhotos,
  stateWithSearchTerm
} from '../spec-helpers/photo.spec-helper';
import { photosReducer } from './photos.reducer';

describe('photosReducer', () => {
  it('returns an initial state', () => {
    const state = photosReducer(undefined, { type: 'init' });
    expect(state).toEqual(initialState);
  });

  it('stores the search term', () => {
    const state = photosReducer(initialState, search({ searchTerm }));
    expect(state).toEqual(stateWithSearchTerm);
  });

  it('stores the search results', () => {
    const state = photosReducer(stateWithSearchTerm, searchResultsLoaded({ photos }));
    expect(state).toEqual(stateWithPhotos);
  });

  it('focusses a photo', () => {
    const state = photosReducer(stateWithPhotos, focusPhoto({ photo: photo1 }));
    expect(state).toEqual(stateWithCurrentPhoto);
  });
});
