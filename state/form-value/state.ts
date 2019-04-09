import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';





  export const featureName = 'FORM_VALUE';
  export const featureAdapter: EntityAdapter<any> = createEntityAdapter<any>({
    selectId: model => model.formId,
  });


  export interface State extends EntityState<any> {


  }

  export const initialState: State = featureAdapter.getInitialState({});
