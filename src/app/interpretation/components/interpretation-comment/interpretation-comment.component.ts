import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-interpretation-comment',
  templateUrl: './interpretation-comment.component.html',
  styleUrls: ['./interpretation-comment.component.css']
})
export class InterpretationCommentComponent implements OnInit {

  @Input() showCommentInput: boolean;
  @Input() comment: any;
  @Input() currentUser: any;
  constructor() {
    this.showCommentInput = false;
  }

  ngOnInit() {
  }

}
