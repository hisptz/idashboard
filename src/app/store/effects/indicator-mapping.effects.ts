import { Injectable } from '@angular/core';
import { Observable, defer, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap } from 'rxjs/operators';
import {
  AddIndicatorsMapping,
  FunctionRuleActionTypes,
  FunctionRuleActions,
  UpdateIndicatorsMapping
} from '../actions';
import * as _ from 'lodash';

@Injectable()
export class IndicatorsMappingEffects {
  constructor(private actions$: Actions) {}

  @Effect()
  updateIndicatorsMapping$: Observable<Action> = this.actions$.pipe(
    ofType<FunctionRuleActions>(FunctionRuleActionTypes.UpdateFunctionRules),
    map((action: any) => {
      const indicatorMapping = _.map(action.payload.rules, rule => {
        return { id: rule.id, isMapped: this.getMappingStatus(rule.json) };
      });
      return new UpdateIndicatorsMapping(indicatorMapping);
    })
  );

  @Effect()
  addIndicatorsMapping$: Observable<Action> = this.actions$.pipe(
    ofType<FunctionRuleActions>(
      FunctionRuleActionTypes.LoadFunctionRuleSuccess
    ),
    map((action: any) => {
      const indicatorMapping = _.map(action.payload, rule => {
        return { id: rule.id, isMapped: this.getMappingStatus(rule.json) };
      });
      return new AddIndicatorsMapping(indicatorMapping);
    })
  );

  getMappingStatus(json) {
    let isMapped = true;
    if (typeof json === 'string') {
      json = JSON.parse(json);
    }
    if (json && json.expressionMapping && json.expression) {
      const { expressionMapping, expression } = json;
      const dataElements = this.getUidsFromExpression(expression);
      isMapped = this.getDataElementMappingStatus(
        dataElements,
        expressionMapping
      );
    }
    return isMapped;
  }

  getDataElementMappingStatus(dataElements, expressionMapping) {
    let areAllMapped = true;
    dataElements.forEach(function(dataElement) {
      let hasBeenMapped = false;
      Object.keys(expressionMapping).forEach(function(key) {
        if (expressionMapping[key] === dataElement) {
          hasBeenMapped = true;
        }
      });
      if (!hasBeenMapped) {
        areAllMapped = false;
      }
    });
    return areAllMapped;
  }

  getUidsFromExpression(expression) {
    let uids = [];
    const matchRegrex = /(\{.*?\})/gi;
    expression.match(matchRegrex).forEach(function(value) {
      uids = uids.concat(
        value
          .replace('{', ':separator:')
          .replace('}', ':separator:')
          .split(':separator:')
          .filter(content => content.length > 0)
      );
    });
    return uids;
  }
}
