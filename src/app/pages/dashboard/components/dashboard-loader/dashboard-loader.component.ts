import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-loader',
  templateUrl: './dashboard-loader.component.html',
  styleUrls: ['./dashboard-loader.component.css']
})
export class DashboardLoaderComponent implements OnInit {
  @Input() loadingText: string;
  constructor() {}

  ngOnInit() {}
}
