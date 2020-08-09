import { HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';

import { flickrPhotos, photos, searchTerm } from '../spec-helpers/photo.spec-helper';
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

  it('searches for public photos', async(() => {
    flickrService.searchPublicPhotos(searchTerm).subscribe((foundPhotos) => {
      expect(foundPhotos).toEqual(photos);
    });

    controller.expectOne(expectedUrl).flush({ photos: { photo: flickrPhotos } });
  }));

  it('passes through search errors', async(() => {
    const status = 500;
    const statusText = 'Server error';
    const errorEvent = new ErrorEvent('API error');

    flickrService.searchPublicPhotos(searchTerm).subscribe(
      fail,
      (error: HttpErrorResponse) => {
        expect(error.error).toBe(errorEvent);
        expect(error.status).toBe(status);
        expect(error.statusText).toBe(statusText);
      },
      fail,
    );

    controller.expectOne(expectedUrl).error(errorEvent, { status, statusText });
    controller.verify();
  }));
});
