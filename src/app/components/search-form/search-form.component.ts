import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {

  @Output()
  search = new EventEmitter<string>();

  handleSearch(event: Event, searchTerm: string) {
    event.preventDefault();
    this.search.emit(searchTerm);
  }

}
