import { byTestId, createTestComponentFactory, Spectator } from '@netbasal/spectator';

import { photo1 } from '../../spec-helpers/photo.spec-helper';
import { FullPhotoComponent } from './full-photo.component';

describe('FullPhotoComponent with spectator', () => {
  let spectator: Spectator<FullPhotoComponent>;

  const create = createTestComponentFactory({
    component: FullPhotoComponent,
    shallow: true
  });

  beforeEach(() => {
    spectator = create({ photo: photo1 });
  });

  it('renders the photo information', () => {
    expect(spectator.query(byTestId('title'))).toHaveText(photo1.title);

    const img = spectator.query(byTestId('image'));
    expect(img).toHaveAttribute('src', photo1.media.m);
    expect(img).toHaveAttribute('alt', photo1.title);

    expect(spectator.query(byTestId('author'))).toHaveText(photo1.author);
    expect(spectator.query(byTestId('date_taken'))).toHaveText(photo1.date_taken);
    expect(spectator.query(byTestId('tags'))).toHaveText(photo1.tags);

    const link = spectator.query(byTestId('link'));
    expect(link).toHaveAttribute('href', photo1.link);
    expect(link).toHaveText(photo1.link);
  });
});
