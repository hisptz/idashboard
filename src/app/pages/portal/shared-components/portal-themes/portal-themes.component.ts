import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-portal-themes',
  templateUrl: './portal-themes.component.html',
  styleUrls: ['./portal-themes.component.css']
})
export class PortalThemesComponent implements OnInit {

  @Input() themes: any;
  constructor() { }

  ngOnInit() {
  }

}
