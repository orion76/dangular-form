import {StoreActions as FormStatusActions} from "./actions";
import {StoreState} from "@libcomm/components/forms/state/form-status/state";
import State = StoreState.State;
import initialState = StoreState.initialState;


export function enumsAdd(action: FormStatusActions.addEnums, state: State) {
  // const formState = state.entities[action.formId];
  //
  // const enumsOld = formState.enums;
  // const enumsNew = Immutable.Set<string>(action.fieldNames);
  //
  // return featureAdapter.updateOne({
  //   id: action.formId,
  //   changes: {enums: enumsOld.merge(enumsNew)}
  // }, state);

}

export function enumAddLoaded(action: FormStatusActions.addEnumLoaded, state: State) {

  // const formState = state.entities[action.formId];
  //
  // const enumsLoaded = formState.enums;
  // const enumsLoadedNew = Immutable.Set<string>([action.fieldName]);
  //
  // const enumsFiltersChanged = formState.enumsFiltersChanged;
  // const enumsFiltersChangedDelete = Immutable.Set<string>([action.fieldName]);
  //
  //
  // return featureAdapter.updateOne({
  //   id: action.formId,
  //   changes: {
  //     enumsLoaded: enumsLoaded.merge(enumsLoadedNew),
  //     enumsFiltersChanged: enumsFiltersChanged.subtract(enumsFiltersChangedDelete)
  //   }
  // }, state);
}

export function enumAddFiltersChanged(action: FormStatusActions.addEnumChanged, state: State) {

  // const formState = state.entities[action.formId];
  //
  // const enumsFiltersChanged = formState.enumsFiltersChanged;
  // const enumsFiltersChangedNew = Immutable.Set<string>([action.fieldName]);
  //
  // const enumsLoaded = formState.enums;
  // const enumsLoadedDelete = Immutable.Set<string>([action.fieldName]);
  //
  //
  // return featureAdapter.updateOne({
  //   id: action.formId,
  //   changes: {
  //     enumsLoaded: enumsLoaded.subtract(enumsLoadedDelete),
  //     enumsFiltersChanged: enumsFiltersChanged.merge(enumsFiltersChangedNew)
  //   }
  // }, state);
}



export function reducer(state: State = initialState, action: FormStatusActions.Actions) {
  // const logger = window.loggerFactory.create("form.reducer");
  let stateNew: State;

  switch (action.type) {


    case FormStatusActions.Types.ADD_FORM:
      // stateNew = formAdd(action, state);
      break;



    // case FormStatusActions.Types.STATUS_SET:
      // stateNew = setStatus(action.formId, action.status, state);
      // break;


    // case FormStatusActions.Types.STATUS_TOGGLE:
      // debugger;
      // stateNew = featureAdapter.updateOne({
      //   id: action.formId,
        // changes: {status: replaceStatus(action.formId, state, action.statusOld, action.statusNew)}
      // }, state);

      // break;

    case FormStatusActions.Types.ADD_ENUMS:
      // stateNew = enumsAdd(action, state);
      break;

    case FormStatusActions.Types.ADD_ENUM_LOADED:
      // stateNew = enumAddLoaded(action, state);
      break;

    case FormStatusActions.Types.ADD_ENUM_CHANGED:
      // stateNew = enumAddFiltersChanged(action, state);
      break;

    default:
      stateNew = state;
  }

  return stateNew;
}

