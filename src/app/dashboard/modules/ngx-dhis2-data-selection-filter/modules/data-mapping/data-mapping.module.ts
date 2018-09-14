import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from './click-outside.directive';
import { FormsModule } from '@angular/forms';
import { FilterByNamePipe } from './pipes/filter-by-name.pipe';
import { OrderPipe } from './pipes/order-by.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddUnderscorePipe } from './pipes/add-underscore.pipe';
import { DragulaModule } from 'ng2-dragula';
import { DndModule } from 'ng2-dnd';
import { ColorPickerModule } from 'ngx-color-picker';
import { HttpModule } from '@angular/http';
import { DataMappingComponent } from './data-mapping.component';
import { mappingServices } from './services';
import { components } from './components';
import { containers } from './containers';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    DragulaModule,
    ColorPickerModule,
    NgxPaginationModule,
    DndModule.forRoot()
  ],
  declarations: [
    DataMappingComponent,
    ClickOutsideDirective,
    FilterByNamePipe,
    OrderPipe,
    AddUnderscorePipe,
    ...components,
    ...containers
  ],
  exports: [DataMappingComponent, , ...components, ...containers],
  providers: [...mappingServices]
})
export class DataMappingModule {}
