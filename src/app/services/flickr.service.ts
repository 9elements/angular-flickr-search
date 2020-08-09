import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FlickrAPIResponse } from '../models/flickr-photo';
import { Photo } from '../models/photo';

@Injectable()
export class FlickrService {
  constructor(private http: HttpClient) {}

  public searchPublicPhotos(searchTerm: string): Observable<Photo[]> {
    return this.http
      .get<FlickrAPIResponse>('https://www.flickr.com/services/rest/', {
        params: {
          method: 'flickr.photos.search',
          format: 'json',
          nojsoncallback: '1',
          api_key: 'c3050d39a5bb308d9921bef0e15c437d',
          tags: searchTerm,
          tag_mode: 'all',
          media: 'photos',
          per_page: '15',
          extras: 'tags,date_taken,owner_name,url_q,url_m',
        },
      })
      .pipe(
        map((response) =>
          response.photos.photo.map(
            (flickrPhoto): Photo => ({
              id: flickrPhoto.id,
              link: `https://www.flickr.com/photos/${flickrPhoto.owner}/${flickrPhoto.id}/`,
              title: flickrPhoto.title,
              tags: flickrPhoto.tags,
              ownerName: flickrPhoto.ownername,
              dateTaken: flickrPhoto.datetaken,
              urlQ: flickrPhoto.url_q,
              urlM: flickrPhoto.url_m,
            }),
          ),
        ),
      );
  }
}
