import {Component, Input, OnInit} from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-interpretation-list',
  templateUrl: './interpretation-list.component.html',
  styleUrls: ['./interpretation-list.component.css']
})
export class InterpretationListComponent implements OnInit {

  @Input() interpretations: any[];
  @Input() itemHeight: string;
  interpretationTerm: string;
  constructor() { }

  ngOnInit() {
    console.log(this.interpretations);
    if (this.interpretations) {
      this.interpretations = this.interpretations.map((interpretation: any) => {
        const newInterpretation: any = {...interpretation};
        newInterpretation.showDate = true;
        newInterpretation.showMoreButton = false;
        return newInterpretation;
      })
    }
  }

  private getAbbreviatedName(name): string {
    const abbreviatedName: any[] = [];
    let count = 0;
    for (let i = 0; i <= name.length - 1; i++) {
      if (i === 0) {
        abbreviatedName.push(name[i].toUpperCase());
      } else {
        if (name[i] === ' ') {
          count = i;
          abbreviatedName.push(name[count + 1].toUpperCase());
        }
      }
    }

    return abbreviatedName.join('');
  }

  toggleInterpretationOptions(interpretation: any, e, mouseEnter: boolean = false) {
    e.stopPropagation();
    const interpretationIndex = _.findIndex(this.interpretations, _.find(this.interpretations, ['id', interpretation.id]));

    if (interpretationIndex !== -1) {

      if (mouseEnter) {
        interpretation.showDate = false;
        interpretation.showMoreButton = true;
      } else {
        interpretation.showDate = true;
        interpretation.showMoreButton = false;
      }

      this.interpretations = [
        ...this.interpretations.slice(0, interpretationIndex),
        interpretation,
        ...this.interpretations.slice(interpretationIndex + 1)
      ];
    }
  }

}
