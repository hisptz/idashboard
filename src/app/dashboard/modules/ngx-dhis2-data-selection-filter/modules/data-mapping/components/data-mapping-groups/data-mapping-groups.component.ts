import { Component, OnInit, Input } from '@angular/core';
import { MappingGroup } from '../../model/mapping-group';
import { DRAG_ICON, ARROW_DOWN_ICON } from '../../icons';
import * as _ from 'lodash';

@Component({
  selector: 'app-data-mapping-groups',
  templateUrl: './data-mapping-groups.component.html',
  styleUrls: ['./data-mapping-groups.component.css']
})
export class DataMappingGroupsComponent implements OnInit {
  @Input()
  dataGroups: MappingGroup[];
  @Input()
  groupTitle: string;
  @Input()
  groupDescription: string;
  @Input()
  groupMemberTitle;

  dragIcon: string;
  arrowDownIcon: string;

  constructor() {
    this.dragIcon = DRAG_ICON;
    this.arrowDownIcon = ARROW_DOWN_ICON;
  }

  ngOnInit() {}

  onSetCurrentGroup(currentDataGroup, e) {
    e.stopPropagation();
    this.dataGroups = _.map(this.dataGroups, (dataGroup: MappingGroup) => {
      return {
        ...dataGroup,
        current: dataGroup.id === currentDataGroup.id && !dataGroup.current
      };
    });

    // this.dataGroupsUpdate.emit(this.dataGroups);
    // this.selectedGroupUpdate.emit(currentDataGroup.id);
  }
}
