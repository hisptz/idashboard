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
import { HttpModule } from '@angular/http';
import { DataMappingComponent } from './data-mapping.component';
import { DataMappingContainerComponent } from './containers/data-mapping-container/data-mapping-container.component';
import { mappingServices } from './services';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    DragulaModule,
    NgxPaginationModule,
    DndModule.forRoot()
  ],
  declarations: [
    DataMappingComponent,
    DataMappingContainerComponent,
    ClickOutsideDirective,
    FilterByNamePipe,
    OrderPipe,
    AddUnderscorePipe
  ],
  exports: [DataMappingComponent, DataMappingContainerComponent],
  providers: [...mappingServices]
})
export class DataMappingModule {}
