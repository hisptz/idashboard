import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';
import { Subscription, Observable, of } from 'rxjs';
import { LIST_ICON, ARROW_LEFT_ICON, ARROW_RIGHT_ICON } from '../../icons';
import { FunctionRule, DataElement } from '../../../../../../../models';

@Component({
  selector: 'app-data-mapping-container',
  templateUrl: './data-mapping-container.component.html',
  styleUrls: ['./data-mapping-container.component.css']
})
export class DataMappingContainerComponent implements OnInit {
  @Input()
  dataElements: DataElement[];
  @Input()
  functionRules: FunctionRule[];
  @Input()
  selectedItems;

  selectedRules: FunctionRule[];

  selectedItems$: Observable<any>;
  _selectedItems: any[];

  availablePagenator: number;
  selectedPagenator: number;
  showGroupingPanel: boolean;
  showGroups: boolean;
  listIcon: string;
  arrowLeftIcon: string;
  arrowRightIcon: string;
  listchanges: string;
  querystring: string;
  selectedGroups: any[] = [];
  selectedGroup: any = { id: 'ALL', name: '[ All ]' };
  dataGroups: any[];

  constructor() {
    this.showGroupingPanel = true;
    this._selectedItems = [];
    this.dataGroups = [];
    this.availablePagenator = 1;
    this.selectedPagenator = 1;
    this.listIcon = LIST_ICON;
    this.arrowLeftIcon = ARROW_LEFT_ICON;
    this.arrowRightIcon = ARROW_RIGHT_ICON;
  }

  ngOnInit() {
    this._selectedItems = [];
    this.selectedItems$ = of(this._selectedItems);
    if (this.dataElements && this.functionRules && this.selectedItems) {
      const ruleIds = this.selectedItems.map(selectedItem => selectedItem.id);
      this.selectedRules = this.getSectedRules(this.functionRules, ruleIds);
      // @todo adding support of data elements groups
      this.dataGroups = [{ id: 'ALL', name: '[ All ]' }];
    }
  }

  getSectedRules(rules: FunctionRule[], rulesIds: string[]) {
    let selectedRules = [];
    rulesIds.map(id => {
      const rule = _.find(rules, { id: id });
      if (rule && rule.json) {
        try {
          rule.json = JSON.parse(rule.json);
        } catch (e) {}
        console.log(rule);
        selectedRules = _.concat(selectedRules, rule);
      }
    });
    return selectedRules;
  }

  addSelected(item, event) {
    event.stopPropagation();
    const itemIndex = _.findIndex(this.dataElements, item);
    this.dataElements = [
      ...this.dataElements.slice(0, itemIndex),
      ...this.dataElements.slice(itemIndex + 1)
    ];

    if (!_.find(this._selectedItems, ['id', item.id])) {
      this._selectedItems = [...this._selectedItems, item];
    }
    // @todo tap action of mapping re-mapping on rules
    this.selectedItems$ = of(this._selectedItems);
  }

  removeSelected(item, event) {
    event.stopPropagation();
    const itemIndex = _.findIndex(this._selectedItems, item);
    this._selectedItems = [
      ...this._selectedItems.slice(0, itemIndex),
      ...this._selectedItems.slice(itemIndex + 1)
    ];

    if (!_.find(this.dataElements, ['id', item.id])) {
      this.dataElements = _.sortBy([...this.dataElements, item], ['name']);
    }
    // @todo tap action of mapping re-mapping on rules
    this.selectedItems$ = of(this._selectedItems);
  }

  setSelectedGroup(group, listArea, event) {
    event.stopPropagation();
    this.listchanges = '';
    this.selectedGroup = { ...group };
    // this.dataElements = this.dataItemList(this._selectedItems, group);
    this.showGroups = false;
    this.availablePagenator = 1;
    listArea.scrollTop = 0;
  }

  inSelected(item, list) {
    let checker = false;
    for (const per of list) {
      if (per.id === item.id) {
        checker = true;
      }
    }
    return checker;
  }

  toggleDataFilterGroupList(e) {
    e.stopPropagation();
    this.showGroups = !this.showGroups;
  }

  onToggleGroupingPanel(e) {
    e.stopPropagation();
    this.showGroupingPanel = !this.showGroupingPanel;
  }

  // emit(e) {
  //   e.stopPropagation();
  //   this.dataFilterUpdate.emit({
  //     items: this._selectedItems,
  //     groups: this.selectedGroups,
  //     dimension: 'dx'
  //   });
  // }

  searchChanged() {
    this.availablePagenator = 1;
  }

  // action that will fire when the sorting of selected data is done
  transferDataSuccess(data, current) {
    if (data.dragData.id === current.id) {
      console.log('Droping in the same area');
    } else {
      const number =
        this.getDataPosition(data.dragData.id) >
        this.getDataPosition(current.id)
          ? 0
          : 1;
      this.deleteData(data.dragData);
      this.insertData(data.dragData, current, number);
    }
  }

  selectAllItems(event) {
    event.stopPropagation();

    this.dataElements.map(item => {
      if (!_.find(this._selectedItems, ['id', item.id])) {
        this._selectedItems = _.sortBy(
          [...this._selectedItems, item],
          ['name']
        );
      }
    });
    this.dataElements = [];
    this.selectedItems$ = of(this._selectedItems);
  }

  deselectAllItems(e) {
    e.stopPropagation();
    this._selectedItems.map(item => {
      if (!_.find(this.dataElements, ['id', item.id])) {
        this.dataElements = _.sortBy([...this.dataElements, item], ['name']);
      }
    });
    this._selectedItems = [];
    this.selectedItems$ = of(this._selectedItems);
  }

  // helper method to find the index of dragged item
  getDataPosition(dataId) {
    let dataIndex = null;
    this._selectedItems.forEach((data, index) => {
      if (data.id === dataId) {
        dataIndex = index;
      }
    });
    return dataIndex;
  }

  // help method to delete the selected Data in list before inserting it in another position
  deleteData(dataToDelete) {
    this._selectedItems.forEach((data, dataIndex) => {
      if (dataToDelete.id === data.id) {
        this._selectedItems.splice(dataIndex, 1);
      }
    });

    this.selectedItems$ = of(this._selectedItems);
  }

  // Helper method to insert Data in new position after drag drop event
  insertData(Data_to_insert, current_Data, num: number) {
    this._selectedItems.forEach((Data, Data_index) => {
      if (
        current_Data.id === Data.id &&
        !this.checkDataAvailabilty(Data_to_insert, this._selectedItems)
      ) {
        this._selectedItems.splice(Data_index + num, 0, Data_to_insert);
      }
    });

    this.selectedItems$ = of(this._selectedItems);
  }

  // check if orgunit already exist in the orgunit display list
  checkDataAvailabilty(Data, array): boolean {
    let checker = false;
    for (const per of array) {
      if (per.id === Data.id) {
        checker = true;
      }
    }
    return checker;
  }
}
