import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-home-portal',
  templateUrl: './home-portal.component.html',
  styleUrls: ['./home-portal.component.css']
})
export class HomePortalComponent implements OnInit {

  @Input() themes: any;
  @Input() statsSummaryGroups: any;
  constructor() { }

  ngOnInit() {
  }

}
