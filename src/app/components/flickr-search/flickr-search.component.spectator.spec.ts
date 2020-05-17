import { HttpBackend, JsonpClientBackend } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockComponents } from 'ng-mocks';

import { photo1, photos } from '../../spec-helpers/photo.spec-helper';
import { FullPhotoComponent } from '../full-photo/full-photo.component';
import { PhotoListComponent } from '../photo-list/photo-list.component';
import { SearchFormComponent } from '../search-form/search-form.component';
import { FlickrSearchComponent } from './flickr-search.component';

describe('FlickrSearchComponent with spectator', () => {
  let spectator: Spectator<FlickrSearchComponent>;

  let searchForm: SearchFormComponent | null;
  let photoList: PhotoListComponent | null;
  let fullPhoto: FullPhotoComponent | null;

  const createComponent = createComponentFactory({
    component: FlickrSearchComponent,
    shallow: true,
    imports: [HttpClientTestingModule],
    declarations: [
      MockComponents(SearchFormComponent, PhotoListComponent, FullPhotoComponent),
    ],
    providers: [
      // See https://github.com/angular/angular/issues/20878 and
      // https://stackoverflow.com/questions/47703877/
      { provide: JsonpClientBackend, useExisting: HttpBackend },
    ],
  });

  beforeEach(() => {
    spectator = createComponent();

    searchForm = spectator.query(SearchFormComponent);
    photoList = spectator.query(PhotoListComponent);
    fullPhoto = spectator.query(FullPhotoComponent);
  });

  it('renders the search form and the photo list, not the full photo', () => {
    expect(searchForm).toBeTruthy();
    expect(photoList).toBeTruthy();
    expect(fullPhoto).toBeNull();
  });

  it('searches and passes the resulting photos to the photo list', () => {
    if (!(photoList && searchForm)) {
      throw new Error('photoList or searchForm not found');
    }
    expect(photoList.title).toBe('');
    expect(photoList.photos).toEqual([]);

    const searchTerm = 'beautiful flowers';
    searchForm.search.emit(searchTerm);

    const httpMock: HttpTestingController = TestBed.inject(HttpTestingController);
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    const expectedUrl = `https://api.flickr.com/services/feeds/photos_public.gne?tags=${encodedSearchTerm}&tagmode=all&format=json`;
    const matchedRequest = httpMock.expectOne((request) => request.url === expectedUrl);
    matchedRequest.flush({ items: photos });
    httpMock.verify();

    spectator.detectChanges();

    expect(photoList.title).toBe(searchTerm);
    expect(photoList.photos).toBe(photos);
  });

  it('renders the full photo when a photo is focussed', () => {
    expect(fullPhoto).toBeNull();

    if (!photoList) {
      throw new Error('photoList not found');
    }
    photoList.focusPhoto.emit(photo1);

    spectator.detectChanges();

    fullPhoto = spectator.query(FullPhotoComponent);
    if (!fullPhoto) {
      throw new Error('fullPhoto not found');
    }
    expect(fullPhoto.photo).toBe(photo1);
  });
});
