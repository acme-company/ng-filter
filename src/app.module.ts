import { NgModule } from '@angular/core';
import { FilterPipe } from './filter.pipe';
import { FilterService } from "./filter.service";

@NgModule({
  imports: [],
  declarations: [ FilterPipe ],
  providers: [FilterService],
  exports: [ FilterPipe ]
})
export class AppModule {

}
