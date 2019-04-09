import {createFeatureSelector, createSelector, MemoizedSelector, MemoizedSelectorWithProps} from '@ngrx/store';

import {Dictionary} from '@ngrx/entity/src/models';
import {IAppState} from '@app/app-store.module';
import {IFieldProps, IFormProps} from "../types";
import {IFormEnumsStatus} from "@libcomm/interfaces/config/select-options.interfaces";
import {StoreState} from "@libcomm/components/forms/state/select-options-status/state";
import {createEnumId} from "@libcomm/components/forms/state/select-options";

export namespace StoreSelectors {
  import featureAdapter = StoreState.featureAdapter;
  import State = StoreState.State;
  import featureName = StoreState.featureName;
  export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal

  } = featureAdapter.getSelectors();


  //
  // export interface ISelectOptionsIdsProps {
  //   ids: string[],
  //   status: ESelectOptionsStatus
  // }


  export const selectFeatureState: MemoizedSelector<IAppState, State> =
    createFeatureSelector<State>(featureName);

  export const selectItems: MemoizedSelector<IAppState, Dictionary<IFormEnumsStatus>> = createSelector(
    selectFeatureState,
    selectEntities
  );

  export const getEntity = (items: Dictionary<IFormEnumsStatus>, props: IFieldProps) => {
    const enumId = createEnumId(props);
    return items[enumId] ? items[enumId] : null;
  };


  export const Entity: MemoizedSelectorWithProps<IAppState, IFieldProps, IFormEnumsStatus> = createSelector(
    selectItems,
    getEntity
  );

}

