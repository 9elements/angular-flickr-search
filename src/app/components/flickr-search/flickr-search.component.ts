import { Component } from '@angular/core';
import { FlickrService } from 'src/app/services/flickr.service';

import { Photo } from '../../models/photo';

@Component({
  selector: 'app-flickr-search',
  templateUrl: './flickr-search.component.html',
  styleUrls: ['./flickr-search.component.css'],
})
export class FlickrSearchComponent {
  public searchTerm = '';
  public photos: Photo[] = [];
  public currentPhoto: Photo | null = null;

  constructor(private flickrService: FlickrService) {}

  public handleSearch(searchTerm: string): void {
    this.flickrService.searchPublicPhotos(searchTerm).subscribe((photos) => {
      this.searchTerm = searchTerm;
      this.photos = photos;
      this.currentPhoto = null;
    });
  }

  public handleFocusPhoto(photo: Photo): void {
    this.currentPhoto = photo;
  }
}
