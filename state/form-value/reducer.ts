import {initialState, State} from "./state";

import {StoreActions as FormValueActions} from "./actions";


function setValueChanged(state: State, action: FormValueActions.setChanged) {
  // const valueExist = getValue(state.entities, action);
  //
  // if (valueExist) {
  //   return featureAdapter.updateOne({
  //     id: action.formId,
  //     changes: {fields: {...valueExist.fields, ...(action.fields)}}
  //   }, state);
  //
  // } else {
  //   return featureAdapter.addOne({
  //     formId: action.formId,
  //     fields: action.fields,
  //   }, state);
  // }
}


function setValueHandled(state: State, action: FormValueActions.setHandled) {
  // const fields = getValue(state.entities, action).fields;
  // return featureAdapter.updateOne({
  //   id: action.formId,
  //   changes: {
  //     fields: {...fields, ...(action.value.fields)},
  //   }
  // }, state);

}

export function reducer(state: State = initialState, action: FormValueActions.Actions) {
  // const logger = window.loggerFactory.create("form.reducer");
  let stateNew: State;


  switch (action.type) {


    case FormValueActions.Types.SET_VALUE_CHANGED:
      // stateNew = setValueChanged(state, action);
      break;

    case FormValueActions.Types.SET_VALUE_HANDLED:

      // stateNew = setValueHandled(state, action);
      break;

    default:
      stateNew = state;
  }

  return stateNew;
}

