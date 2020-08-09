import { byTestId, createComponentFactory, Spectator } from '@ngneat/spectator';

import { photo1 } from '../../spec-helpers/photo.spec-helper';
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
    expect(spectator.query(byTestId('title'))).toHaveText(photo1.title);

    const img = spectator.query(byTestId('image'));
    expect(img).toHaveAttribute('src', photo1.urlM);
    expect(img).toHaveAttribute('alt', photo1.title);

    expect(spectator.query(byTestId('ownerName'))).toHaveText(photo1.ownerName);
    expect(spectator.query(byTestId('dateTaken'))).toHaveText(photo1.dateTaken);
    expect(spectator.query(byTestId('tags'))).toHaveText(photo1.tags);

    const link = spectator.query(byTestId('link'));
    expect(link).toHaveAttribute('href', photo1.link);
    expect(link).toHaveText(photo1.link);
  });
});
