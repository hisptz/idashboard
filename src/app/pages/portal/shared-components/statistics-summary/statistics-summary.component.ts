import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-statistics-summary',
  templateUrl: './statistics-summary.component.html',
  styleUrls: ['./statistics-summary.component.css']
})
export class StatisticsSummaryComponent implements OnInit {

  @Input() statsSummaryGroups: Array<any>;
  constructor() {
  }

  ngOnInit() {
  }

}
