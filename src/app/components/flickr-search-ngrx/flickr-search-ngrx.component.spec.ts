import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { focusPhoto, search } from '../../actions/photos.actions';
import { AppState } from '../../reducers';
import { findComponent } from '../../spec-helpers/element.spec-helper';
import { initialState, photo1, searchTerm, stateWithCurrentPhoto, stateWithPhotos } from '../../spec-helpers/photo.spec-helper';

import { FlickrSearchNgrxComponent } from './flickr-search-ngrx.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<FlickrSearchNgrxComponent>;
  let store: Store<AppState>;

  function setup(state: AppState) {
    TestBed.configureTestingModule({
      declarations: [FlickrSearchNgrxComponent],
      providers: [provideMockStore({ initialState: state })],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    store = TestBed.get(Store);
    spyOn(store, 'dispatch');

    fixture = TestBed.createComponent(FlickrSearchNgrxComponent);
    fixture.detectChanges();
  }

  describe('initial state', () => {
    beforeEach(() => {
      setup({ photos: initialState });
    });

    it('renders the search form and the photo list, not the full photo', () => {
      const searchForm = findComponent(fixture, 'app-search-form');
      const photoList = findComponent(fixture, 'app-photo-list');

      expect(searchForm).toBeTruthy();
      expect(photoList).toBeTruthy();
      expect(photoList.properties.title).toBe(initialState.searchTerm);
      expect(photoList.properties.photos).toEqual(initialState.photos);

      expect(() => {
        findComponent(fixture, 'app-full-photo');
      }).toThrow();
    });

    it('searches', () => {
      const searchForm = findComponent(fixture, 'app-search-form');
      searchForm.triggerEventHandler('search', searchTerm);

      expect(store.dispatch).toHaveBeenCalledWith(search({ searchTerm }));
    });
  });

  describe('with photos', () => {
    beforeEach(() => {
      setup({ photos: stateWithPhotos });
    });

    it('renders the search form and the photo list, not the full photo', () => {
      const searchForm = findComponent(fixture, 'app-search-form');
      const photoList = findComponent(fixture, 'app-photo-list');

      expect(searchForm).toBeTruthy();
      expect(photoList).toBeTruthy();
      expect(photoList.properties.title).toBe(stateWithPhotos.searchTerm);
      expect(photoList.properties.photos).toEqual(stateWithPhotos.photos);

      expect(() => {
        findComponent(fixture, 'app-full-photo');
      }).toThrow();
    });

    it('focusses a photo', () => {
      const photoList = findComponent(fixture, 'app-photo-list');
      photoList.triggerEventHandler('focusPhoto', photo1);

      expect(store.dispatch).toHaveBeenCalledWith(
        focusPhoto({ photo: photo1 })
      );
    });
  });

  describe('with current photo', () => {
    beforeEach(() => {
      setup({ photos: stateWithCurrentPhoto });
    });

    it('renders the full photo when a photo is focussed', () => {
      const fullPhoto = findComponent(fixture, 'app-full-photo');
      expect(fullPhoto.properties.photo).toEqual(photo1);
    });
  });
});
