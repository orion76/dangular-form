import {createFeatureSelector, createSelector, MemoizedSelector, MemoizedSelectorWithProps} from '@ngrx/store';

import {Dictionary} from '@ngrx/entity/src/models';
import {IAppState} from '@app/app-store.module';
import {IFormEnumState} from "@libcomm/interfaces/config/select-options.interfaces";
import {IFieldProps} from "../types";
import {createEnumId, StoreState} from "@libcomm/components/forms/state/select-options/state";


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
  // const _selectEntities = (state: any) => {
  //   debugger;
  //   return selectEntities(state);
  // };

  export const getItem = (items: Dictionary<IFormEnumState>, props: IFieldProps): IFormEnumState => {
    return items[createEnumId(props)];
  };

  // export const getItemsByIds = (states: Dictionary<IFormSelectOptionsState>, props: { ids: string[] }): IFormSelectOptionsState[] => {
  //
  //
  //   const allExists = props.ids.every((selectId: string) => {
  //     return Boolean(states[selectId]);
  //   });
  //
  //   if (allExists) {
  //     return props.ids
  //       .map((selectId: string) => states[selectId]);
  //   }
  // };


  export const selectFeatureState: MemoizedSelector<IAppState, State> =
    createFeatureSelector<State>(featureName);

  export const selectItems: MemoizedSelector<IAppState, Dictionary<IFormEnumState>> = createSelector(
    selectFeatureState,
    selectEntities
  );


  // const _selectByIds: MemoizedSelectorWithProps<IAppState, { ids: string[] }, IFormSelectOptionsState[]> = createSelector(
  //   selectItems,
  //   getItemsByIds
  // );

  // export const selectByIds: MemoizedSelectorWithProps<IAppState, ISelectOptionsIdsProps, IFormSelectOptionsState[]> = createSelector(
  //   selectItems,
  //   SelectOptionsStatusSelectors.selectItemsByIds,
  //   (items: Dictionary<IFormSelectOptionsState>, statuses: Dictionary<IFormSelectOptionsState>) => {
  //
  //     if (Object.keys(items).length === 0 && Object.keys(statuses).length === 0) {
  //       return null;
  //     }
  //
  //     return <IFormSelectOptionsState[]>Object.keys(items).map((selectId) => {
  //       const item: IFormSelectOptionsState = items[selectId];
  //       item.status = statuses[selectId].status;
  //       return item;
  //     });
  //   }
  // );

  export const selectItem: MemoizedSelectorWithProps<IAppState, IFieldProps, IFormEnumState> = createSelector(
    selectItems,
    getItem
  );


  // export const selectItemStatus: MemoizedSelectorWithProps<IAppState, ISelectOptionsProps, IFormSelectOptionsState> = createSelector(
  //   selectItem,
  //   SelectOptionsStatusSelectors.selectItemStatus,
  //   (item: IFormSelectOptionsState, status: IFormSelectOptionsState) => {
  //     item.status = status.status;
  //     return item;
  //   }
  // );


}

