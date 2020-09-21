import { ComponentFixture, TestBed } from '@angular/core/testing';

import { findEl } from '../../spec-helpers/element.spec-helper';
import { SearchFormComponent } from './search-form.component';

const searchTerm = 'flowers';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [SearchFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('starts a search', (done: DoneFn) => {
    const preventDefault = jasmine.createSpy('submit preventDefault');

    component.search.subscribe((searchTerm2: string) => {
      expect(searchTerm2).toBe(searchTerm);
      expect(preventDefault).toHaveBeenCalled();
      done();
    });

    const searchTermInput = findEl(fixture, 'searchTermInput');
    searchTermInput.nativeElement.value = searchTerm;

    findEl(fixture, 'form').triggerEventHandler('submit', { preventDefault });
  });
});
