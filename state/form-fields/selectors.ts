import {createFeatureSelector, MemoizedSelector} from '@ngrx/store';
import {featureAdapter, featureName, State} from './state';
import {IAppState} from '@app/app-store.module';

import * as Immutable from "immutable";
import {IFieldProps} from "@libcomm/components/forms/state/types";
import {IFieldStateProperties, TFieldState} from "@libcomm/interfaces/config/fields/types";


export namespace StoreSelectors {


  export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal

  } = featureAdapter.getSelectors();




  const getField = (fields: Immutable.OrderedMap<string, TFieldState>, props: IFieldProps): TFieldState => {
    if (props.formId === undefined || !fields[props.formId]) {
      console.warn('getForm', fields, props);
      return;
    }

    return fields[props.fieldName];
  };

  const getFieldState = (fields: Immutable.OrderedMap<string, TFieldState>, props: IFieldProps): IFieldStateProperties => {
    const field = getField(fields, props);
    if (field) {
      return field.state;
    }
  };

  const selectFeatureState: MemoizedSelector<IAppState, State> = createFeatureSelector<State>(featureName);



}
