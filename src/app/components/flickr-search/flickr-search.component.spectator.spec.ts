import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator';
import { MockComponents } from 'ng-mocks';
import { of } from 'rxjs';
import { FlickrService } from 'src/app/services/flickr.service';

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
    declarations: [
      MockComponents(SearchFormComponent, PhotoListComponent, FullPhotoComponent),
    ],
    providers: [mockProvider(FlickrService)],
  });

  beforeEach(() => {
    spectator = createComponent();

    spectator.inject(FlickrService).searchPublicPhotos.and.returnValue(of(photos));

    searchForm = spectator.query(SearchFormComponent);
    photoList = spectator.query(PhotoListComponent);
    fullPhoto = spectator.query(FullPhotoComponent);
  });

  it('renders the search form and the photo list, not the full photo', () => {
    if (!(searchForm && photoList)) {
      throw new Error('searchForm or photoList not found');
    }
    expect(photoList.title).toBe('');
    expect(photoList.photos).toEqual([]);
    expect(fullPhoto).not.toExist();
  });

  it('searches and passes the resulting photos to the photo list', () => {
    if (!(searchForm && photoList)) {
      throw new Error('searchForm or photoList not found');
    }
    const searchTerm = 'beautiful flowers';
    searchForm.search.emit(searchTerm);

    spectator.detectChanges();

    const flickrService = spectator.inject(FlickrService);
    expect(flickrService.searchPublicPhotos).toHaveBeenCalledWith(searchTerm);
    expect(photoList.title).toBe(searchTerm);
    expect(photoList.photos).toBe(photos);
  });

  it('renders the full photo when a photo is focussed', () => {
    expect(fullPhoto).not.toExist();

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
