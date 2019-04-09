import {StoreActions} from "@libcomm/components/forms/state/form/init/actions";
import {StoreState} from "@libcomm/components/forms/state/form/state";
import {EntityReducer} from "@libcomm/store/entity/reducer";
import State = StoreState.State;
import featureAdapter = StoreState.featureAdapter;
import initialState = StoreState.initialState;


export function setFormConfig(state: State, action: StoreActions.SET_CONFIG): State {

  const stateOld = state.entities[action.stateId];
  const statusOld = stateOld.status;

  return featureAdapter.addOne({
      stateId: action.stateId,
      config: action.config,
      status: {...statusOld, CONFIG: true}
    }
    , state);
}

export function setFields(state: State, action: StoreActions.SET_FIELDS): State {

  const stateOld = state.entities[action.stateId];
  const statusOld = stateOld.status;

  return featureAdapter.updateOne({
      id: action.stateId,
      changes: {fields: action.fields, status: {...statusOld, FIELDS_CHANGED: true}}
    }
    , state);
}

export function setInitComplete(state: State, action: StoreActions.SET_INIT_COMPLETE): State {

  const stateOld = state.entities[action.stateId];
  const statusOld = stateOld.status;

  return featureAdapter.updateOne({
      id: action.stateId,
      changes: {status: {...statusOld, INIT_COMPLETE: true}}
    }
    , state);
}


export function setFormGroup(state: State, action: StoreActions.SET_FORM_GROUP): State {
  const stateOld = state.entities[action.stateId];
  const statusOld = stateOld.status;

  return featureAdapter.updateOne({
    id: action.stateId,
    changes: {
      form: action.formGroup,
      status: {...statusOld, FORM_GROUP: true}
    }
  }, state);
}


export function reducer(state: State = initialState, action: StoreActions.Actions) {
  const logger = window.loggerFactory.createProcess();

  let stateNew: State;

  const {stateId} = action;

  switch (action.type) {

    case StoreActions.Types.REQUEST:
      stateNew = EntityReducer.addRequest(featureAdapter, action, state) as State;
      break;
    case StoreActions.Types.LOAD:
      stateNew = EntityReducer.load(featureAdapter, action, state) as State;
      break;
    case StoreActions.Types.LOAD_SUCCESS:
      stateNew = EntityReducer.loadSuccess(featureAdapter, action, state) as State;
      break;
    case StoreActions.Types.LOAD_ERROR:
      stateNew = EntityReducer.loadError(featureAdapter, action, state) as State;
      break;

    case StoreActions.Types.SET_CONFIG:
      stateNew = setFormConfig(state, action);
      break;

    case StoreActions.Types.SET_FIELDS:
      stateNew = setFields(state, action);
      break;

    case StoreActions.Types.SET_FORM_GROUP:
      stateNew = setFormGroup(state, action);
      break;

    default:


      stateNew = state;


  }

  return stateNew;
}
