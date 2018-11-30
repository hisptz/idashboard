import { Action } from '@ngrx/store';
import { OrgUnitLevel } from '../../models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum OrgUnitLevelActionTypes {
  LoadOrgUnitLevels = '[OrgUnitLevel] Load OrgUnitLevels',
  LoadOrgUnitLevelSuccess = '[OrgUnitLevel] Load OrgUnitLevel Success',
  LoadOrgUnitLevelFail = '[OrgUnitLevel] Load OrgUnitLevel Fail',
  UpsetOrgUnitLevel = '[OrgUnitLevel] Add or update legendSets'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoadOrgUnitLevels implements Action {
  readonly type = OrgUnitLevelActionTypes.LoadOrgUnitLevels;
}

export class LoadOrgUnitLevelSuccess implements Action {
  readonly type = OrgUnitLevelActionTypes.LoadOrgUnitLevelSuccess;
  constructor(public payload: OrgUnitLevel[]) {}
}

export class LoadOrgUnitLevelFail implements Action {
  readonly type = OrgUnitLevelActionTypes.LoadOrgUnitLevelFail;
  constructor(public error: any) {}
}

export class UpsetOrgUnitLevel implements Action {
  readonly type = OrgUnitLevelActionTypes.UpsetOrgUnitLevel;
  constructor(public payload: { legendSets: OrgUnitLevel[] }) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type OrgUnitLevelActions =
  | LoadOrgUnitLevels
  | LoadOrgUnitLevelSuccess
  | LoadOrgUnitLevelFail
  | UpsetOrgUnitLevel;
