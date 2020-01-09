import { Spectator, createTestComponentFactory, byTestId } from '@netbasal/spectator';
import { SearchFormComponent } from './search-form.component';

const searchTerm = 'flowers';

describe('SearchFormComponent with spectator', () => {
  let spectator: Spectator<SearchFormComponent>;

  const create = createTestComponentFactory({
    component: SearchFormComponent,
    shallow: true,
  });

  beforeEach(() => {
    spectator = create();
  });

  it('starts a search', (done: DoneFn) => {
    spectator.component.search.subscribe((searchTerm2: string) => {
      expect(searchTerm2).toBe(searchTerm);
      done();
    });

    const searchTermInput = spectator.query(byTestId('searchTermInput'));
    spectator.typeInElement(searchTerm, searchTermInput);

    const form = spectator.query(byTestId('form'));
    spectator.dispatchFakeEvent(form, 'submit');
  });
});
