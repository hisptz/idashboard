import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InterpretationService} from '../../services/interpretation.service';

@Component({
  selector: 'app-interpretation-comment',
  templateUrl: './interpretation-comment.component.html',
  styleUrls: ['./interpretation-comment.component.css']
})
export class InterpretationCommentComponent implements OnInit {

  @Input() showCommentInput: boolean;
  @Input() comment: any;
  @Input() interpretation: any;
  @Input() currentUser: any;
  @Input() rootUrl: string;
  @Output() onCommentCreate: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCommentDelete: EventEmitter<any> = new EventEmitter<any>();
  commentFormData: any;
  creating: boolean;
  constructor(private interpretationService: InterpretationService) {
    this.showCommentInput = false;
    this.creating = false;
  }

  ngOnInit() {
    if (this.interpretation) {
      this.commentFormData = {
        id: this.interpretation.id,
        type: this.interpretation.type,
        comment: ''
      }
    }

    if (this.comment) {
      this.comment = {...this.comment, showDate: true, showMoreButton: false};
    }


  }

  cancel(e) {
    e.stopPropagation();
    this.commentFormData.comment = '';
  }

  toggleCommentOptions(e, mouseEnter:boolean = false) {
    e.stopPropagation();
    if (mouseEnter) {
      this.comment.showDate = false;
      this.comment.showMoreButton = true;
    } else {
      this.comment.showDate = true;
      this.comment.showMoreButton = false;
      this.comment.showDropdownOption = false;
    }
  }

  toggleCommentDropdown(e) {
    e.stopPropagation();
    this.comment.showDropdownOptions = !this.comment.showDropdownOptions;
  }

  postComment(e) {
    e.stopPropagation();
    this.creating = true;
    this.interpretationService.postComment(this.commentFormData, this.rootUrl)
      .subscribe((interpretation: any[]) => {
        this.creating = false;
        this.commentFormData.comment = '';
        this.onCommentCreate.emit(interpretation);
      }, error => console.log(error))
  }

  toggleDeleteConfirmationDialog(e) {
    e.stopPropagation();
    this.comment = {...this.comment, showDeleteDialog: !this.comment.showDeleteDialog, showDropdownOptions: false};
  }

  deleteComment(e) {
    e.stopPropagation();
    this.comment = {...this.comment, showDeleteDialog: false, deleting: true};
    this.interpretationService.deleteComment(this.rootUrl, this.interpretation.id, this.comment.id)
      .subscribe(() => this.onCommentDelete.emit(this.comment), () => {
        this.comment.deleting = false;
      })
  }

}
