import { createReducer, on, Action } from '@ngrx/store';

import { focusPhoto, search, searchResultsLoaded } from '../actions/photos.actions';
import { PhotosStateSlice } from './photos-state-slice';

export const initialState: PhotosStateSlice = {
  searchTerm: '',
  photos: [],
  currentPhoto: null,
};

const reducer = createReducer(
  initialState,
  on(search, (state, { searchTerm }) => ({
    ...state,
    searchTerm,
    currentPhoto: null,
  })),
  on(searchResultsLoaded, (state, { photos }) => ({
    ...state,
    photos,
  })),
  on(focusPhoto, (state, { photo }) => ({
    ...state,
    currentPhoto: photo,
  })),
);

export function photosReducer(
  state: PhotosStateSlice | undefined,
  action: Action,
): PhotosStateSlice {
  return reducer(state, action);
}
