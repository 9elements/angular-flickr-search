import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PhotosStateSlice } from '../reducers/photos-state-slice';

const featureKey = 'photos';

export const selectPhotos = createFeatureSelector<PhotosStateSlice>(featureKey);

export const searchTermSelector = createSelector(
  selectPhotos,
  (photosStateSlice) => photosStateSlice.searchTerm,
);

export const photosSelector = createSelector(
  selectPhotos,
  (photosStateSlice) => photosStateSlice.photos,
);

export const currentPhotoSelector = createSelector(
  selectPhotos,
  (photosStateSlice) => photosStateSlice.currentPhoto,
);
