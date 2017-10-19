import {Component, Input, OnInit} from '@angular/core';
import * as _ from 'lodash';
import {InterpretationService} from '../../services/interpretation.service';

@Component({
  selector: 'app-interpretation-list',
  templateUrl: './interpretation-list.component.html',
  styleUrls: ['./interpretation-list.component.css']
})
export class InterpretationListComponent implements OnInit {

  @Input() interpretations: any[];
  @Input() rootUrl: string;
  @Input() itemHeight: string;
  @Input() currentUser: any;
  visualizationTypeObject: any;
  interpretationTerm: string;
  constructor(private interpretationService: InterpretationService) { }

  ngOnInit() {
    if (this.interpretations) {

      if (this.interpretations.length > 0) {
        const visualizationType = _.camelCase(this.interpretations[0].type);

        if (visualizationType) {
          this.visualizationTypeObject = {
            type: visualizationType,
            id: this.interpretations[0][visualizationType].id
          };
        }
      }
      this.interpretations = this.interpretations.map((interpretation: any, index: number) => this._sanitizeInterpretation(interpretation, index))
    }
  }

  private _sanitizeInterpretation(interpretation: any, index) {
    const newInterpretation: any = {...interpretation};
    newInterpretation.showDate = true;
    newInterpretation.showMoreButton = false;
    newInterpretation.showDropdownOptions = false;
    newInterpretation.showCommentBlock = index === 0 ? true : false;
    return newInterpretation;
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
        interpretation.showDropdownOptions = false;
      }

      this.interpretations = [
        ...this.interpretations.slice(0, interpretationIndex),
        interpretation,
        ...this.interpretations.slice(interpretationIndex + 1)
      ];
    }
  }

  toggleInterpretationDropdownOptions(interpretationIndex, e?) {
    e.stopPropagation();
    const interpretation: any = this.interpretations[interpretationIndex];

    if (interpretation) {
      interpretation.showDropdownOptions = !interpretation.showDropdownOptions;
      this.interpretations = [
        ...this.interpretations.slice(0, interpretationIndex),
        interpretation,
        ...this.interpretations.slice(interpretationIndex + 1)
      ];
    }
  }

  updateInterpretationList(interpretationList) {
    if (interpretationList) {
      const newInterpretationList = interpretationList.filter((interpretation) => !_.find(this.interpretations, ['id', interpretation.id]));

      this.interpretations = [...newInterpretationList, ...this.interpretations]
        .map((interpretation: any, index: number) => this._sanitizeInterpretation(interpretation, index));
    }
  }

  toggleCommentBlock(interpretationIndex, e) {
    e.stopPropagation();
    const toggleInterpretation: any = this.interpretations[interpretationIndex];

    if (toggleInterpretation) {
      toggleInterpretation.showCommentBlock = !toggleInterpretation.showCommentBlock;

      this.interpretations = this.interpretations.map((interpretation) => {
        if (toggleInterpretation.id !== interpretation.id) {
          interpretation.showCommentBlock = false;
        }
        return interpretation;
      })

    }
  }

  updateInterpretationLikeStatus(interpretation: any) {
    this.interpretations = this.interpretations.map((interpretationObject) => {
      const newInterpretationObject: any = {...interpretationObject};
      if (interpretationObject.id === interpretation.id) {
        newInterpretationObject.likes = interpretation.likes;
        newInterpretationObject.likedBy = [...interpretation.likedBy];
      }

      return newInterpretationObject;
    });
  }

  updateInterpretationComment(interpretation: any) {
    this.interpretations = this.interpretations.map((interpretationObject) => {
      const newInterpretationObject: any = {...interpretationObject};
      if (interpretationObject.id === interpretation.id) {
        newInterpretationObject.comments = interpretation.comments;
      }

      return newInterpretationObject;
    });
  }

  updateInterpretationText(interpretation: any) {
    this.interpretations = this.interpretations.map((interpretationObject) => {
      const newInterpretationObject: any = {...interpretationObject};
      if (interpretationObject.id === interpretation.id) {
        newInterpretationObject.text = interpretation.text;
        newInterpretationObject.lastUpdated = interpretation.lastUpdated;
        newInterpretationObject.showEditForm = false;
      }

      return newInterpretationObject;
    });
  }

  openInterpretationEditForm(interpretation, e) {
    e.stopPropagation();

    this.interpretations = this.interpretations.map((interpretationObject) => {
      const newInterpretationObject: any = {...interpretationObject};
      if (interpretationObject.id === interpretation.id) {
        newInterpretationObject.showEditForm = true;
        newInterpretationObject.showDropdownOptions = false;
      }

      return newInterpretationObject;
    });
  }

  toggleDeleteConfirmationDialog(interpretation, e) {
    e.stopPropagation();

    this.interpretations = this.interpretations.map((interpretationObject) => {
      const newInterpretationObject: any = {...interpretationObject};
      if (interpretationObject.id === interpretation.id) {
        newInterpretationObject.showDeleteDialog = !newInterpretationObject.showDeleteDialog;
        newInterpretationObject.showDropdownOptions = false;
      }

      return newInterpretationObject;
    });
  }

  deleteInterpretation(interpretation, e) {
    e.stopPropagation();
    this.interpretations = this.interpretations.map((interpretationObject) => {
      const newInterpretationObject: any = {...interpretationObject};
      if (interpretationObject.id === interpretation.id) {
        newInterpretationObject.showDeleteDialog = false;
        newInterpretationObject.deleting = true;
      }

      return newInterpretationObject;
    });

    this.interpretationService.delete(interpretation, this.rootUrl).subscribe(() => {
      const interpretationIndex = _.findIndex(this.interpretations,
        _.find(this.interpretations, ['id', interpretation.id]));

      if (interpretationIndex !== -1) {
        this.interpretations = [
          ...this.interpretations.slice(0, interpretationIndex),
          ...this.interpretations.slice(interpretationIndex + 1)
        ];
      }
    }, deleteError => {
      this.interpretations = this.interpretations.map((interpretationObject) => {
        const newInterpretationObject: any = {...interpretationObject};
        if (interpretationObject.id === interpretation.id) {
          newInterpretationObject.deleting = false;
        }

        return newInterpretationObject;
      });
    })

  }

}
