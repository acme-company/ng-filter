import { Pipe, PipeTransform, Inject } from '@angular/core';
import { FilterService } from "./filter.service";

@Pipe({name: 'filter', pure: false})
export class FilterPipe<T> implements PipeTransform {
    constructor(@Inject(FilterService) private filterService:FilterService<T>) {
        
    }
    transform(array: T[], value: string): T[] {
        return this.filterService.filter(array, value);
    }
}