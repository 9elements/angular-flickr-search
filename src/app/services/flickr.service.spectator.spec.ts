import { HttpErrorResponse } from '@angular/common/http';
import { async } from '@angular/core/testing';
import { createHttpFactory, HttpMethod } from '@ngneat/spectator';

import { flickrPhotos, photos, searchTerm } from '../spec-helpers/photo.spec-helper';
import { FlickrService } from './flickr.service';

const encodedSearchTerm = encodeURIComponent(searchTerm);
const expectedUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=c3050d39a5bb308d9921bef0e15c437d&tags=${encodedSearchTerm}&tag_mode=all&media=photos&per_page=15&extras=tags,date_taken,owner_name,url_q,url_m`;

describe('FlickrService', () => {
  const createHttp = createHttpFactory({
    service: FlickrService,
  });

  it('searches for public photos', async(() => {
    const { service, controller } = createHttp();

    service.searchPublicPhotos(searchTerm).subscribe((foundPhotos) => {
      expect(foundPhotos).toEqual(photos);
    });

    controller.expectOne(expectedUrl).flush({ photos: { photo: flickrPhotos } });
  }));

  it('passes through search errors', async(() => {
    const { service, expectOne } = createHttp();

    const status = 500;
    const statusText = 'Server error';
    const errorEvent = new ErrorEvent('API error');

    service.searchPublicPhotos(searchTerm).subscribe(
      fail,
      (error: HttpErrorResponse) => {
        expect(error.error).toBe(errorEvent);
        expect(error.status).toBe(status);
        expect(error.statusText).toBe(statusText);
      },
      fail,
    );

    expectOne(expectedUrl, HttpMethod.GET).error(errorEvent, { status, statusText });
    // Spectator verifies the HTTP testing controller automatically
  }));
});
