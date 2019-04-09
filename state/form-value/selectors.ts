import {createFeatureSelector, MemoizedSelector} from '@ngrx/store';
import {featureAdapter, featureName, State} from './state';
import {IAppState} from '@app/app-store.module';

// import IFormProps = FormSelectors.IFormProps;

export namespace StoreSelectors {


  export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal

  } = featureAdapter.getSelectors();


  const _selectEntities = (state: any) => {
    if (!state) {
      // debugger;
    }
    // if (state.ids.length > 0) {
    //   debugger;
    // }
    return selectEntities(state);
  };



  export const selectFeatureState: MemoizedSelector<IAppState, State> = createFeatureSelector<State>(featureName);



}

