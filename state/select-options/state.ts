import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {IFormEnumState} from "@libcomm/interfaces/config/select-options.interfaces";
import {IFieldProps} from "../types";

export function createEnumId(model: IFieldProps) {
  return `${model.formId}:${model.fieldName}`;
}

export namespace StoreState {

  export const featureName = 'form-select-options';


  export const featureAdapter: EntityAdapter<IFormEnumState> = createEntityAdapter<IFormEnumState>({
    selectId: model => createEnumId(model),
  });


  export interface State extends EntityState<IFormEnumState> {

  }

  export const initialState: State = featureAdapter.getInitialState();


}
