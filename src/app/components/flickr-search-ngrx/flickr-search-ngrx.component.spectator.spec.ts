import { TestBed } from '@angular/core/testing';
import { createTestComponentFactory, Spectator } from '@netbasal/spectator';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { MockComponents } from 'ng-mocks';
import { focusPhoto, search } from 'src/app/actions/photos.actions';
import { AppState } from 'src/app/reducers';

import {
  initialState,
  photo1,
  searchTerm,
  stateWithCurrentPhoto,
  stateWithPhotos,
} from '../../spec-helpers/photo.spec-helper';
import { FullPhotoComponent } from '../full-photo/full-photo.component';
import { PhotoListComponent } from '../photo-list/photo-list.component';
import { SearchFormComponent } from '../search-form/search-form.component';
import { FlickrSearchNgrxComponent } from './flickr-search-ngrx.component';

describe('FlickrSearchNgrxComponent with spectator', () => {
  let spectator: Spectator<FlickrSearchNgrxComponent>;
  let store$: Store<AppState>;
  let create: () => Spectator<FlickrSearchNgrxComponent>;

  let searchForm: SearchFormComponent;
  let photoList: PhotoListComponent;
  let fullPhoto: FullPhotoComponent;

  function setup(state: AppState): void {
    create = createTestComponentFactory({
      component: FlickrSearchNgrxComponent,
      shallow: true,
      declarations: [
        MockComponents(SearchFormComponent, PhotoListComponent, FullPhotoComponent),
      ],
      providers: [provideMockStore({ initialState: state })],
    });

    beforeEach(() => {
      store$ = TestBed.get(Store);
      spyOn(store$, 'dispatch');

      spectator = create();

      searchForm = spectator.query(SearchFormComponent);
      photoList = spectator.query(PhotoListComponent);
      fullPhoto = spectator.query(FullPhotoComponent);
    });
  }

  describe('initial state', () => {
    setup({ photos: initialState });

    it('renders the search form and the photo list, not the full photo', () => {
      expect(searchForm).toBeTruthy();
      expect(photoList).toBeTruthy();
      expect(photoList.title).toEqual(initialState.searchTerm);
      expect(photoList.photos).toEqual(initialState.photos);

      expect(fullPhoto).toBeNull();
    });

    it('searches', () => {
      searchForm.search.emit(searchTerm);

      expect(store$.dispatch).toHaveBeenCalledWith(search({ searchTerm }));
    });
  });

  describe('with photos', () => {
    setup({ photos: stateWithPhotos });

    it('passes the photos to the photo list', () => {
      expect(photoList.photos).toEqual(stateWithPhotos.photos);
    });

    it('focusses a photo', () => {
      photoList.focusPhoto.emit(photo1);

      expect(store$.dispatch).toHaveBeenCalledWith(focusPhoto({ photo: photo1 }));
    });
  });

  describe('with current photo', () => {
    setup({ photos: stateWithCurrentPhoto });

    it('renders the full photo', () => {
      expect(fullPhoto.photo).toEqual(photo1);
    });
  });
});
