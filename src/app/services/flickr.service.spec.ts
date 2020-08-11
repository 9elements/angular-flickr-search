import { HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Photo } from '../models/photo';
import { photos, searchTerm } from '../spec-helpers/photo.spec-helper';
import { FlickrService } from './flickr.service';

const encodedSearchTerm = encodeURIComponent(searchTerm);
const expectedUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=c3050d39a5bb308d9921bef0e15c437d&tags=${encodedSearchTerm}&tag_mode=all&media=photos&per_page=15&extras=tags,date_taken,owner_name,url_q,url_m`;

describe('FlickrService', () => {
  let flickrService: FlickrService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FlickrService],
    });
    flickrService = TestBed.inject(FlickrService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('searches for public photos', () => {
    let actualPhotos: Photo[] | undefined;
    flickrService.searchPublicPhotos(searchTerm).subscribe((_actualPhotos) => {
      actualPhotos = _actualPhotos;
    });

    controller.expectOne(expectedUrl).flush({ photos: { photo: photos } });
    expect(actualPhotos).toEqual(photos);
  });

  it('passes through search errors', () => {
    const status = 500;
    const statusText = 'Server error';
    const errorEvent = new ErrorEvent('API error');

    let actualError: HttpErrorResponse | undefined;

    flickrService.searchPublicPhotos(searchTerm).subscribe(
      fail,
      (error) => {
        actualError = error;
      },
      fail,
    );

    controller.expectOne(expectedUrl).error(errorEvent, { status, statusText });

    if (!actualError) {
      throw new Error('Error needs to be defined');
    }
    expect(actualError.error).toBe(errorEvent);
    expect(actualError.status).toBe(status);
    expect(actualError.statusText).toBe(statusText);
  });
});
