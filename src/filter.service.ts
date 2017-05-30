import { Injectable } from '@angular/core';

export interface Options<T> {
    [key:string]: (obj:T, value:string) => boolean;
}
@Injectable()
export class FilterService<T> {
    options: Options<T>;
    constructor() {
        this.options = {};
    }
    public configure(options: Options<T>) {
        this.options = options;
    }

    public filter(array: T[], value:string) {
        return array.filter((item)=> this.matches(item, value));
    }

    private matches(item:T, value:string): boolean {
        for (var key in this.options) {
            if (this.options[key](item, value)) {
                return true;
            }
        }
        return false;
    }
}