import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {FormStoreTypes} from "./types";


export namespace StoreState {

  import IFormState = FormStoreTypes.IFormState;
  export const featureName = 'FORM';


  export const featureAdapter: EntityAdapter<IFormState> = createEntityAdapter<IFormState>({
    selectId: model => model.stateId,
  });


  export interface State extends EntityState<IFormState> {

  }

  export const initialState: State = featureAdapter.getInitialState({});
}
