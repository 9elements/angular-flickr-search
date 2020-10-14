import { Spectator, createComponentFactory, byTestId } from '@ngneat/spectator';
import { SearchFormComponent } from './search-form.component';

const searchTerm = 'flowers';

describe('SearchFormComponent with spectator', () => {
  let spectator: Spectator<SearchFormComponent>;

  const createComponent = createComponentFactory({
    component: SearchFormComponent,
    shallow: true,
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('starts a search', () => {
    let actualSearchTerm: string | undefined;

    spectator.component.search.subscribe((otherSearchTerm: string) => {
      actualSearchTerm = otherSearchTerm;
    });

    const searchTermInput = spectator.query(byTestId('searchTermInput'));
    if (!searchTermInput) {
      throw new Error('searchTermInput not found');
    }
    spectator.typeInElement(searchTerm, searchTermInput);

    const form = spectator.query(byTestId('form'));
    if (!form) {
      throw new Error('form not found');
    }
    spectator.dispatchFakeEvent(form, 'submit');

    expect(actualSearchTerm).toBe(searchTerm);
  });
});
