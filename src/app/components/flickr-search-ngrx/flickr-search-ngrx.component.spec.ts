import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { focusPhoto, search } from '../../actions/photos.actions';
import { AppState } from '../../reducers';
import { findComponent } from '../../spec-helpers/element.spec-helper';
import {
  initialState,
  photo1,
  searchTerm,
  stateWithCurrentPhoto,
  stateWithPhotos,
} from '../../spec-helpers/photo.spec-helper';

import { FlickrSearchNgrxComponent } from './flickr-search-ngrx.component';

describe('FlickrSearchNgrxComponent', () => {
  let fixture: ComponentFixture<FlickrSearchNgrxComponent>;
  let store$: Store<AppState>;

  let searchForm: DebugElement;
  let photoList: DebugElement;

  async function setup(state: AppState): Promise<void> {
    await TestBed.configureTestingModule({
      declarations: [FlickrSearchNgrxComponent],
      providers: [provideMockStore({ initialState: state })],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    store$ = TestBed.inject(Store);
    spyOn(store$, 'dispatch');

    fixture = TestBed.createComponent(FlickrSearchNgrxComponent);
    fixture.detectChanges();

    searchForm = findComponent(fixture, 'app-search-form');
    photoList = findComponent(fixture, 'app-photo-list');
  }

  describe('initial state', () => {
    beforeEach(async () => {
      await setup({ photos: initialState });
    });

    it('renders the search form and the photo list, not the full photo', () => {
      expect(searchForm).toBeTruthy();
      expect(photoList).toBeTruthy();
      expect(photoList.properties.title).toBe(initialState.searchTerm);
      expect(photoList.properties.photos).toEqual(initialState.photos);

      expect(() => {
        findComponent(fixture, 'app-full-photo');
      }).toThrow();
    });

    it('searches', () => {
      searchForm.triggerEventHandler('search', searchTerm);

      expect(store$.dispatch).toHaveBeenCalledWith(search({ searchTerm }));
    });
  });

  describe('with photos', () => {
    beforeEach(async () => {
      await setup({ photos: stateWithPhotos });
    });

    it('passes the photos to the photo list', () => {
      expect(photoList.properties.photos).toEqual(stateWithPhotos.photos);
    });

    it('focusses a photo', () => {
      photoList.triggerEventHandler('focusPhoto', photo1);

      expect(store$.dispatch).toHaveBeenCalledWith(focusPhoto({ photo: photo1 }));
    });
  });

  describe('with current photo', () => {
    beforeEach(async () => {
      await setup({ photos: stateWithCurrentPhoto });
    });

    it('renders the full photo', () => {
      const fullPhoto = findComponent(fixture, 'app-full-photo');
      expect(fullPhoto.properties.photo).toEqual(photo1);
    });
  });
});
