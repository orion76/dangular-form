import {StoreActions} from './actions';
import {StoreSelectors} from "./selectors";
import {TEnumFilters} from "@libcomm/interfaces/config/select-options.interfaces";
import {StoreState} from "@libcomm/components/forms/state/select-options/state";
import featureAdapter = StoreState.featureAdapter;
import State = StoreState.State;
import initialState = StoreState.initialState;
import Types = StoreActions.Types;


function updateFilters(state: State, action: StoreActions.updateFilters) {
  const item = StoreSelectors.getItem(state.entities, action);
  const filters: TEnumFilters = item.filters;

  return featureAdapter.updateOne({
    id: action.formId,
    changes: {filters: filters.merge(action.filters)}
  }, state);
}


export function reducer(state: State = initialState, action: StoreActions.Actions) {

  // const logger = window.loggerFactory.create("form-select-options.reducer");

  let stateNew: State;

  switch (action.type) {


    case Types.ADD_MANY:
      console.log('Types.ENUM_ADD', action);
      stateNew = featureAdapter.addMany(action.enums, state);

      break;
    case Types.UPDATE_FILTERS:

      stateNew = updateFilters(state, action);
      break;

    case Types.ENUM_LOAD_SUCCESS:

      stateNew = featureAdapter.updateOne({
        id: action.formId,
        changes: {items: action.items}
      }, state);
      break;

    default:
      stateNew = state;

  }
  return stateNew;
}


//
// export function
//
// export class select {
//   static table(state: RecordState, table: ITEDTable) {
//     return state.getIn(['children', table]);
//   }
// }

