import { Component } from '@angular/core';
import { FilterService } from '../../../src/filter.service';
import { DatePipe } from '@angular/common';

export interface Person {
  firstName: string;
  lastName: string;
  birthDate: Date;
}

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  providers: [FilterService]
})
export class AppComponent {
  name = '';
  people: Person[] = [];
  constructor(filterService:FilterService<Person>) {
    filterService.configure({
      firstName: (person: Person, value: string) => new RegExp('^' + value.trim(), 'i').test(person.firstName),
      lastName: (person: Person, value: string) =>  new RegExp('^' + value.trim(), 'i').test(person.lastName),
      birthDate: (person: Person, value: string) => new DatePipe('en-US').transform(person.birthDate,'yyyy-MM-dd').startsWith(value)
    });
    this.people = [
      { firstName: 'James', lastName: 'Dean', birthDate: new Date(2012, 5, 1) },
      { firstName: 'John', lastName: 'Smith', birthDate: new Date(2012, 5, 1) },
      { firstName: 'Jane', lastName: 'Doe', birthDate: new Date(2011, 1, 1) },
      { firstName: 'Terry', lastName: 'Rundle', birthDate: new Date(2015, 6, 12) },
      { firstName: 'Barry', lastName: 'White', birthDate: new Date(2009, 3, 19) },
    ];
  }
}
