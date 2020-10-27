import { byTestId, createComponentFactory, Spectator } from '@ngneat/spectator';

import { photo1, photo1Link } from '../../spec-helpers/photo.spec-helper';
import { FullPhotoComponent } from './full-photo.component';

describe('FullPhotoComponent with spectator', () => {
  let spectator: Spectator<FullPhotoComponent>;

  const createComponent = createComponentFactory({
    component: FullPhotoComponent,
    shallow: true,
  });

  beforeEach(() => {
    spectator = createComponent({ props: { photo: photo1 } });
  });

  it('renders the photo information', () => {
    expect(spectator.query(byTestId('full-photo-title'))).toHaveText(photo1.title);

    const img = spectator.query(byTestId('full-photo-image'));
    expect(img).toHaveAttribute('src', photo1.url_m);
    expect(img).toHaveAttribute('alt', photo1.title);

    expect(spectator.query(byTestId('full-photo-ownername'))).toHaveText(
      photo1.ownername,
    );
    expect(spectator.query(byTestId('full-photo-datetaken'))).toHaveText(
      photo1.datetaken,
    );
    expect(spectator.query(byTestId('full-photo-tags'))).toHaveText(photo1.tags);

    const link = spectator.query(byTestId('full-photo-link'));
    expect(link).toHaveAttribute('href', photo1Link);
    expect(link).toHaveText(photo1Link);
  });
});
