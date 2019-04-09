import {createFeatureSelector, MemoizedSelector} from '@ngrx/store';
import {Dictionary} from '@ngrx/entity/src/models';
import {IAppState} from '@app/app-store.module';
import {IFormProps} from "../types";
import {StoreState} from "@libcomm/components/forms/state/form-status/state";


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



  export const getForm = (entities: Dictionary<any>, props: IFormProps): any => {
    if (props.formId === undefined || !entities[props.formId]) {
      // console.warn('getStatus', entities, props);
      return;
    }
    return entities[props.formId];
  };



  // export const getFormStatus = (entities: Dictionary<IFormStatus>, props: IStatusProps): EFormStatus => {
  //   const state = getForm(entities, props);
  //   return state && state.status.contains(props.status) ? props.status : null;
  // };

  export const selectFeatureState: MemoizedSelector<IAppState, State> = createFeatureSelector<State>(featureName);

  // export const Forms: MemoizedSelector<IAppState, Dictionary<IFormStatus>> = createSelector(selectFeatureState, selectEntities);


  // export const Form: MemoizedSelectorWithProps<IAppState, IFormProps, IFormStatus> = createSelector(Forms, getForm);

  // export const FormStatus: MemoizedSelectorWithProps<IAppState, IStatusProps, EFormStatus> = createSelector(Forms, getFormStatus);
}

