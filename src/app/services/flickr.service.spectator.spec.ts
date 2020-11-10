import { HttpErrorResponse } from '@angular/common/http';
import { createHttpFactory, HttpMethod } from '@ngneat/spectator';

import { Photo } from '../models/photo';
import { photos, searchTerm } from '../spec-helpers/photo.spec-helper';
import { FlickrService } from './flickr.service';

const encodedSearchTerm = encodeURIComponent(searchTerm);
const expectedUrl = `https://www.flickr.com/services/rest/?tags=${encodedSearchTerm}&method=flickr.photos.search&format=json&nojsoncallback=1&tag_mode=all&media=photos&per_page=15&extras=tags,date_taken,owner_name,url_q,url_m&api_key=c3050d39a5bb308d9921bef0e15c437d`;

describe('FlickrService', () => {
  const createHttp = createHttpFactory({
    service: FlickrService,
  });

  it('searches for public photos', () => {
    const { service, controller } = createHttp();

    let actualPhotos: Photo[] | undefined;
    service.searchPublicPhotos(searchTerm).subscribe((otherPhotos) => {
      actualPhotos = otherPhotos;
    });

    controller.expectOne(expectedUrl).flush({ photos: { photo: photos } });
    expect(actualPhotos).toEqual(photos);

    // Spectator verifies the HTTP testing controller automatically
  });

  it('passes through search errors', () => {
    const { service, expectOne } = createHttp();

    const status = 500;
    const statusText = 'Internal Server Error';
    const errorEvent = new ErrorEvent('API error');

    let actualError: HttpErrorResponse | undefined;

    service.searchPublicPhotos(searchTerm).subscribe(
      () => {
        fail('next handler must not be called');
      },
      (error) => {
        actualError = error;
      },
      () => {
        fail('complete handler must not be called');
      },
    );

    expectOne(expectedUrl, HttpMethod.GET).error(errorEvent, { status, statusText });

    if (!actualError) {
      throw new Error('Error needs to be defined');
    }
    expect(actualError.error).toBe(errorEvent);
    expect(actualError.status).toBe(status);
    expect(actualError.statusText).toBe(statusText);

    // Spectator verifies the HTTP testing controller automatically
  });
});
