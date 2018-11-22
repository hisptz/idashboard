import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-list-mega-btn',
  templateUrl: './list-mega-btn.component.html',
  styleUrls: ['./list-mega-btn.component.css']
})
export class ListMegaBtnComponent implements OnInit {

  @Input() listObject: any;
  @Input() activeDivId: string;
  @Output() questionGroupId = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
    if (this.activeDivId) {
      document.getElementById(this.activeDivId).style.backgroundColor = '#2A8FD1';
      document.getElementById(this.activeDivId).style.color = '#FFFFFF';
    }
  }

  showQuestionsById(id) {
    this.questionGroupId.emit(id);
    const classDom = document.getElementsByClassName('list-mega-btn');
    for (let count = 0; count < classDom.length; count++) {
      document.getElementById(classDom[count].id).style.backgroundColor = '#eee';
      document.getElementById(classDom[count].id).style.color = '#222222';
    }
    document.getElementById(id).style.backgroundColor = '#2A8FD1';
    document.getElementById(id).style.color = '#FFFFFF';
  }

}
