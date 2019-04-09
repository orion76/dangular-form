import {featureAdapter, initialState, State} from "./state";
import {FormFieldsActions} from "./actions";


// function createFieldMap(fields: TFieldState[]): Immutable.OrderedMap<string, TFieldState> {
//   return Immutable.OrderedMap(fields.reduce((map: Immutable.OrderedMap<string, any>, field: TFieldState) => {
//     return map.set(field.name, new RecordFactoryFieldState(field));
//
//
//   }, Immutable.OrderedMap({}).asMutable())).asImmutable();
// }

// function updateFieldsState(state: State, action: FormFieldsActions.updateFieldsState | FormFieldsActions.setHandled) {
//   const oldFields = state.entities[action.formId].items;
//   const newFields = oldFields.withMutations((fields: Immutable.OrderedMap<string, TFieldState>) => {
//
//     action.fields.forEach((field: TFieldState) => {
//
//       fields.mergeDeepIn([field.config.name, 'state'], field.state);
//       return fields;
//     });
//   });
//
//   return newFields;
// }



export function reducer(state: State = initialState, action: FormFieldsActions.Actions) {
  // const logger = window.loggerFactory.create("form.reducer");
  let stateNew: State;

  switch (action.type) {

    case FormFieldsActions.Types.ADD_FIELDS:

      stateNew = featureAdapter.addOne({
        formId: action.formId,
        items: action.fields
      }, state);

      break;

    case FormFieldsActions.Types.UPDATE_FIELDS_STATE:

      stateNew = featureAdapter.updateOne({
        id: action.formId,
        changes: {
          items: action.fields,

        }
      }, state);
      break;

    case FormFieldsActions.Types.SET_HANDLED:

      stateNew = featureAdapter.updateOne({
        id: action.formId,
        changes: {
          items: action.fields,
        }
      }, state);
      break;

    default:
      stateNew = state;
  }

  return stateNew;
}


// function _setFieldDirty(state: State, formId: string, fieldName: string): Immutable.OrderedMap<string, IFormFieldState> {
//   const formState: IFormState = getForm(state.entities, {formId: formId});
//   return formState.fields.setIn([fieldName, 'dirty'], true);
// }

// function _setFieldPristine(state: State, formId: string, fieldName: string): Immutable.OrderedMap<string, IFormFieldState> {
//   const formState: IFormState = getForm(state.entities, {formId: formId});
//   return formState.fields.setIn([fieldName, 'dirty'], true);
// }

// function updateField(state: State, action: changeFieldValueProgramm | changeFieldValueUser, isDirty?: boolean) {
//   const formState: IFormState = getForm(state.entities, {formId: action.formId});
//
//   const changes: {
//     entity?: IEntity,
//     fields?: Immutable.OrderedMap<string, IFormFieldState>
//   } = {};
//
//   changes.entity = formState.entity.clone();
//   changes.entity.setFieldValue(action.fieldName, action.value);
//
//   const dirty = formState.fields.getIn([action.fieldName, 'dirty']);
//
//   if (dirty !== isDirty) {
//     changes.fields = formState.fields.setIn([action.fieldName, 'dirty'], true);
//   }
//
//   return featureAdapter.updateOne({
//     id: action.formId, changes
//   }, state);
// }

// function _setFieldValue(state: State, formId: string, fieldName: string, value: any): IEntity {
//   const formState: IFormState = getForm(state.entities, {formId: formId});
//   const entity: IEntity = formState.entity.clone();
//   entity.setFieldValue(fieldName, value);
//
//   return entity;
// }

// function _setFieldStateUser(state: State, formId: string, fieldName: string, propertydName: string, value: any): TFormFieldsStates {
//   const formState: IFormState = getForm(state.entities, {formId: formId});
//   const fields: TFormFieldsStates = formState.fields;
//
//   return fields.withMutations((_fields: TFormFieldsStates) => {
//     _fields.setIn([fieldName, propertydName], value);
//     _fields.setIn([fieldName, 'value', 'dirty'], true);
//     return _fields;
//   });
//
// }

// function _setFieldStateProgramm(state: State, formId: string, fieldName: string, propertydName: string, value: any): TFormFieldsStates {
//   const formState: IFormState = getForm(state.entities, {formId: formId});
//   const fields: TFormFieldsStates = formState.fields;
//
//   return fields.withMutations((_fields: TFormFieldsStates) => {
//     _fields.setIn([fieldName, propertydName], value);
//     return _fields;
//   });
//
// }





