import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { FunctionRule } from '../../models/function-rule';

export enum FunctionRuleActionTypes {
  LoadFunctionRules = '[FunctionRule] LoadFunctionRules',
  LoadFunctionRuleSuccess = '[FunctionRule] Load function rules Success',
  LoadFunctionRuleFail = '[FunctionRule] Load function rules Fail',
  UpdateFunctionRule = '[FunctionRule] Update function rule',
  UpdateFunctionRules = '[FunctionRule] Update function rules',
  UpdateFunctionRuleSuccess = '[FunctionRule] Update function rules success'
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
  constructor(public payload: { rule: Update<FunctionRule> }) {}
}

export class UpdateFunctionRules implements Action {
  readonly type = FunctionRuleActionTypes.UpdateFunctionRules;
  constructor(public payload: { rules: Update<Function>[] }) {}
}

export class UpdateFunctionRuleSuccess implements Action {
  readonly type = FunctionRuleActionTypes.UpdateFunctionRuleSuccess;
}

export type FunctionRuleActions =
  | LoadFunctionRules
  | LoadFunctionRuleFail
  | UpdateFunctionRule
  | UpdateFunctionRules
  | LoadFunctionRuleSuccess
  | UpdateFunctionRuleSuccess;
