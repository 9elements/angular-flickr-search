import { byTestId, createComponentFactory, Spectator } from '@ngneat/spectator';

import { Photo } from '../../models/photo';
import { photo1, photo2Link } from '../../spec-helpers/photo.spec-helper';
import { PhotoItemComponent } from './photo-item.component';

describe('PhotoItemComponent with spectator', () => {
  let spectator: Spectator<PhotoItemComponent>;

  const createComponent = createComponentFactory({
    component: PhotoItemComponent,
    shallow: true,
  });

  beforeEach(() => {
    spectator = createComponent({ props: { photo: photo1 } });
  });

  it('renders a link and a thumbnail', () => {
    const link = spectator.query(byTestId('photo-item-link'));
    expect(link).toHaveAttribute('href', photo2Link);

    const img = spectator.query(byTestId('photo-item-image'));
    expect(img).toHaveAttribute('src', photo1.url_q);
    expect(img).toHaveAttribute('alt', photo1.title);
  });

  it('focusses a photo on click', () => {
    let photo: Photo | undefined;

    spectator.component.focusPhoto.subscribe((otherPhoto: Photo) => {
      photo = otherPhoto;
    });

    spectator.click(byTestId('photo-item-link'));

    expect(photo).toBe(photo1);
  });

  it('does nothing when the photo is null', () => {
    spectator.component.photo = null;
    spectator.detectChanges();

    expect(spectator.query(byTestId('photo-item-link'))).not.toExist();
  });
});
