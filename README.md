# ng-filter  

[![Build Status](https://travis-ci.org/acme-company/ng-filter.svg?branch=master)](https://travis-ci.org/acme-company/ng-filter) [![Build Status](https://ci.appveyor.com/api/projects/status/2h0bkhhh1s3bi40q/branch/master?svg=true)](https://ci.appveyor.com/project/pixelbits-mk/ng-filter/branch/master) [![npm version](https://badge.fury.io/js/ng-filter.svg)](https://badge.fury.io/js/ng-filter) [![Downloads](http://img.shields.io/npm/dm/ng-filter.svg)](https://npmjs.org/package/ng-filter) [![Build Status](https://saucelabs.com/buildstatus/pixelbits-mk)](https://saucelabs.com/beta/builds/69fc3e3ba2554ec0bc418423766b381f) [![dev Dependencies](https://david-dm.org/acme-company/ng-filter.svg)](https://david-dm.org/acme-company/ng-filter) [![devDependencies](https://david-dm.org/acme-company/ng-filter/dev-status.svg)](https://david-dm.org/acme-company/ng-filter?type=dev) [![peer Dependencies](https://img.shields.io/david/peer/acme-company/ng-filter.svg)](https://github.com/acme-company/ng-filter.git) [![npm](https://img.shields.io/npm/v/ng-filter.svg)](https://www.npmjs.com/package/ng-filter)  [![Github Forks](https://img.shields.io/github/forks/acme-company/ng-filter.svg?style=social&label=Fork)](https://github.com/acme-company/ng-filter) [![Github Stars](https://img.shields.io/github/stars/acme-company/ng-filter.svg?style=social&label=Star)](https://github.com/acme-company/ng-filter) [![Github Watchers](https://img.shields.io/github/watchers/acme-company/ng-filter.svg?style=social&label=Watch)](https://github.com/acme-company/ng-filter) [![npm license](https://img.shields.io/npm/l/ng-filter.svg)](https://www.npmjs.com/package/ng-filter) [![GitHub issues](https://img.shields.io/github/issues/acme-company/ng-filter.svg)](https://github.com/acme-company/ng-filter/issues) [![GitHub closed issues](https://img.shields.io/github/issues-closed/acme-company/ng-filter.svg)](https://github.com/acme-company/ng-filter/issues?q=is%3Aissue+is%3Aclosed) [![GitHub pull requests](https://img.shields.io/github/issues-pr/acme-company/ng-filter.svg)](https://github.com/acme-company/ng-filter/pulls) [![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/acme-company/ng-filter.svg)](https://github.com/acme-company/ng-filter/pulls?q=is%3Apr+is%3Aclosed) [![Gitter](https://badges.gitter.im/acme-company/ng-filter.svg)](https://gitter.im/acme-company/ng-filter?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge) [![GitHub release](https://img.shields.io/github/release/acme-company/ng-filter.svg)](https://github.com/acme-company/ng-filter/releases) [![GitHub tag](https://img.shields.io/github/tag/acme-company/ng-filter.svg)](https://github.com/acme-company/ng-filter/tags) [![Github All Releases](https://img.shields.io/github/downloads/acme-company/ng-filter/total.svg)](https://github.com/acme-company/ng-filter/releases)



[![Build Status](https://saucelabs.com/browser-matrix/pixelbits-mk.svg)](https://saucelabs.com/beta/builds/69fc3e3ba2554ec0bc418423766b381f)

## Demo

https://acme-company.github.io/ng-filter/

## Installation

```
npm install ng-filter --save
```

# Usage

## App.Module.ts
```typescript
import { NgModule } from "@angular/core";
...
import { AppModule as FilterModule } from 'ng-filter';

@NgModule({
    imports: [
        ...
        FilterModule
    ],
    ...
})
export class AppModule {

}
```

## App.Component.html
```html
  <div>
      Filter <input [(ngModel)]="name" />
  </div>
  <table class="table table-hover">
      <thead>
          <tr>
              <td sort="firstName">First Name</td>
              <td sort="lastName">Last Name</td>
              <td sort="birthDate">Birthdate</td>
          </tr>
      </thead>
      <tbody>
          <tr *ngFor="let person of people | filter: name">
              <td>{{ person.firstName }}</td>
              <td>{{ person.lastName }}</td>
              <td>{{ person.birthDate | date:'yyyy-MM-dd' }}</td>
          </tr>
      </tbody>
      <tfoot>
          <tr>
              <td colspan="3">

              </td>
          </tr>
      </tfoot>
  </table>
```
## App.Component.ts
Add the FilterService to the providers array of your list component.  The scope of FilterService should not be global because it tracks filter callbacks for a single list.

```typescript
import { Component } from '@angular/core';
import { FilterService } from 'ng-filter';

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
      firstName: (person:Person, value:string) => new RegExp('^' + value.trim(), 'i').test(person.firstName),
      lastName: (person:Person, value:string) =>  new RegExp('^' + value.trim(), 'i').test(person.lastName),
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

```
## Customizing Filter Functions

The `filterService` provides a `configure` method which accepts a configuration object.  Each property of the configuration object can be set to a custom filter predicate.

The filter predicate has the following signature (where T is the item type from the array of items being filtered):

```typescript    
function(item:T, value:string): boolean {
    ...
    return true; // or false
}
```   
If the predicate returns true, then the item will be included in the filtered list. Otherwise, the item will be excluded.

For example, if the item type is a string: 

```html
Filter <input [(ngModel)]="name" />
<div *ngFor="let item of list | filter: name">
    {{ item }}
</div>
    
```

```typescript
filterService.configure({
    item: (item:string, value:string) => item.startsWith(value)
});
this.list = [
    "apples",
    "pears",
    "bannas"
];
```
