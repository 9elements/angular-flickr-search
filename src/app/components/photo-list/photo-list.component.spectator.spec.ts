import { byTestId, createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';

import { photo1, photo2 } from '../../spec-helpers/photo.spec-helper';
import { PhotoItemComponent } from '../photo-item/photo-item.component';
import { PhotoListComponent } from './photo-list.component';
import { Photo } from 'src/app/models/photo';

const title = 'Hello World';
const photos = [photo1, photo2];

describe('PhotoListComponent with spectator', () => {
  let spectator: Spectator<PhotoListComponent>;

  const createComponent = createComponentFactory({
    component: PhotoListComponent,
    declarations: [MockComponent(PhotoItemComponent)],
    shallow: true,
  });

  beforeEach(() => {
    spectator = createComponent({ props: { title, photos } });
  });

  it('renders the title', () => {
    expect(spectator.query(byTestId('title'))).toHaveText(title);
  });

  it('renders photo items', () => {
    const photoItems = spectator.queryAll(PhotoItemComponent);
    expect(photoItems.length).toBe(photos.length);
    photoItems.forEach((photoItem, i) => {
      expect(photoItem.photo).toBe(photos[i]);
    });
  });

  it('focusses a photo', (done: DoneFn) => {
    const photoItem = spectator.query(PhotoItemComponent);
    if (!photoItem) {
      throw new Error('photoItem not found');
    }

    spectator.component.focusPhoto.subscribe((otherPhoto: Photo) => {
      expect(otherPhoto).toBe(photo1);
      done();
    });

    photoItem.focusPhoto.emit(photo1);
  });
});
