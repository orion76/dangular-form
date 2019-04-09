import {ESelectOptionsStatus} from "@libcomm/interfaces/config/select-options.interfaces";
import {IEnumFlagged} from "../../../../enum-flagged";
import {StoreActions} from "./actions";
import {StoreState} from "@libcomm/components/forms/state/select-options-status/state";
import {createEnumId} from "@libcomm/components/forms/state/select-options";
import State = StoreState.State;
import initialState = StoreState.initialState;
import featureAdapter = StoreState.featureAdapter;

function setStatus(state: State, formId: string, status: ESelectOptionsStatus): IEnumFlagged<ESelectOptionsStatus> {
  const oldStatus = state.entities[formId].status;

  return oldStatus.set(status);
}


function addStatus(state: State, formId: string, status: ESelectOptionsStatus): IEnumFlagged<ESelectOptionsStatus> {
  const oldStatus = state.entities[formId].status;

  return oldStatus.add(status);
}


function setChanged(action: StoreActions.setChanged, state: State) {
  const statusState = state.entities[createEnumId(action)];
  return featureAdapter.updateOne({
    id: action.formId,
    changes: {
      status: statusState.status.replace(ESelectOptionsStatus.LOAD_SUCCESS, ESelectOptionsStatus.FILTERS_UPDATED)
    }
  }, state);
}

export function reducer(state: State = initialState, action: StoreActions.TActions) {

  // const logger = window.loggerFactory.create("form-select-options.reducer");

  let stateNew: State;


  switch (action.type) {
    case StoreActions.Types.ADD_MANY:

      stateNew = featureAdapter.addMany(action.states, state);

      break;
    case StoreActions.Types.SET_CHANGED:

      stateNew = setChanged(action, state);

      break;

    case StoreActions.Types.SET_LOADED:

      stateNew = featureAdapter.updateOne({
        id: action.formId,
        changes: {status: addStatus(state, action.formId, ESelectOptionsStatus.LOAD_SUCCESS)}
      }, state);

      break;

    default:
      stateNew = state;

  }
  return stateNew;
}

