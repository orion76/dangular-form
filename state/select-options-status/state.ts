import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {IFormEnumsStatus} from "@libcomm/interfaces/config/select-options.interfaces";
import {createEnumId} from "@libcomm/components/forms/state/select-options";


export namespace StoreState {

  export const featureName = 'SELECT_OPTIONS_STATUS';
  export const featureAdapter: EntityAdapter<IFormEnumsStatus> = createEntityAdapter<IFormEnumsStatus>({
    selectId: model => createEnumId(model),
  });


  export interface State extends EntityState<IFormEnumsStatus> {

  }

  export const initialState: State = featureAdapter.getInitialState();
}
