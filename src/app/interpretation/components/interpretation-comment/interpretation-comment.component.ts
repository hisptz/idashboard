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
  }

  cancel(e) {
    e.stopPropagation();
    this.commentFormData.comment = '';
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

}
