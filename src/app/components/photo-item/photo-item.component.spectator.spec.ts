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
    const link = spectator.query(byTestId('link'));
    expect(link).toHaveAttribute('href', photo2Link);

    const img = spectator.query(byTestId('image'));
    expect(img).toHaveAttribute('src', photo1.url_q);
    expect(img).toHaveAttribute('alt', photo1.title);
  });

  it('focusses a photo on click', (done: DoneFn) => {
    spectator.component.focusPhoto.subscribe((otherPhoto: Photo) => {
      expect(otherPhoto).toBe(photo1);
      done();
    });

    const link = spectator.query(byTestId('link'));
    if (!link) {
      throw new Error('link not found');
    }
    spectator.click(link);
  });
});
