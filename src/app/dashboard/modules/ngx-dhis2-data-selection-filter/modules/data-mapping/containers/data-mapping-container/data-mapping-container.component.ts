import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import * as _ from 'lodash';
import { Observable, of } from 'rxjs';
import { LIST_ICON, ARROW_LEFT_ICON, ARROW_RIGHT_ICON } from '../../icons';
import { FunctionRule, DataElement } from '../../../../../../../models';
import { MappingGroup } from '../../model/mapping-group';

@Component({
  selector: 'app-data-mapping-container',
  templateUrl: './data-mapping-container.component.html',
  styleUrls: ['./data-mapping-container.component.css']
})
export class DataMappingContainerComponent implements OnInit, OnDestroy {
  @Input()
  dataElements: DataElement[];
  @Input()
  functionRules: FunctionRule[];
  @Input()
  selectedItems;

  @Output()
  dataMappingClose = new EventEmitter();

  mappingGroups: MappingGroup[];
  selectedFuctionRuleIds: string[];

  selectedItems$: Observable<any>;
  _selectedItems: any[];

  availablePagenator: number;
  selectedPagenator: number;
  showGroupingPanel: boolean;
  showBody: boolean;
  showGroups: boolean;
  listIcon: string;
  arrowLeftIcon: string;
  arrowRightIcon: string;
  listchanges: string;
  querystring: string;
  selectedGroups: any[] = [];
  selectedGroup: any = { id: 'ALL', name: '[ All ]' };
  dataGroups: any[];

  mappingTitle: string;
  mappingDescription: string;
  mappingGroupTitle: string;

  activeGroupId: string;

  constructor() {
    this.showGroupingPanel = true;
    this.mappingGroups = [];
    this._selectedItems = [];
    this.dataGroups = [];
    this.availablePagenator = 1;
    this.selectedPagenator = 1;
    this.listIcon = LIST_ICON;
    this.arrowLeftIcon = ARROW_LEFT_ICON;
    this.arrowRightIcon = ARROW_RIGHT_ICON;
    this.mappingTitle = 'Template data element mapping';
    this.mappingDescription =
      'Select data element from you system to map to template data element';
  }

  ngOnInit() {
    // @todo adding support of data elements groups
    this.dataGroups = [{ id: 'ALL', name: '[ All ]' }];
    this.selectedItems$ = of(this._selectedItems);
    this.selectedFuctionRuleIds = this.selectedItems.map(
      selectedItem => selectedItem.id
    );
    this.upDateActiveMappingGroups();
  }

  upDateActiveMappingGroups() {
    // deduce groups and seleted function rules
    const selectedFuctionRule = this.getSectedRules(
      this.functionRules,
      this.selectedFuctionRuleIds
    );
    this.mappingGroups = this.getMappingGroups(selectedFuctionRule);
  }

  getMappingGroups(selectedRules: FunctionRule[]) {
    let groups: MappingGroup[] = [];
    selectedRules.map(rule => {
      const { json } = rule;
      if (json) {
        const { expressionMapping } = json;
        const { namesMapping } = json;
        Object.keys(namesMapping).map(groupId => {
          if (!_.find(groups, { id: groupId })) {
            const group: MappingGroup = {
              id: groupId,
              current: this.activeGroupId === groupId ? true : false,
              name: namesMapping[groupId],
              members: []
            };
            if (expressionMapping && expressionMapping[groupId]) {
              const memberId = expressionMapping[groupId];
              const dataElement: any = _.find(this.dataElements, {
                id: memberId
              });
              if (dataElement && dataElement.id) {
                group.members.push({
                  id: dataElement.id,
                  name: dataElement.name
                });
              }
            }
            groups = _.concat(groups, group);
          }
        });
        this._selectedItems = [];
        groups.map(group => {
          if (group.members.length > 0) {
            const { id } = group.members[0];
            if (!_.find(this._selectedItems, ['id', id])) {
              const dataElement: any = _.find(this.dataElements, {
                id: id
              });
              this._selectedItems = [...this._selectedItems, dataElement];
            }
          }
        });
        this.selectedItems$ = of(this._selectedItems);
        groups = _.sortBy(groups, ['name']);
        if (groups.length > 0 && !this.activeGroupId) {
          groups[0].current = true;
          this.activeGroupId = groups[0].id;
        }
      }
    });
    return groups;
  }

  getSectedRules(rules: FunctionRule[], rulesIds: string[]) {
    let selectedRules = [];
    rulesIds.map(id => {
      const rule = _.find(rules, { id: id });
      if (rule && rule.json) {
        if (typeof rule.json === 'string') {
          rule.json = JSON.parse(rule.json);
        }
        selectedRules = _.concat(selectedRules, rule);
      }
    });
    return selectedRules;
  }

