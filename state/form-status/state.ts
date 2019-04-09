import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';


export namespace StoreState {

  export const featureName = 'FORM_STATUS';
  export const featureAdapter: EntityAdapter<any> = createEntityAdapter<any>({
    selectId: model => model.formId,
  });


  // export interface State extends EntityState<IFormStatus> {
  export interface State  {


  }

  export const initialState: State = featureAdapter.getInitialState({});
}
