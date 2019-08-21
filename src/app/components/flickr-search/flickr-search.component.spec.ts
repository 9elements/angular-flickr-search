import { HttpBackend, JsonpClientBackend } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { findComponent } from '../../spec-helpers/element.spec-helper';
import { photo1, photos } from '../../spec-helpers/photo.spec-helper';

import { FlickrSearchComponent } from './flickr-search.component';

describe('FlickrSearchComponent', () => {
  let fixture: ComponentFixture<FlickrSearchComponent>;
  let component: FlickrSearchComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        FlickrSearchComponent
      ],
      providers: [
        // See https://github.com/angular/angular/issues/20878 and
        // https://stackoverflow.com/questions/47703877/
        { provide: JsonpClientBackend, useExisting: HttpBackend }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlickrSearchComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('renders a search form', () => {
    const searchForm = findComponent(fixture, 'app-search-form');
    expect(searchForm).toBeTruthy();
  });

  it('searches and passes the resulting photos to the photo list', () => {
    const searchForm = findComponent(fixture, 'app-search-form');
    const photoList = findComponent(fixture, 'app-photo-list');

    expect(photoList.properties.title).toBe('');
    expect(photoList.properties.photos).toEqual([]);

    const searchTerm = 'beautiful flowers';
    searchForm.triggerEventHandler('search', searchTerm);

    const httpMock: HttpTestingController = TestBed.get(HttpTestingController);
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    const expectedUrl = `http://api.flickr.com/services/feeds/photos_public.gne?tags=${encodedSearchTerm}&tagmode=all&format=json`;
    const matchedRequest = httpMock.expectOne((request) =>
      request.url === expectedUrl
    );
    matchedRequest.flush({ items: photos });
    httpMock.verify();

    fixture.detectChanges();

    expect(photoList.properties.title).toBe(searchTerm);
    expect(photoList.properties.photos).toBe(photos);
  });

  it('renders the full photo when a photo is focussed', () => {
    expect(() => {
      findComponent(fixture, 'app-full-photo');
    }).toThrow();

    const photoList = findComponent(fixture, 'app-photo-list');
    photoList.triggerEventHandler('focusPhoto', photo1);

    fixture.detectChanges();

    const fullPhoto = findComponent(fixture, 'app-full-photo');
    expect(fullPhoto.properties.photo).toBe(photo1);
  });

});
