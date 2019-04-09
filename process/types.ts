import {InjectionToken} from "@angular/core";
import {Action, Store} from "@ngrx/store";
import {AbstractControl, FormGroup} from "@angular/forms";
import {TFormValue} from "@libcomm/interfaces/config/form.interfaces";
import {IFormHandler} from "../controllers/types";
import {IAppState} from "../../../../app-store.module";
import {FormStepService} from "./step.service";
import {ProcessSelectOptions} from "./process-select-options";
import {Observable} from "rxjs";
import {IFormStateFields} from "../controllers/form-state/form-state-fields";
import {FormStoreTypes} from "@libcomm/components/forms/state/form/types";
import IFormState = FormStoreTypes.IFormState;
import TStatusName = FormStoreTypes.TStatusName;

export interface IFormControl {
  fieldName: string,
  control: AbstractControl
}


export interface IFormProcess {
  step: FormStepService;
  store: Store<IAppState>;
  // valueEffects: FormValueEffects;
  processSelectOptions: ProcessSelectOptions;


  setValue(formId: string, fields: TFormValue);

  // changedFieldValue(formId: string, fieldName: string, value: any): void;

  dispatch(log: Function, action: Action): void;

  dispatchLog(log: Function, action: Action): Action;

  // onFormInitialized(formId: string): Observable<IFormState>;

  // onUserValueChanged(formId: string);

  createFormGroup(formId: string, fields: IFormStateFields): FormGroup;

  // createFields(state: IFormState): TFormFieldsStates;

  initHandler(formId: string, handler: IFormHandler);

  setEntityId(formId: string, entityId: string);

  onFormStatus(status: TStatusName, value: any, stateId: string): Observable<IFormState>;

}

export const FORM_PROCESS_SERVICE = new InjectionToken<IFormProcess>('FORM_PROCESS_SERVICE');

export enum EActionProcess {
  SELECTOR = 'SELECTOR',
  PROCESS = 'PROCESS',
  PROCESS_SELECT_OPTIONS = 'PROCESS_SELECT_OPTIONS',
  PROCESS_STEPS = 'PROCESS_STEPS',
  HANDLER = 'HANDLER',
  EVENT = 'EVENT',
  FORM_INIT = 'FORM_INIT',
  FORM_SERVICE = 'FORM_SERVICE',
  FORM_COMPONENT = 'FORM_COMPONENT',
  ENTITY_CRUD = 'ENTITY_CRUD',
  ENTITY_CRUD_LOAD = 'ENTITY_CRUD_LOAD',
  FORM_FIELD_SELECT_INIT = 'FORM_FIELD_SELECT_INIT',
  FORM_FIELD_STATE = 'FORM_FIELD_STATE',
  FORM_FIELD_VALUE = 'FORM_FIELD_VALUE',
  FORM_FIELD_ACTION = 'FORM_FIELD_ACTION'
}

