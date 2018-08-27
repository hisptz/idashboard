import { Action } from '@ngrx/store';
import { FunctionRule } from '../../models/function-rule';

export enum FunctionRuleActionTypes {
  LoadFunctionRules = '[FunctionRule] LoadFunctionRules',
  LoadFunctionRuleSuccess = '[FunctionRule] Load function rules Success',
  LoadFunctionRuleFail = '[FunctionRule] Load function rules Fail',
  UpdateFunctionRule = '[FunctionRule] Lupdate function rule'
}

export class LoadFunctionRules implements Action {
  readonly type = FunctionRuleActionTypes.LoadFunctionRules;
}
export class LoadFunctionRuleSuccess implements Action {
  readonly type = FunctionRuleActionTypes.LoadFunctionRuleSuccess;
  constructor(public payload: FunctionRule[]) {}
}
export class LoadFunctionRuleFail implements Action {
  readonly type = FunctionRuleActionTypes.LoadFunctionRuleFail;
  constructor(public payload: any) {}
}

export class UpdateFunctionRule implements Action {
  readonly type = FunctionRuleActionTypes.UpdateFunctionRule;
  constructor(public payload: FunctionRule) {}
}

export type FunctionRuleActions =
  | LoadFunctionRules
  | LoadFunctionRuleFail
  | UpdateFunctionRule
  | LoadFunctionRuleSuccess;