  onUpdateGroups(groups: MappingGroup[]) {
    const activeGroup = _.find(groups, { current: true });
    this.activeGroupId = activeGroup && activeGroup.id ? activeGroup.id : null;
    this.mappingGroups = groups;
  }

  addSelected(item, event) {
    event.stopPropagation();
    if (
      this.activeGroupId &&
      this.mappingGroups.length > 0 &&
      _.find(this.mappingGroups, { id: this.activeGroupId })
    ) {
      const group = _.find(this.mappingGroups, { id: this.activeGroupId });
      if (group && group.id && item && item.id) {
        const systemDataElementId = item.id;
        const templateDataElementId = group.id;
        this.functionRules.forEach(rule => {
          let json = rule.json;
          if (typeof rule.json === 'string') {
            json = JSON.parse(json);
          }
          if (json && json.expressionMapping) {
            const { expressionMapping } = json;
            const templateDataElementIds = Object.keys(expressionMapping);
            if (
              templateDataElementIds &&
              templateDataElementIds.indexOf(templateDataElementId) > -1
            ) {
              const oldSystemDataElementId = expressionMapping[
                templateDataElementId
              ]
                ? expressionMapping[templateDataElementId]
                : templateDataElementId;
              json.expressionMapping[
                templateDataElementId
              ] = systemDataElementId;
              json.expression = json.expression.replace(
                new RegExp(oldSystemDataElementId, 'g'),
                systemDataElementId
              );
              rule.json = JSON.stringify(json);
            }
          }
        });
        const _selectedItems = this._selectedItems;
        _selectedItems.map(_selectedItem => {
          if (!_.find(this.dataElements, ['id', _selectedItem.id])) {
            this.dataElements = [...this.dataElements, _selectedItem];
          }
        });
        this.upDateActiveMappingGroups();
        const itemIndex = _.findIndex(this.dataElements, item);
        this.dataElements = [
          ...this.dataElements.slice(0, itemIndex),
          ...this.dataElements.slice(itemIndex + 1)
        ];
        this.dataElements = _.sortBy(this.dataElements, ['name']);
      }
    }
  }

  removeSelected(item, event) {
    event.stopPropagation();
    if (
      this.activeGroupId &&
      this.mappingGroups.length > 0 &&
      _.find(this.mappingGroups, { id: this.activeGroupId })
    ) {
      const group = _.find(this.mappingGroups, { id: this.activeGroupId });
      if (group && group.id && item && item.id) {
        const templateDataElementId = group.id;
        this.functionRules.forEach(rule => {
          let json = rule.json;
          if (typeof rule.json === 'string') {
            json = JSON.parse(json);
          }
          if (json && json.expressionMapping) {
            const { expressionMapping } = json;
            const templateDataElementIds = Object.keys(expressionMapping);
            if (
              templateDataElementIds &&
              templateDataElementIds.indexOf(templateDataElementId) > -1
            ) {
              const oldSystemDataElementId = expressionMapping[
                templateDataElementId
              ]
                ? expressionMapping[templateDataElementId]
                : templateDataElementId;
              json.expressionMapping[templateDataElementId] = null;
              json.expression = json.expression.replace(
                new RegExp(oldSystemDataElementId, 'g'),
                templateDataElementId
              );
              rule.json = JSON.stringify(json);
            }
          }
          if (!_.find(this.dataElements, ['id', item.id])) {
            this.dataElements = _.sortBy(
              [...this.dataElements, item],
              ['name']
            );
          }
        });
        this.upDateActiveMappingGroups();
      }
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

  saveCOnfigurations(e) {
    e.stopPropagation();
    const rules = [];
    this.functionRules.map(rule => {
      if (typeof rule.json !== 'string') {
        rule.json = JSON.stringify(rule.json);
      }
      rules.push(rule);
    });
    this.functionRules = _.assign([], this.functionRules, rules);
    this.dataMappingClose.emit({ rules });
  }

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

  ngOnDestroy() {
    this.mappingGroups = null;
    this.selectedFuctionRuleIds = null;
    this.selectedItems$ = null;
    this._selectedItems = null;
    this.availablePagenator = null;
    this.selectedPagenator = null;
    this.showGroupingPanel = null;
    this.showGroups = null;
    this.listIcon = null;
    this.arrowLeftIcon = null;
    this.arrowRightIcon = null;
    this.listchanges = null;
    this.querystring = null;
    this.selectedGroups = null;
    this.selectedGroup = null;
    this.dataGroups = null;
    this.mappingTitle = null;
    this.mappingDescription = null;
    this.mappingGroupTitle = null;
    this.activeGroupId = null;
  }
}
