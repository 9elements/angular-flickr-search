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

    spectator.typeInElement(searchTerm, byTestId('searchTermInput'));

    spectator.dispatchFakeEvent(byTestId('form'), 'ngSubmit');

    expect(actualSearchTerm).toBe(searchTerm);
  });
});
