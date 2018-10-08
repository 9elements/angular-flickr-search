import { Component } from '@angular/core';
import jsonp from 'jsonp';

import { Photo } from '../models/photo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  searchTerm = '';
  photos: Photo[] = [];
  currentPhoto: Photo | null = null;

  handleSearch(searchTerm: string) {
    // Make the JSONP request to Flickr
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    const url = `http://api.flickr.com/services/feeds/photos_public.gne?tags=${encodedSearchTerm}&tagmode=all&format=json`;
    jsonp(url, { param: 'jsoncallback' }, (err, data) => {
      console.log(data.items);
      if (err) {
        return;
      }
      this.searchTerm = searchTerm;
      this.photos = data.items;
      this.currentPhoto = null;
    });
  }

  handleFocusPhoto(photo: Photo) {
    console.log('handleFocusPhoto', photo);
    this.currentPhoto = photo;
  }

}
