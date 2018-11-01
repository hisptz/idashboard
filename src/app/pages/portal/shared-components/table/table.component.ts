import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() data: any;
  dataForTable: any;
  constructor() { }

  ngOnInit() {
    console.log('data', this.data)
    if (this.data) {
      const rows = [];
      this.data.forEach((row) => {
        rows.push(row.split(':'));
      });
      if (rows.length > 0) {
        this.dataForTable = rows;
      }
    }
  }

  getDataForTable(data) {
    return data.split(':');
  }
}
