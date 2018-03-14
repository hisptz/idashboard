import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InterpretationListComponent} from './components/interpretation-list/interpretation-list.component';
import {FormsModule} from '@angular/forms';
import {AutosizeDirective} from './directives/autosize.directive';
import {FilterPipe} from './pipes/filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    InterpretationListComponent,
    AutosizeDirective,
    FilterPipe
  ],

  exports: [InterpretationListComponent]
})
export class InterpretationModule { }
