import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Photo } from '../../models/photo';
import { AppState } from '../../reducers';
import { searchTermSelector, photosSelector, currentPhotoSelector } from '../../selectors/photos.selectors';
import { search, focusPhoto } from '../../actions/photos.actions';

@Component({
  selector: 'app-flickr-search-ngrx',
  templateUrl: './flickr-search-ngrx.component.html',
  styleUrls: ['./flickr-search-ngrx.component.css']
})
export class FlickrSearchNgrxComponent {

  searchTerm$: Observable<string>;
  photos$: Observable<Photo[]>;
  currentPhoto$: Observable<Photo | null>;

  constructor(private store$: Store<AppState>) {
    this.searchTerm$ = this.store$.pipe(select(searchTermSelector));
    this.photos$ = this.store$.pipe(select(photosSelector));
    this.currentPhoto$ = this.store$.pipe(select(currentPhotoSelector));
  }

  handleSearch(searchTerm: string) {
    this.store$.dispatch(search({ searchTerm }));
  }

  handleFocusPhoto(photo: Photo) {
    this.store$.dispatch(focusPhoto({ photo }));
  }

}
